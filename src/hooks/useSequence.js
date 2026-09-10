import { useEffect, useState } from 'react';

/**
 * Runs a timed sequence 0..count when `active` is true.
 * Returns the current step n (0..count), whether it's done, and a replay function.
 */
export default function useSequence(active, count, interval) {
  const [n, setN] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!active) return;
    setN(0);
    const ids = [];
    for (let i = 1; i <= count; i++) {
      ids.push(setTimeout(() => setN(i), i * interval));
    }
    return () => ids.forEach(clearTimeout);
  }, [active, run, count, interval]);

  return { n, done: n >= count, replay: () => setRun((r) => r + 1) };
}
