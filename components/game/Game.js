import { useCallback, useRef, useState } from 'react';
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

const npcAt = (row, col) => NPCS.find((n) => n.row === row && n.col === col);

export default function Game() {
  const [player, setPlayer] = useState(PLAYER_START);
  const [walkFrame, setWalkFrame] = useState(0);
  const [moving, setMoving] = useState(false);
  const [dialogue, setDialogue] = useState(null); // { name, pages, page }
  const [encounter, setEncounter] = useState(null); // null | appeared | throwing | caught
  const [grassStep, setGrassStep] = useState(0); // keys the rustle animation restart
  const idleTimer = useRef(null);
  const throwTimer = useRef(null);
  const grassSteps = useRef(0);
  const encounterAt = useRef(rollEncounterThreshold());

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

      const bumpedNpc = npcAt(row, col);
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
    [dialogue, encounter, player]
  );

  const handleAction = useCallback(() => {
    if (encounter === 'appeared') return startThrow();
    if (encounter === 'caught') return setEncounter(null);
    if (encounter) return;
    if (dialogue) return advanceDialogue();

    const [dr, dc] = STEP[player.facing];
    const row = player.row + dr;
    const col = player.col + dc;
    const target = npcAt(row, col) || SIGNS[`${row},${col}`];
    if (target) openDialogue(target);
  }, [encounter, dialogue, player, advanceDialogue, startThrow]);

  useKeyboardMovement({ onMove: handleMove, onAction: handleAction });

  const handleNpcClick = (npc) => {
    if (dialogue || encounter) return;
    const adjacent =
      Math.abs(npc.row - player.row) + Math.abs(npc.col - player.col) === 1;
    if (adjacent) openDialogue(npc);
  };

  const inTallGrass = MAP[player.row][player.col] === 'W';

  return (
    <div className={styles.screen}>
      <SkipLink />

      <div className={styles.gameFrame}>
        <div
          className={styles.world}
          style={{ width: COLS * TILE_SIZE, height: ROWS * TILE_SIZE }}
        >
          <Map />
          {NPCS.map((npc) => (
            <NPC key={npc.id} npc={npc} onClick={() => handleNpcClick(npc)} />
          ))}
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
