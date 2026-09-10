import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import BranchDemo from '../components/BranchDemo.jsx';
import Terminal from '../components/Terminal.jsx';
import Icon from '../components/Icon.jsx';
import useSequence from '../hooks/useSequence.js';

const STEP_LABELS = [
  'Start on main',
  'Create the branch',
  'Commit on the branch',
  'Commit again',
  'Switch back to main',
  'Two branches, side by side',
];

const LINES = [
  { at: 1, type: 'cmd', text: 'git switch -c feature/login' },
  { at: 1, type: 'out', text: "Switched to a new branch 'feature/login'" },
  { at: 2, type: 'cmd', text: 'git add . && git commit -m "Add login form"' },
  { at: 2, type: 'out', text: '[feature/login c3a1b2c] Add login form' },
  { at: 3, type: 'cmd', text: 'git commit -m "Validate inputs"' },
  { at: 3, type: 'out', text: '[feature/login d4e5f6a] Validate inputs' },
  { at: 4, type: 'cmd', text: 'git switch main' },
  { at: 4, type: 'out', text: "Switched to branch 'main'" },
  { at: 5, type: 'cmd', text: 'git branch -v' },
  { at: 5, type: 'out', text: '* main            a1b2c3d' },
  { at: 5, type: 'out', text: '  feature/login   d4e5f6a' },
];

const BASICS = [
  { ico: 'branch', title: 'A branch = a pointer', text: 'Not a copy of your code — just a label on a commit. Instant, free, and you can have hundreds.' },
  { ico: 'shield', title: 'main stays safe', text: 'Your branch can break anything it wants — main never notices until you merge.' },
  { ico: 'merge', title: 'Merge & delete', text: 'Once merged, git branch -d removes the label. The next slide shows that happening live.' },
];

export default function S11Branch() {
  const { n, done, replay } = useSequence(true, 6, 1400);
  const phase = Math.min(n, 5);

  return (
    <section className="slide">
      <SlideHead
        num={13}
        eyebrow="Act II · Superpower #1"
        title="Branching — Parallel Universes for Code"
        sub="Watch a branch come to life, step by step. A branch is just a movable label on a commit — while you experiment, main stays perfectly safe."
      />

      <div className="card why-banner rise" style={{ '--d': '.08s' }}>
        <span className="why-label">Why branch?</span>
        <div className="why-item"><Icon name="users" size={17} /><span><b>Parallel work</b> — 10 features, 10 branches: nobody waits, nobody collides.</span></div>
        <div className="why-item"><Icon name="shield" size={17} /><span><b>Risk isolation</b> — experiment freely while main stays shippable.</span></div>
        <div className="why-item"><Icon name="eye" size={17} /><span><b>Reviewable</b> — every branch becomes a clean pull request.</span></div>
      </div>

      <div className="merge-demo-grid">
        <div className="card merge-demo rise" style={{ '--d': '.12s' }}>
          <div className="md-head">
            <span className="md-step">
              Step {phase + 1}/6 — {STEP_LABELS[phase]}{done ? ' ✓' : ''}
            </span>
            <button className="btn ghost md-replay" onClick={replay}>⟲ Replay</button>
          </div>
          <BranchDemo n={n} />
          <p className="md-legend">
            <span className="md-legend-dot main" /> main &nbsp;·&nbsp;
            <span className="md-legend-dot feat" /> feature/login &nbsp;·&nbsp;
            <span className="md-legend-dot good" /> HEAD (where you are)
          </p>
        </div>

        <div className="merge-right">
          <Terminal title="git — branching" className="merge-term">
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
            {BASICS.map((k, idx) => (
              <div key={k.title} className="card merge-kind rise" style={{ '--d': `${0.5 + idx * 0.2}s` }}>
                <div className="mk-ico"><Icon name={k.ico} size={18} /></div>
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
        <span className="tag">✓ name branches clearly:</span>
        <span className="tag warn">feature/login</span>
        <span className="tag">bugfix/header</span>
        <span className="tag">hotfix/v1.2</span>
      </div>
    </section>
  );
}