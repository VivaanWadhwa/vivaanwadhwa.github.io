import styles from '../../styles/Game.module.css';
import { TILE_SIZE } from './mapData';

const FACING_ROW = { down: 0, left: 1, right: 2, up: 3 };
// Sheet columns: 0 and 2 are stride frames, 1 is standing.
const FRAME_COL = [0, 2];

// Game may update row/col/facing/walkFrame for patrollers.
export default function NPC({ npc, onClick }) {
  const facing = npc.facing || 'down';
  const frameCol = npc.moving ? FRAME_COL[npc.walkFrame || 0] : 1;

  return (
    <div
      className={`${styles.sprite} ${styles.npc}`}
      style={{
        left: npc.col * TILE_SIZE,
        top: npc.row * TILE_SIZE - TILE_SIZE,
        zIndex: 10 + npc.row,
        backgroundImage: `url(${npc.sprite})`,
        backgroundPosition: `${-frameCol * TILE_SIZE}px ${-FACING_ROW[facing] * TILE_SIZE * 2}px`,
      }}
      onClick={onClick}
      title={npc.name}
    />
  );
}
