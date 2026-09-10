import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import Terminal from '../components/Terminal.jsx';

const COLS = [
  {
    ico: 'history', name: 'git log', tone: 'brand',
    tagline: 'View commit history',
    plain: 'Shows every commit ever made on your branch — newest first, each with its ID, author, date and message.',
    deep: [
      'Every commit has a unique ID (hash) like a9f3c1d — that\'s its permanent address in history.',
      'Press q to quit the pager, or add flags to make it readable: --oneline for one line, --graph to draw the branches, -p to see the actual code that changed.',
    ],
    when: [
      'Finding the commit where a bug was introduced',
      'Checking what a teammate changed yesterday',
      'Getting the ID you need for revert / checkout',
    ],
    term: [
      { p: '$ git log --oneline --graph' },
      { out: '* a9f3c1d (HEAD -> main) Fix checkout bug' },
      { out: '* 7e2b8f4 Add payment validation' },
      { out: '* c1d9a05 Initial commit' },
      { dim: '# your project\'s diary — every change, every author, every time' },
    ],
  },
  {
    ico: 'undo', name: 'git checkout', tone: 'violet',
    tagline: 'Move to any branch or commit',
    plain: 'The classic time-travel command — it points your working directory at any branch or any historical commit.',
    deep: [
      'git checkout <branch> moves to a branch. git checkout <commit-id> puts your whole project back in time, exactly as it was that day — read-only, nothing is lost.',
      'One command, two jobs — that\'s why the Git team later split it: today you should prefer git switch (branches) and git restore (files). checkout still works everywhere.',
    ],
    when: [
      'Jumping to an older version to inspect a bug ("it worked last week…")',
      'Trying an experimental branch created by someone else',
    ],
    term: [
      { p: '$ git checkout 7e2b8f4' },
      { out: 'Note: switching to \'7e2b8f4\'.' },
      { out: 'You are in \'detached HEAD\' state.' },
      { p: '$ git checkout main' },
      { out: 'Switched to branch \'main\'' },
      { dim: '# look around the past — then return by name' },
    ],
  },
  {
    ico: 'refresh', name: 'git stash', tone: 'cyan',
    tagline: 'Temporarily save unfinished work',
    plain: 'Shelves your uncommitted changes in a safe place and gives you a clean working directory — like pausing a game.',
    deep: [
      'Boss says: "emergency fix on main NOW" — but your half-finished feature is everywhere. git stash boxes it up instantly; git stash pop brings it back exactly as it was.',
      'Stashes stack up: stash@{0} is the newest, stash@{1} the one before. Use git stash list to see them all. Stashes are local — they never reach GitHub.',
    ],
    when: [
      'Switching tasks suddenly without committing messy code',
      'Pulling teammates\' changes when your working dir is dirty',
    ],
    term: [
      { p: '$ git stash' },
      { out: 'Saved working directory… HEAD is now at a9f3c1d' },
      { p: '$ git stash list' },
      { out: 'stash@{0}: WIP on feature: a9f3c1d fix' },
      { p: '$ git stash pop' },
      { out: 'Dropped refs/stash@{0} — changes restored' },
      { dim: '# pause → clean desk → resume where you left off' },
    ],
  },
];

export default function S11ProCommands1() {
  return (
    <section className="slide">
      <SlideHead
        num={11}
        eyebrow="Act II · The Toolkit — Level 2"
        title="Commands Tech Companies Use Daily — I"
        sub="Beyond the basics: how real engineers read history, time-travel and juggle unfinished work — the commands you'll see in every professional codebase."
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
    </section>
  );
}
