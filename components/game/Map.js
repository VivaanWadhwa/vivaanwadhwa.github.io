import styles from '../../styles/Game.module.css';
import { MAP, HOUSE } from './mapData';
import Tile from './Tile';

export default function Map() {
  return (
    <>
      <div className={styles.mapGrid}>
        {MAP.flatMap((rowStr, row) =>
          rowStr.split('').map((type, col) => (
            <Tile key={`${row}-${col}`} type={type} />
          ))
        )}
      </div>
      <img
        src="/sprites/house.png"
        alt=""
        className={styles.house}
        style={{ left: HOUSE.left, top: HOUSE.top, width: HOUSE.width, height: HOUSE.height }}
      />
    </>
  );
}
