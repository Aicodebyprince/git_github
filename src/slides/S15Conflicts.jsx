import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import ConflictDemo from '../components/ConflictDemo.jsx';
import Terminal from '../components/Terminal.jsx';
import Icon from '../components/Icon.jsx';
import useSequence from '../hooks/useSequence.js';

const STEP_LABELS = [
  'Two branches diverge',
  'main changes the line',
  'feature changes it too',
  'Merge → CONFLICT!',
  'You resolve it',
  'Committed — nothing lost',
];

const LINES = [
  { at: 1, type: 'cmd', text: 'git commit -m "Style: indigo button"' },
  { at: 1, type: 'out', text: '[main m9x8y7z] Style: indigo button' },
  { at: 2, type: 'cmd', text: 'git commit -m "Style: green button"' },
  { at: 2, type: 'out', text: '[feature/login f1a2b3c] Style: green button' },
  { at: 3, type: 'cmd', text: 'git switch main' },
  { at: 3, type: 'cmd', text: 'git merge feature/login' },
  { at: 3, type: 'err', text: 'CONFLICT (content): Merge conflict in style.css' },
  { at: 3, type: 'out', text: 'Automatic merge failed; fix conflicts and commit.' },
  { at: 4, type: 'cmd', text: 'nano style.css   # pick one side or combine' },
  { at: 4, type: 'cmd', text: 'git add style.css' },
  { at: 4, type: 'out', text: 'All conflicts fixed but you are still merging.' },
  { at: 5, type: 'cmd', text: 'git commit' },
  { at: 5, type: 'out', text: "[main c5d6e7f] Merge branch 'feature/login'" },
  { at: 5, type: 'out', text: 'Resolved — nothing was lost ✓' },
];

const BASICS = [
  {
    ico: 'key',
    color: '#fb7185',
    bg: 'rgba(251, 113, 133, 0.14)',
    title: 'The Conflict Markers',
    text: <>Git marks the clash: <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> (current), <code>=======</code> (divider), and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; branch</code> (incoming). Delete markers & keep desired code.</>,
  },
  {
    ico: 'check',
    color: 'var(--good)',
    bg: 'var(--good-soft)',
    title: 'The 3-Step Resolution',
    text: <>1. Edit file & delete marker lines &nbsp;·&nbsp; 2. <code>git add style.css</code> to mark resolved &nbsp;·&nbsp; 3. <code>git commit</code> to seal the merge.</>,
  },
];

export default function S15Conflicts() {
  const { n, done, replay } = useSequence(true, 6, 1500);
  const phase = Math.min(n, 5);

  return (
    <section className="slide">
      <SlideHead
        num={15}
        eyebrow="Act II · When Things Collide"
        title="Merge Conflicts — When Git Asks for Help"
        sub="A conflict is not an error — it's Git refusing to guess. When two branches edit the exact same lines, Git protects both developers' work and asks a human to decide."
      />

      <div className="card why-banner rise" style={{ '--d': '.08s' }}>
        <span className="why-label">Why conflicts happen</span>
        <div className="why-item"><Icon name="branch" size={16} /><span><b>Same lines, two branches</b> — simultaneous edits to the same region.</span></div>
        <div className="why-item"><Icon name="shield" size={16} /><span><b>Zero silent data loss</b> — Git never overwrites your teammate's code.</span></div>
        <div className="why-item"><Icon name="users" size={16} /><span><b>Built-in code review</b> — inspect both versions, decide, and commit.</span></div>
      </div>

      <div className="merge-demo-grid">
        <div className="card merge-demo rise" style={{ '--d': '.12s' }}>
          <div className="md-head">
            <span className="md-step">
              Step {phase + 1}/6 — {STEP_LABELS[phase]}{done ? ' ✓' : ''}
            </span>
            <button className="btn ghost md-replay" onClick={replay}>⟲ Replay</button>
          </div>
          <ConflictDemo n={n} />
        </div>

        <div className="merge-right">
          <Terminal title="git — conflict resolution" className="merge-term">
            {LINES.map((l, idx) => (
              <div key={idx} className={'term-line' + (n >= l.at ? ' shown' : '')}>
                {l.type === 'cmd' ? (
                  <><span className="p">$</span> <span className="cmd">{l.text}</span></>
                ) : l.type === 'err' ? (
                  <span className="err">{l.text}</span>
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
        <span className="tag warn">⚠ conflicts only happen if BOTH branches touch the exact same line</span>
        <span className="tag">✓ read both versions before removing markers</span>
        <span className="tag good">✓ always run test suite before committing</span>
      </div>
    </section>
  );
}