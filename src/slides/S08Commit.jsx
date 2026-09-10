import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import useSequence from '../hooks/useSequence.js';
import Terminal from '../components/Terminal.jsx';
import Icon from '../components/Icon.jsx';

const ROWS = [
  { k: 'commit', v: 'a3f9c1d8e2b4', cls: 'hash', note: 'unique fingerprint (SHA-1)' },
  { k: 'Author', v: 'Sara <sara@team.dev>', note: 'who made the change' },
  { k: 'Date', v: 'Fri Sep 8 14:32:07 2026', note: 'exactly when' },
  { k: 'message', v: 'Fix login button alignment', cls: 'msg', note: 'the human story' },
  { k: 'parent', v: '7b2e4f8…', note: 'links to the previous commit' },
];

const FACTS = [
  { ico: 'camera', title: 'Snapshot, not differences', text: <>Unlike older tools that store <code>patches</code>, Git stores a full <b>snapshot</b> of every file at commit time — and reuses unchanged files efficiently.</> },
  { ico: 'commit', title: 'A chain of commits', text: <>Each commit points to its <code>parent</code> — forming a chain that is your project's complete history, ready to be walked in any direction.</> },
  { ico: 'lock', title: 'Practically tamper-proof', text: <>Every commit's id is computed from its contents. Change <code>anything</code> and the id changes — history cannot silently lie.</> },
];

export default function S06Anatomy() {
  const seq = useSequence(true, ROWS.length + 1, 480);

  return (
    <section className="slide">
      <SlideHead
        num={8}
        eyebrow="Act II · Core Concept"
        title="Commit — Saving a Snapshot"
        sub="A commit is not just “a save” — it is a signed, timestamped, linked snapshot of your entire project."
      />

      <div className="anatomy-grid">
        <div>
          <Terminal title="git show a3f9c1d">
            <div className="commit-card-viz">
              {ROWS.map((r, idx) => (
                <div key={r.k} className={'row' + (idx < seq.n ? ' shown' : '')}>
                  <span className="k">{r.k}</span>
                  <span className={'v ' + (r.cls || '')}>{r.v}</span>
                  <span className="dim" style={{ fontSize: '0.85em' }}>— {r.note}</span>
                </div>
              ))}
            </div>
          </Terminal>
          <div className="commit-parent rise" style={{ '--d': '2.6s' }}>
            <Icon name="commit" size={17} />
            parent → 7b2e4f8 → c9d1a05 → …  <span style={{ color: 'var(--ink-3)' }}>each link goes back in time</span>
          </div>
        </div>

        <div className="anatomy-facts">
          {FACTS.map((f, idx) => (
            <div key={f.title} className="card fact-row rise" style={{ '--d': `${0.4 + idx * 0.25}s` }}>
              <div className="f-ico"><Icon name={f.ico} size={17} /></div>
              <div>
                <h5>{f.title}</h5>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="interaction">
        <span className="reveal-note rise" style={{ '--d': '3s' }}>
          “Git doesn't store versions. It stores <b>history</b> — and history can't be silently rewritten.”
        </span>
      </div>
    </section>
  );
}
