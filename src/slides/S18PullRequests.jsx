import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';

const STEPS = [
  { title: 'Branch', text: 'Isolate your work on a feature branch.', cmd: 'git switch -c feature/search' },
  { title: 'Build & commit', text: 'Small steps, clear messages.', cmd: 'git commit -m "Add search"', },
  { title: 'Push', text: 'Upload the branch to GitHub.', cmd: 'git push -u origin feature/search' },
  { title: 'Open the PR', text: 'Ask the team: “please review and merge this”.', cmd: 'Compare & pull request' },
  { title: 'Review & merge', text: 'Discuss, improve, approve — then merge into main.', cmd: 'Merge pull request' },
];

const FACTS = [
  { ico: 'eye', title: 'A second pair of eyes on everything', text: 'Bugs are caught before they ship. Four eyes see more than two — every serious team reviews every change.' },
  { ico: 'users', title: 'Knowledge spreads through the team', text: 'Junior developers learn from review comments. Nobody owns a “black box” of code only they understand.' },
  { ico: 'history', title: 'Decisions become searchable history', text: 'Why was this line written? The PR discussion is attached to the merge forever — future you will thank present you.' },
  { ico: 'zap', title: 'CI runs automatically on the PR', text: 'Tests and builds run on every pull request. Merge only when the badge is green — automation backs up the review.' },
];

export default function S16PullRequests() {
  return (
    <section className="slide">
      <SlideHead
        num={18}
        eyebrow="Act IV · The Review Ritual"
        title="Pull Requests — Code That Gets Approved"
        sub="A pull request is a proposal: “I built this — please review it and merge it into main.”"
      />

      <div className="prflow">
        <div className="pr-steps">
          {STEPS.map((s, idx) => (
            <div key={s.title} className="card pr-step rise" style={{ '--d': `${0.12 + idx * 0.14}s` }}>
              <span className="num">{idx + 1}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              <span className="cmd-ex">{s.cmd}</span>
            </div>
          ))}
        </div>

        <div className="pr-bottom">
          <div className="card pr-mock rise" style={{ '--d': '.8s' }}>
            <div className="pr-mock-head">
              <span className="pr-state">● Open</span>
              <span className="pr-mock-title">Add search bar to the header</span>
              <span className="pr-mock-meta">feature/search → main · 3 files changed · +42 −7</span>
            </div>
            <div className="pr-comment">
              <span className="mini-avatar" style={{ background: 'linear-gradient(135deg,#4f46e5,#818cf8)' }}>S</span>
              <span><b>sara-dev</b> · Nice! Could we debounce the input? Also add a test for empty queries. 👍</span>
            </div>
            <div className="pr-actions">
              <span className="pr-btn approve">✓ Approve</span>
              <span className="pr-btn changes">Request changes</span>
              <span className="pr-btn ghost-btn">+ Comment</span>
            </div>
          </div>

          <div className="anatomy-facts" style={{ minHeight: 0 }}>
            {FACTS.map((f, idx) => (
              <div key={f.title} className="card fact-row rise" style={{ '--d': `${0.9 + idx * 0.18}s` }}>
                <div className="f-ico"><Icon name={f.ico} size={17} /></div>
                <div>
                  <h5>{f.title}</h5>
                  <p>{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="interaction">
        <span className="reveal-note rise" style={{ '--d': '1.6s' }}>
          PRs turn “trust me” into <b>“show me”</b> — and code gets better before it ships
        </span>
      </div>
    </section>
  );
}