import styles from '../../styles/Game.module.css';

export default function DialogueBox({ name, pages, page, onAdvance }) {
  const isLast = page >= pages.length - 1;
  return (
    <div className={styles.dialogueBox} onClick={onAdvance}>
      <div className={styles.dialogueName}>{name}</div>
      <p className={styles.dialogueText}>{pages[page]}</p>
      <div className={styles.dialogueHint}>
        {isLast ? '✕ close' : '▼'}
      </div>
    </div>
  );
}
