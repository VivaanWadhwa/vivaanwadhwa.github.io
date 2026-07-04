import styles from '../../styles/Game.module.css';
import { TILE_SIZE } from './mapData';

// NPCs stand still on their tile, facing down, middle (standing) frame.
export default function NPC({ npc, onClick }) {
  return (
    <div
      className={`${styles.sprite} ${styles.npc}`}
      style={{
        left: npc.col * TILE_SIZE,
        top: npc.row * TILE_SIZE - TILE_SIZE,
        zIndex: 10 + npc.row,
        backgroundImage: `url(${npc.sprite})`,
        backgroundPosition: `${-TILE_SIZE}px 0px`,
      }}
      onClick={onClick}
      title={npc.name}
    />
  );
}
