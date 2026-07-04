import styles from '../../styles/Game.module.css';
import { BUILDINGS, COLS, MAP } from './mapData';
import Tile from './Tile';

export default function Map() {
  return (
    <>
      <div
        className={styles.mapGrid}
        style={{ gridTemplateColumns: `repeat(${COLS}, 64px)` }}
      >
        {MAP.flatMap((rowStr, row) =>
          rowStr.split('').map((type, col) => (
            <Tile key={`${row}-${col}`} type={type} />
          ))
        )}
      </div>
      {BUILDINGS.map((building) => (
        <img
          key={building.id}
          src="/sprites/house.png"
          alt=""
          className={styles.house}
          style={{
            left: building.left,
            top: building.top,
            width: building.width,
            height: building.height,
          }}
        />
      ))}
    </>
  );
}
