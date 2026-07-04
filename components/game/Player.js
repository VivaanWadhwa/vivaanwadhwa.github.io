import styles from '../../styles/Game.module.css';
import { TILE_SIZE } from './mapData';

const FACING_ROW = { down: 0, left: 1, right: 2, up: 3 };
// Sheet columns: 0 and 2 are stride frames, 1 is standing.
const FRAME_COL = [0, 2];

export default function Player({ row, col, facing, walkFrame, moving }) {
  const frameCol = moving ? FRAME_COL[walkFrame] : 1;
  return (
    <div
      className={styles.sprite}
      style={{
        left: col * TILE_SIZE,
        top: row * TILE_SIZE - TILE_SIZE,
        zIndex: 10 + row,
        backgroundImage: 'url(/sprites/postboy.png)',
        backgroundPosition: `${-frameCol * TILE_SIZE}px ${-FACING_ROW[facing] * TILE_SIZE * 2}px`,
      }}
    />
  );
}
