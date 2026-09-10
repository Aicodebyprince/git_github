import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import MergeDemo from '../components/MergeDemo.jsx';
import Terminal from '../components/Terminal.jsx';
import Icon from '../components/Icon.jsx';
import useSequence from '../hooks/useSequence.js';

const STEP_LABELS = [
  'Start on main',
  'Create the branch',
  'Commit on the branch',
  'Commit again',
  'Merge back to main',
  'Delete the branch',
];

const LINES = [
  { at: 1, type: 'cmd', text: 'git switch -c feature/login' },
  { at: 1, type: 'out', text: "Switched to a new branch 'feature/login'" },
  { at: 2, type: 'cmd', text: 'git commit -m "Add login form"' },
  { at: 2, type: 'out', text: '[feature/login c3a1b2c] Add login form' },
  { at: 3, type: 'cmd', text: 'git commit -m "Validate inputs"' },
  { at: 3, type: 'out', text: '[feature/login d4e5f6a] Validate inputs' },
  { at: 4, type: 'cmd', text: 'git switch main' },
  { at: 4, type: 'cmd', text: 'git merge feature/login' },
  { at: 4, type: 'out', text: "Merge made by the 'ort' strategy." },
  { at: 5, type: 'cmd', text: 'git branch -d feature/login' },
  { at: 5, type: 'out', text: 'Deleted branch feature/login.' },
];

const KINDS = [
  { ico: 'arrowRight', color: 'var(--good)', bg: 'var(--good-soft)', title: 'Fast-forward merge', text: 'main hasn\'t moved → Git just slides the main pointer forward to where the feature ended. No new commit — history stays a straight line.' },
  { ico: 'merge', color: 'var(--brand)', bg: 'var(--brand-soft)', title: 'Merge commit', text: 'Both sides added commits → Git finds the common ancestor, combines both change sets, and creates a commit with two parents. Nothing is lost.' },
];

export default function S12Merging() {
  const { n, done, replay } = useSequence(true, 6, 1400);
  const phase = Math.min(n, 5);

  return (
    <section className="slide">
      <SlideHead
        num={14}
        eyebrow="Act II · Combining Work"
        title="Merging — Bringing Work Together"
        sub="Watch a real merge happen, step by step. A branch's story ends when it merges back into main — and Git does almost all of it alone."
      />

      <div className="card why-banner rise" style={{ '--d': '.08s' }}>
        <span className="why-label">Why merge?</span>
        <div className="why-item"><Icon name="users" size={17} /><span><b>Combine parallel work</b> — everyone's branch flows back into one shared main.</span></div>
        <div className="why-item"><Icon name="box" size={17} /><span><b>One source of truth</b> — main is the single official version of the project.</span></div>
        <div className="why-item"><Icon name="shield" size={17} /><span><b>Reviewed & green</b> — merging lands code that passed review and CI.</span></div>
      </div>

      <div className="merge-demo-grid">
        <div className="card merge-demo rise" style={{ '--d': '.12s' }}>
          <div className="md-head">
            <span className="md-step">
              Step {phase + 1}/6 — {STEP_LABELS[phase]}{done ? ' ✓' : ''}
            </span>
            <button className="btn ghost md-replay" onClick={replay}>⟲ Replay</button>
          </div>
          <MergeDemo n={n} />
          <p className="md-legend">
            <span className="md-legend-dot main" /> main &nbsp;·&nbsp;
            <span className="md-legend-dot feat" /> feature/login &nbsp;·&nbsp;
            <span className="md-legend-dot good" /> merge
          </p>
        </div>

        <div className="merge-right">
          <Terminal title="git — merging" className="merge-term">
            {LINES.map((l, idx) => (
              <div key={idx} className={'term-line' + (n >= l.at ? ' shown' : '')}>
                {l.type === 'cmd' ? (
                  <><span className="p">$</span> <span className="cmd">{l.text}</span></>
                ) : (
                  <span className="out">{l.text}</span>
                )}
              </div>
            ))}
            {!done && <div className="term-line shown"><span className="caret" /></div>}
          </Terminal>

          <div className="merge-kinds">
            {KINDS.map((k, idx) => (
              <div key={k.title} className="card merge-kind rise" style={{ '--d': `${0.5 + idx * 0.2}s` }}>
                <div className="mk-ico" style={{ background: k.bg, color: k.color }}><Icon name={k.ico} size={18} /></div>
                <div>
                  <h4>{k.title}</h4>
                  <p>{k.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="golden-strip">
        <span className="tag good">✓ merge often — small merges are boring</span>
        <span className="tag">✓ keep branches short-lived</span>
        <span className="tag warn">✓ main must always stay green</span>
      </div>
    </section>
  );
}