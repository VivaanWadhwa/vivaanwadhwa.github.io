import { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../styles/Game.module.css';
import {
  MAP,
  ROWS,
  COLS,
  TILE_SIZE,
  BLOCKED_TILES,
  PLAYER_START,
  rollEncounterThreshold,
  NPCS,
  SIGNS,
} from './mapData';
import Map from './Map';
import Player from './Player';
import NPC from './NPC';
import DialogueBox from './DialogueBox';
import EncounterScene from './EncounterScene';
import SkipLink from './SkipLink';
import useKeyboardMovement from './useKeyboardMovement';

const STEP = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

const createNpcPositions = () =>
  Object.fromEntries(
    NPCS.map((npc) => [
      npc.id,
      {
        row: npc.row,
        col: npc.col,
        direction: 1,
        facing: npc.facing || 'down',
        walkFrame: 0,
        moving: false,
      },
    ])
  );

const getNpcPosition = (npc, npcPositions) =>
  npcPositions[npc.id] || {
    row: npc.row,
    col: npc.col,
    direction: 1,
    facing: npc.facing || 'down',
    walkFrame: 0,
    moving: false,
  };

const npcAt = (row, col, npcPositions) =>
  NPCS.find((npc) => {
    const position = getNpcPosition(npc, npcPositions);
    return position.row === row && position.col === col;
  });

const npcOccupies = (row, col, npcPositions, excludeId) =>
  NPCS.some((npc) => {
    if (npc.id === excludeId) return false;
    const position = getNpcPosition(npc, npcPositions);
    return position.row === row && position.col === col;
  });

const isBlockedTile = (row, col) =>
  row < 0 ||
  row >= ROWS ||
  col < 0 ||
  col >= COLS ||
  BLOCKED_TILES.has(MAP[row][col]);

const clampCameraOffset = (offset, viewportSize, mapSize) => {
  if (viewportSize >= mapSize) return (viewportSize - mapSize) / 2;
  return Math.min(0, Math.max(viewportSize - mapSize, offset));
};

export default function Game() {
  const [player, setPlayer] = useState(PLAYER_START);
  const [npcPositions, setNpcPositions] = useState(createNpcPositions);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [walkFrame, setWalkFrame] = useState(0);
  const [moving, setMoving] = useState(false);
  const [dialogue, setDialogue] = useState(null); // { name, pages, page }
  const [encounter, setEncounter] = useState(null); // null | appeared | throwing | caught
  const [grassStep, setGrassStep] = useState(0); // keys the rustle animation restart
  const idleTimer = useRef(null);
  const throwTimer = useRef(null);
  const grassSteps = useRef(0);
  const encounterAt = useRef(rollEncounterThreshold());
  const playerRef = useRef(PLAYER_START);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    if (dialogue || encounter) return undefined;

    const patrollers = NPCS.filter((npc) => npc.patrol);
    if (patrollers.length === 0) return undefined;

    const intervalMs = Math.min(
      ...patrollers.map((npc) => npc.patrol.intervalMs)
    );
    const timer = setInterval(() => {
      setNpcPositions((positions) => {
        let changed = false;
        const nextPositions = { ...positions };

        patrollers.forEach((npc) => {
          const position = getNpcPosition(npc, nextPositions);
          const direction = position.direction || 1;
          const candidate = {
            row: position.row,
            col: position.col + direction,
          };
          let nextDirection = direction;
          let target = candidate;

          if (
            candidate.col < npc.patrol.min ||
            candidate.col > npc.patrol.max ||
            isBlockedTile(candidate.row, candidate.col)
          ) {
            nextDirection = -direction;
            target = {
              row: position.row,
              col: position.col + nextDirection,
            };
          }

          const playerPosition = playerRef.current;
          const occupied =
            playerPosition.row === target.row &&
            playerPosition.col === target.col;
          const blocked =
            isBlockedTile(target.row, target.col) ||
            npcOccupies(target.row, target.col, nextPositions, npc.id);

          if (!occupied && !blocked) {
            nextPositions[npc.id] = {
              row: target.row,
              col: target.col,
              direction: nextDirection,
              facing: nextDirection > 0 ? 'right' : 'left',
              walkFrame: position.walkFrame === 0 ? 1 : 0,
              moving: true,
            };
            changed = true;
          } else if (nextDirection !== direction) {
            nextPositions[npc.id] = {
              ...position,
              direction: nextDirection,
              facing: nextDirection > 0 ? 'right' : 'left',
              moving: false,
            };
            changed = true;
          }
        });

        return changed ? nextPositions : positions;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [dialogue, encounter]);

  const openDialogue = (source) =>
    setDialogue({ name: source.name, pages: source.dialogue, page: 0 });

  const advanceDialogue = useCallback(() => {
    setDialogue((d) => {
      if (!d) return null;
      return d.page < d.pages.length - 1 ? { ...d, page: d.page + 1 } : null;
    });
  }, []);

  const startThrow = useCallback(() => {
    setEncounter('throwing');
    clearTimeout(throwTimer.current);
    throwTimer.current = setTimeout(() => setEncounter('caught'), 2400);
  }, []);

  const handleMove = useCallback(
    (dir) => {
      if (dialogue || encounter) return;
      const [dr, dc] = STEP[dir];
      const row = player.row + dr;
      const col = player.col + dc;

      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
        setPlayer({ ...player, facing: dir });
        return;
      }

      const bumpedNpc = npcAt(row, col, npcPositions);
      if (bumpedNpc) {
        setPlayer({ ...player, facing: dir });
        openDialogue(bumpedNpc);
        return;
      }

      const tile = MAP[row][col];
      if (BLOCKED_TILES.has(tile)) {
        setPlayer({ ...player, facing: dir });
        const sign = SIGNS[`${row},${col}`];
        if (sign) openDialogue(sign);
        return;
      }

      setPlayer({ row, col, facing: dir });
      setMoving(true);
      setWalkFrame((f) => (f === 0 ? 1 : 0));
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setMoving(false), 180);

      if (tile === 'W') {
        setGrassStep((s) => s + 1);
        grassSteps.current += 1;
        if (grassSteps.current >= encounterAt.current) {
          grassSteps.current = 0;
          encounterAt.current = rollEncounterThreshold();
          setEncounter('appeared');
        }
      }
    },
    [dialogue, encounter, npcPositions, player]
  );

  const handleAction = useCallback(() => {
    if (encounter === 'appeared') return startThrow();
    if (encounter === 'caught') return setEncounter(null);
    if (encounter) return;
    if (dialogue) return advanceDialogue();

    const [dr, dc] = STEP[player.facing];
    const row = player.row + dr;
    const col = player.col + dc;
    const target = npcAt(row, col, npcPositions) || SIGNS[`${row},${col}`];
    if (target) openDialogue(target);
  }, [encounter, dialogue, npcPositions, player, advanceDialogue, startThrow]);

  useKeyboardMovement({ onMove: handleMove, onAction: handleAction });

  const handleNpcClick = (npc) => {
    if (dialogue || encounter) return;
    const position = getNpcPosition(npc, npcPositions);
    const adjacent =
      Math.abs(position.row - player.row) +
        Math.abs(position.col - player.col) ===
      1;
    if (adjacent) openDialogue(npc);
  };

  const inTallGrass = MAP[player.row][player.col] === 'W';
  const mapWidth = COLS * TILE_SIZE;
  const mapHeight = ROWS * TILE_SIZE;
  const cameraX = clampCameraOffset(
    viewport.width / 2 - (player.col + 0.5) * TILE_SIZE,
    viewport.width,
    mapWidth
  );
  const cameraY = clampCameraOffset(
    viewport.height / 2 - (player.row + 0.5) * TILE_SIZE,
    viewport.height,
    mapHeight
  );

  return (
    <div className={styles.screen}>
      <SkipLink />

      <div className={styles.gameFrame}>
        <div className={styles.world}>
          <div
            className={styles.mapLayer}
            style={{
              width: mapWidth,
              height: mapHeight,
              transform: `translate3d(${cameraX}px, ${cameraY}px, 0)`,
            }}
          >
            <Map />
            {NPCS.map((npc) => {
              const position = getNpcPosition(npc, npcPositions);
              return (
                <NPC
                  key={npc.id}
                  npc={{ ...npc, ...position }}
                  onClick={() => handleNpcClick(npc)}
                />
              );
            })}
            <Player
              row={player.row}
              col={player.col}
              facing={player.facing}
              walkFrame={walkFrame}
              moving={moving}
            />
            {inTallGrass && (
              <div
                key={grassStep}
                className={styles.rustle}
                style={{
                  left: player.col * TILE_SIZE,
                  top: player.row * TILE_SIZE,
                  zIndex: 11 + player.row,
                }}
              />
            )}
          </div>

          {dialogue && (
            <DialogueBox
              name={dialogue.name}
              pages={dialogue.pages}
              page={dialogue.page}
              onAdvance={advanceDialogue}
            />
          )}
          {encounter && (
            <EncounterScene
              phase={encounter}
              onThrow={startThrow}
              onDismiss={() => setEncounter(null)}
            />
          )}
        </div>

        <p className={styles.controlsHint}>
          Arrow keys / WASD to move · Space or E to talk · Rumors speak of the tall grass...
        </p>
        <p className={styles.attribution}>
          Art from{' '}
          <a href="https://github.com/Tuxemon/Tuxemon" target="_blank" rel="noopener noreferrer">
            Tuxemon
          </a>{' '}
          (CC-BY-SA)
        </p>
      </div>
    </div>
  );
}
