import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import Terminal from '../components/Terminal.jsx';

/* mini before/after graph for the rebase column */
function Rail({ label, dots, offset = 0 }) {
  return (
    <div className="rb-row" style={{ marginLeft: offset * 26 }}>
      <span className="rb-label">{label}</span>
      {dots.map((d, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="rb-seg" />}
          <span className={'rb-dot ' + (d.cls || '')} title={d.id || ''}>{d.id}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function RebaseViz() {
  return (
    <div className="rb-viz">
      <div className="rb-half">
        <span className="rb-cap bad">before — messy fork</span>
        <Rail label="main" dots={[{ id: 'A' }, { id: 'B' }, { id: 'C' }]} />
        <Rail label="feature" dots={[{ id: 'X' }, { id: 'Y', cls: 'feat' }]} offset={1} />
      </div>
      <div className="rb-arrow">↓ git rebase main</div>
      <div className="rb-half">
        <span className="rb-cap good">after — one clean line</span>
        <Rail label="main" dots={[{ id: 'A' }, { id: 'B' }, { id: 'C' }]} />
        <Rail label="feature" dots={[{ id: "X'", cls: 'feat ghosted' }, { id: "Y'", cls: 'feat' }]} offset={3} />
      </div>
    </div>
  );
}

const COLS = [
  {
    ico: 'undo', name: 'git revert', tone: 'brand',
    tagline: 'Safely undo a commit',
    plain: 'Creates a brand-new commit that does the exact opposite of a bad one — the mistake stays in history, but its effect is cancelled.',
    deep: [
      'This is the safe way to undo. Nothing is erased — Git simply adds an "anti-commit". History stays honest, and nobody on the team notices anything strange.',
      'That\'s why revert works on commits that are already pushed to GitHub, while git reset (which erases history) is only for your own local, unpushed work.',
    ],
    when: [
      'A bad commit already reached the shared main branch',
      '"Undo that feature, but keep the record of what happened"',
    ],
    term: [
      { p: '$ git revert a9f3c1d' },
      { out: '[main e5f6a7b] Revert "Fix checkout bug"' },
      { dim: '# new commit · old one remains — history is never rewritten' },
    ],
  },
  {
    ico: 'history', name: 'git rebase', tone: 'violet',
    tagline: 'Move branch onto latest history',
    plain: 'Takes your branch\'s commits, lifts them off, and replays them on top of the newest main — as if you had started work today.',
    deep: [
      'While you worked for 3 days, teammates moved main forward. git rebase main re-attaches your commits after theirs — no noisy "Merge branch" commits, just one clean line.',
      'Golden rule: never rebase commits other people already have. Rebase rewrites history, so use it on your own local / unmerged branches only.',
    ],
    when: [
      'Updating a long-running feature branch with the latest main',
      'Keeping project history a straight, readable line',
    ],
    term: [
      { p: '$ git switch feature/payment' },
      { p: '$ git rebase main' },
      { out: 'Successfully rebased and updated refs/heads/feature/payment.' },
      { dim: '# your 2 commits now sit on top of everyone\'s newest work' },
    ],
  },
  {
    ico: 'layers', name: 'squash', tone: 'cyan',
    tagline: 'Combine many commits into one',
    plain: 'Merges a series of small commits ("fix typo", "final fix", "REALLY final") into one single clean commit with a proper message.',
    deep: [
      'During review you push 15 tiny fixes — that\'s noise. Squashing folds them into one commit: "Add payment form". The PR history becomes a story worth reading.',
      'Two ways: git rebase -i (interactive — mark commits as squash) or the "Squash and merge" button on GitHub, which most companies use by default.',
    ],
    when: [
      'Cleaning up a messy branch before opening the PR',
      'One logical change = one commit — the professional standard',
    ],
    term: [
      { p: '$ git rebase -i main' },
      { out: 'pick   c3f1a2b Add payment form' },
      { out: 'squash 8d2e4f9 fix typo' },
      { out: 'squash b7c9d1e REALLY final fix' },
      { dim: '# 3 commits become 1 — "Add payment form"' },
    ],
  },
];

export default function S12ProCommands2() {
  return (
    <section className="slide">
      <SlideHead
        num={12}
        eyebrow="Act II · The Toolkit — Level 2"
        title="Commands Tech Companies Use Daily — II"
        sub="The undo-and-rewrite toolkit. These four keep a thousand-developer history clean, safe and readable — this is what 'professional Git' really means."
      />

      <div className="pro3-grid">
        {COLS.map((c, idx) => (
          <div key={c.name} className={'card pro-col tone-' + c.tone + ' rise'} style={{ '--d': `${0.12 + idx * 0.18}s` }}>
            <div className="pc-head">
              <span className="pc-ico"><Icon name={c.ico} size={19} /></span>
              <h3>{c.name}</h3>
            </div>
            <p className="pc-tagline">{c.tagline}</p>

            <p className="pc-plain">{c.plain}</p>

            {c.name === 'git rebase' && <RebaseViz />}

            <ul className="pc-deep">
              {c.deep.map((d, i) => <li key={i}>{d}</li>)}
            </ul>

            <div className="pc-when">
              <span className="pc-when-label">used for</span>
              {c.when.map((w, i) => <span key={i} className="pc-when-item">{w}</span>)}
            </div>

            <Terminal title={c.name} className="pc-term">
              {c.term.map((l, i) => (
                <div key={i}>
                  {l.p && <><span className="p">$</span> <span className="cmd">{l.p.slice(2)}</span></>}
                  {l.out && <span className="out">{l.out}</span>}
                  {l.dim && <span className="dim">{l.dim}</span>}
                </div>
              ))}
            </Terminal>
          </div>
        ))}
      </div>

      <div className="golden-strip">
        <span className="tag good">✓ undo a pushed commit → revert</span>
        <span className="tag">✓ clean history → rebase</span>
        <span className="tag">✓ tidy PRs → squash</span>
        <span className="tag warn">✗ never rewrite shared history</span>
      </div>
    </section>
  );
}
