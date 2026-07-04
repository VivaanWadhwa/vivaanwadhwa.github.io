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
        <div key={building.id}>
          <img
            src="/sprites/house.png"
            alt=""
            className={`${styles.house} ${styles.houseRoof}`}
            style={{
              left: building.left,
              top: building.top,
              width: building.width,
              height: building.height,
            }}
          />
          <img
            src="/sprites/house.png"
            alt=""
            className={`${styles.house} ${styles.houseFront}`}
            style={{
              left: building.left,
              top: building.top,
              width: building.width,
              height: building.height,
            }}
          />
        </div>
      ))}
    </>
  );
}
