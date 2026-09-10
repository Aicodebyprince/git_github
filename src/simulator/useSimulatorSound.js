import { useState, useCallback, useRef, useEffect } from 'react';

export function useSimulatorSound() {
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem('shopflow_simulator_muted') === 'true';
    } catch {
      return false;
    }
  });

  const audioCtxRef = useRef(null);

  const getAudioContext = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('shopflow_simulator_muted', String(next));
      } catch {}
      return next;
    });
  }, []);

  const playTone = useCallback(
    (freq, type = 'sine', duration = 0.15, gainVal = 0.08, rampTo = null) => {
      if (muted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        if (rampTo) {
          osc.frequency.exponentialRampToValueAtTime(rampTo, now + duration);
        }

        gain.gain.setValueAtTime(gainVal, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      } catch (err) {
        // audio errors should never crash the UI
      }
    },
    [muted, getAudioContext]
  );

  const playClick = useCallback(() => {
    playTone(720, 'triangle', 0.04, 0.04);
  }, [playTone]);

  const playSuccess = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 major chime
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.06);
        gain.gain.setValueAtTime(0.06, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.35);
      });
    } catch {}
  }, [muted, getAudioContext]);

  const playError = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      [180, 140].forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, now + idx * 0.08);
        gain.gain.setValueAtTime(0.05, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.22);
      });
    } catch {}
  }, [muted, getAudioContext]);

  const playRebase = useCallback(() => {
    playTone(280, 'sine', 0.25, 0.06, 620);
  }, [playTone]);

  const playSquash = useCallback(() => {
    playTone(480, 'triangle', 0.2, 0.08, 160);
  }, [playTone]);

  const playCelebration = useCallback(() => {
    if (muted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const chord = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      chord.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.07);
        gain.gain.setValueAtTime(0.07, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.65);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.65);
      });
    } catch {}
  }, [muted, getAudioContext]);

  return {
    muted,
    toggleMute,
    playClick,
    playSuccess,
    playError,
    playRebase,
    playSquash,
    playCelebration
  };
}
