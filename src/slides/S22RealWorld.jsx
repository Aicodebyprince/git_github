import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import DayDemo from '../components/DayDemo.jsx';
import Terminal from '../components/Terminal.jsx';
import Icon from '../components/Icon.jsx';
import useSequence from '../hooks/useSequence.js';

const DAY = [
  {
    t: '9:00', title: 'git pull', icon: 'download',
    text: 'Morning sync — grab everything the team shipped yesterday.',
    cmd: 'git pull origin main',
    problem: 'Out of sync — nobody has the latest',
    fix: 'One command downloads the team\'s latest work, so you never build on a stale copy.',
  },
  {
    t: '9:05', title: 'New branch', icon: 'branch',
    text: 'Isolate your task from the safe main line.',
    cmd: 'git switch -c feature/payment',
    problem: 'Team conflicts — work collides',
    fix: 'Your task lives on its own lane. You can experiment freely without breaking anyone.',
  },
  {
    t: '9:30', title: 'Code + commit', icon: 'commit',
    text: 'Small steps, meaningful messages — every ~20 minutes.',
    cmd: 'git commit -m "Add payment form"',
    problem: 'Lost code — no way back',
    fix: 'Every snapshot is saved forever. A bad change can always be restored in seconds.',
  },
  {
    t: '15:00', title: 'git push', icon: 'upload',
    text: 'Publish the branch — CI tests start automatically.',
    cmd: 'git push -u origin feature/payment',
    problem: 'No backup — your laptop is a single point of failure',
    fix: 'Code is now safe on GitHub and CI starts testing it automatically.',
  },
  {
    t: '15:10', title: 'Open a PR', icon: 'pr',
    text: 'Describe the change, link the issue, request reviewers.',
    cmd: 'Pull request → closes #142',
    problem: 'No review — mistakes slip in silently',
    fix: 'Every change gets read, discussed and questioned by humans before it touches main.',
  },
  {
    t: '16:00', title: 'Review loop', icon: 'eye',
    text: 'Fix comments, push again — PR turns green.',
    cmd: 'git push + comments',
    problem: 'Bugs reach production',
    fix: 'Review comments + CI checks catch issues first, so main only ever receives green code.',
  },
  {
    t: '17:00', title: 'Merge', icon: 'merge',
    text: 'Approved → merged into main → everyone pulls tomorrow.',
    cmd: 'Merge pull request',
    problem: 'Many versions — which one is official?',
    fix: 'One protected main: only approved, tested code lands, and it becomes the one truth.',
  },
];

const LINES = [
  { at: 0, type: 'cmd', text: 'git pull origin main' },
  { at: 0, type: 'out', text: 'Updating 3d4e5f..9a8b7c — 14 files changed' },
  { at: 1, type: 'cmd', text: 'git switch -c feature/payment' },
  { at: 1, type: 'out', text: "Switched to a new branch 'feature/payment'" },
  { at: 2, type: 'cmd', text: 'git add checkout.js' },
  { at: 2, type: 'cmd', text: 'git commit -m "Add payment form"' },
  { at: 2, type: 'out', text: '[feature/payment c3f1a2b] Add payment form' },
  { at: 3, type: 'cmd', text: 'git push -u origin feature/payment' },
  { at: 3, type: 'out', text: '* [new branch] feature/payment -> feature/payment' },
  { at: 4, type: 'cmd', text: 'gh pr create --title "Add payment form"' },
  { at: 4, type: 'out', text: 'https://github.com/you/app/pull/142' },
  { at: 5, type: 'cmd', text: 'git push   # review fixes' },
  { at: 5, type: 'out', text: 'CI checks passed — 3/3 ✓ · review approved ✓' },
  { at: 6, type: 'cmd', text: 'gh pr merge --squash' },
  { at: 6, type: 'out', text: 'Merged pull request #142 -> main' },
];

export default function S20RealWorld() {
  const { n, done, replay } = useSequence(true, 7, 1600);
  const phase = Math.min(n, 6);
  const step = DAY[phase];

  return (
    <section className="slide">
      <SlideHead
        num={22}
        eyebrow="Act IV · Putting It All Together"
        title="The Real-World Workflow — A Day in the Life"
        sub="Every concept from this course, one ordinary Tuesday. Watch the loop run — and see which problem each step solves."
      />

      <div className="card why-banner rise" style={{ '--d': '.08s' }}>
        <span className="why-label">The daily loop</span>
        <div className="why-item"><Icon name="clock" size={17} /><span><b>One feature, one day</b> — pull, branch, commit, push, PR, merge.</span></div>
        <div className="why-item"><Icon name="users" size={17} /><span><b>A real team</b> — ten developers, ten branches, one protected main.</span></div>
        <div className="why-item"><Icon name="shield" size={17} /><span><b>Every step solves a problem</b> from Act I — watch them pair up below.</span></div>
      </div>

      <div className="merge-demo-grid">
        <div className="card merge-demo rise" style={{ '--d': '.12s' }}>
          <div className="md-head">
            <span className="md-step">
              Step {phase + 1}/7 · {step.t} — {step.title}{done ? ' ✓' : ''}
            </span>
            <button className="btn ghost md-replay" onClick={replay}>⟲ Replay</button>
          </div>
          <DayDemo n={n} />
          <p className="md-legend">
            <span className="md-legend-dot main" /> main &nbsp;·&nbsp;
            <span className="md-legend-dot feat" /> feature/payment &nbsp;·&nbsp;
            <span className="md-legend-dot good" /> merge &nbsp;·&nbsp;
            <span className="md-legend-dot good" style={{ background: 'var(--good)' }} /> HEAD
          </p>
        </div>

        <div className="merge-right">
          <Terminal title="one working day" className="merge-term">
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

          <div className={'rw-solves' + (done ? ' done' : '')}>
            <div className="rs-head">
              <span className="rs-time">{done ? 'done ✓' : `${step.t} — ${step.title}`}</span>
              <Icon name={step.icon} size={17} />
            </div>
            <h4>{done ? 'The loop repeats — every single day' : step.problem}</h4>
            <p className="rs-fix">
              {done ? (
                'Pull, branch, commit, push, PR, merge — the rhythm of the entire software industry. Tomorrow it starts at 9:00 again.'
              ) : (
                <b>{step.fix}</b>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="golden-strip">
        <span className="tag"><b className="rs-bad">Lost code</b> → solved by commits</span>
        <span className="tag"><b className="rs-bad">Team conflicts</b> → solved by branches</span>
        <span className="tag"><b className="rs-bad">Silent bugs</b> → solved by PRs &amp; CI</span>
        <span className="tag"><b className="rs-bad">No rollback</b> → solved by git revert</span>
      </div>

      <div className="interaction">
        <span className="reveal-note rise" style={{ '--d': '.8s' }}>
          Pull → branch → commit → push → PR → merge — <b>this loop is how real software ships, every day</b>
        </span>
      </div>
    </section>
  );
}