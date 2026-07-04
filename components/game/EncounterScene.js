import styles from '../../styles/Game.module.css';
import { CONTACT_LINKS } from './mapData';

// Full-screen overlay: appeared -> throwing -> caught. The throw always
// succeeds; timing is driven by Game.js.
export default function EncounterScene({ phase, onThrow, onDismiss }) {
  return (
    <div className={styles.encounter}>
      <div className={styles.encounterArena}>
        {phase !== 'caught' && (
          <div
            className={`${styles.wildSprite} ${phase === 'throwing' ? styles.wildCaptured : ''}`}
          />
        )}
        {phase === 'throwing' && <div className={styles.pokeball} />}

        {phase === 'caught' && (
          <div className={styles.caughtPanel}>
            <div className={styles.pokeballStatic} />
            <h2 className={styles.caughtTitle}>Gotcha! VIVAAN was caught!</h2>
            <p className={styles.caughtSub}>VIVAAN has been added to your team.</p>
            <div className={styles.caughtLinks}>
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={styles.caughtLink}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.encounterTextbox}>
        {phase === 'appeared' && (
          <>
            <p>A wild VIVAAN appeared!</p>
            <button className={styles.encounterButton} onClick={onThrow}>
              ● Throw ball
            </button>
          </>
        )}
        {phase === 'throwing' && <p>You threw a ball...</p>}
        {phase === 'caught' && (
          <button className={styles.encounterButton} onClick={onDismiss}>
            Return to town →
          </button>
        )}
      </div>
    </div>
  );
}
