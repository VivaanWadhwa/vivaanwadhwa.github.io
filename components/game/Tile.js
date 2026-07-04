import styles from '../../styles/Game.module.css';

const TILE_CLASS = {
  T: 'tileTree',
  G: 'tileGrass',
  F: 'tileFlowers',
  P: 'tilePath',
  W: 'tileTallgrass',
  S: 'tileSign',
  X: 'tileFence',
  H: 'tileHouse',
  B: 'tileBush',
  R: 'tileRock',
  L: 'tileWater',
};

export default function Tile({ type }) {
  return <div className={`${styles.tile} ${styles[TILE_CLASS[type]]}`} />;
}
