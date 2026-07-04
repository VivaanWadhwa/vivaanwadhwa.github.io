import { useEffect } from 'react';

const DIRECTIONS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
  W: 'up',
  S: 'down',
  A: 'left',
  D: 'right',
};

const ACTION_KEYS = new Set([' ', 'Enter', 'e', 'E']);
const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'textarea',
  'select',
  '[role="button"]',
  '[role="link"]',
  '[contenteditable]:not([contenteditable="false"])',
].join(',');

const isInteractiveTarget = (target) =>
  target instanceof Element && Boolean(target.closest(INTERACTIVE_SELECTOR));

// Global arrow/WASD + action key handling. Handlers receive one call per
// keydown (browser key-repeat gives held-key movement for free).
export default function useKeyboardMovement({ onMove, onAction }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.defaultPrevented || isInteractiveTarget(event.target)) {
        return;
      }

      const dir = DIRECTIONS[event.key];
      if (dir) {
        event.preventDefault();
        onMove(dir);
      } else if (ACTION_KEYS.has(event.key)) {
        event.preventDefault();
        onAction();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onMove, onAction]);
}
