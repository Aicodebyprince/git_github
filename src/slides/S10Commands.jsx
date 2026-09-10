import React, { useState } from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import Terminal from '../components/Terminal.jsx';

const CMDS = [
  {
    ico: 'filePlus', name: 'git init', ex: 'git init', when: 'Start tracking a brand-new project',
    lines: [
      { p: '$ git init' },
      { out: 'Initialized empty Git repository in ~/my-project/.git/' },
      { dim: '# the folder now has a .git brain — you have a repository' },
    ],
  },
  {
    ico: 'layers', name: 'git add', ex: 'git add app.js', when: 'Move changes into the staging area',
    lines: [
      { p: '$ git add app.js' },
      { p: '$ git status --short' },
      { hl: 'A  app.js' },
      { dim: '# staged: ready for the next commit' },
    ],
  },
  {
    ico: 'camera', name: 'git commit', ex: 'git commit -m "Add login form"', when: 'Save a permanent snapshot with a message',
    lines: [
      { p: '$ git commit -m "Add login form"' },
      { out: '[main a3f9c1d] Add login form' },
      { out: ' 1 file changed, 42 insertions(+)' },
    ],
  },
  {
    ico: 'upload', name: 'git push', ex: 'git push origin main', when: 'Upload your commits to the shared remote',
    lines: [
      { p: '$ git push origin main' },
      { out: 'To github.com:team/my-project.git' },
      { out: '   a1b2c3d..e4f5g6h  main -> main' },
    ],
  },
  {
    ico: 'download', name: 'git pull', ex: 'git pull origin main', when: 'Download teammates\' commits to your machine',
    lines: [
      { p: '$ git pull origin main' },
      { out: 'Updating a1b2c3d..e4f5g6h' },
      { out: 'Fast-forward — 3 files changed' },
    ],
  },
  {
    ico: 'remote', name: 'git clone', ex: 'git clone <url>', when: 'Copy a whole repo + history to your machine',
    lines: [
      { p: '$ git clone https://github.com/team/my-project.git' },
      { out: 'Cloning into \'my-project\'...' },
      { out: 'Receiving objects: 100% (120/120), done.' },
      { dim: '# full history included — not just files' },
    ],
  },
];

const SECONDARY = ['git status', 'git log', 'git branch', 'git switch', 'git merge', 'git restore'];

export default function S10Commands() {
  const [sel, setSel] = useState(0);
  const c = CMDS[sel];

  return (
    <section className="slide">
      <SlideHead
        num={10}
        eyebrow="Act II · The Toolkit"
        title="The Essential Commands — Your Git Toolkit"
        sub="Six commands cover 95% of daily Git. Click any card to see exactly what it does."
      />

      <div className="cmdlab-grid">
        <div className="cmdlab-cards">
          {CMDS.map((cmd, idx) => (
            <button
              key={cmd.name}
              className={'cmdlab-card shown' + (idx === sel ? ' sel' : '')}
              style={{ '--d': `${0.1 + idx * 0.08}s` }}
              onClick={() => setSel(idx)}
            >
              <span className="cc-top"><span className="c-ico"><Icon name={cmd.ico} size={15} /></span>{cmd.name}</span>
              <p>{cmd.when}</p>
              <span className="cc-ex"><b>$</b> {cmd.ex}</span>
            </button>
          ))}
        </div>

        <div className="cmdlab-out">
          <Terminal title={`demo — ${c.name}`}>
            {c.lines.map((l, i) => (
              <div key={i} className={l.p ? undefined : (l.hl ? 'hl' : l.out ? 'out' : 'dim')}>
                {l.p && <><span className="p">$</span> <span className="cmd">{l.p.slice(2)}</span></>}
                {l.out && <span className="out">{l.out}</span>}
                {l.hl && <span className="hl">{l.hl}</span>}
                {l.dim && <span className="dim">{l.dim}</span>}
              </div>
            ))}
            <div><span className="caret" /></div>
          </Terminal>
          <div className="cmd-strip">
            {SECONDARY.map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
          <p className="reveal-note rise" style={{ '--d': '.6s', margin: 0 }}>
            You'll meet these six helpers next: <b>status · log · branch · switch · merge · restore</b>
          </p>
        </div>
      </div>
    </section>
  );
}