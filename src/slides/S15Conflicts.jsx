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
  { ico: 'key', title: 'The markers', text: <>Git writes <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code>, <code>=======</code> and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; branch</code> around the clash — both versions shown side by side, inside your file.</> },
  { ico: 'shield', title: 'Protection, not failure', text: 'Git never guesses. A conflict is Git refusing to silently destroy someone\'s work — it stops and asks a human.' },
  { ico: 'check', title: 'Resolve & test', text: 'Pick one side, combine them, or rewrite — then run your tests, git add, and commit. The merge completes.' },
];

export default function S13Conflicts() {
  const { n, done, replay } = useSequence(true, 6, 1500);
  const phase = Math.min(n, 5);

  return (
    <section className="slide">
      <SlideHead
        num={15}
        eyebrow="Act II · When Things Collide"
        title="Merge Conflicts — When Git Asks for Help"
        sub="Git merges automatically most of the time. But when two branches edit the same lines, Git refuses to guess — it shows you both versions and asks you to decide."
      />

      <div className="card why-banner rise" style={{ '--d': '.08s' }}>
        <span className="why-label">Why conflicts happen — and why that's good</span>
        <div className="why-item"><Icon name="branch" size={17} /><span><b>Same lines, two branches</b> — both edited the same region of the same file; a collision is unavoidable.</span></div>
        <div className="why-item"><Icon name="shield" size={17} /><span><b>Nothing is silently lost</b> — Git refuses to overwrite either side's work.</span></div>
        <div className="why-item"><Icon name="users" size={17} /><span><b>You make the call</b> — see both versions, decide, and commit. Like a built-in code review.</span></div>
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
          <Terminal title="git — conflict" className="merge-term">
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
        <span className="tag warn">⚠ conflicts need BOTH sides to edit the same lines</span>
        <span className="tag">✓ read both versions before resolving</span>
        <span className="tag">✓ run tests after every resolution</span>
      </div>

      <div className="interaction">
        <div className="bigquote good rise" style={{ '--d': '.6s', maxWidth: 880 }}>
          <span className="quote-mark">“</span>
          <p>
            A conflict is not an error — <span style={{ color: 'var(--good)' }}>it's Git refusing to guess.</span>
            <span className="sub">Git protects both developers' work and asks a human to decide. That's a feature, not a bug.</span>
          </p>
        </div>
      </div>
    </section>
  );
}