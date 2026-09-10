import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';

const FACTS = [
  { ico: 'alert', title: 'One issue = one problem', text: <>A <b>bug report</b>, a <b>feature request</b>, a <b>question</b>, a <b>task</b> — each gets its own issue with a clear title, so nothing gets lost in chat.</> },
  { ico: 'tag', title: 'Labels & assignees organize chaos', text: <><code>bug</code>, <code>enhancement</code>, <code>good first issue</code> — labels sort the pile; assignees say <b>who owns it</b>. Milestones group issues toward a release.</> },
  { ico: 'pr', title: 'Issues and PRs talk to each other', text: <>Write <code>closes #142</code> in a pull request, and GitHub <b>auto-closes the issue</b> the moment the PR merges. Bug → fix → closed, all linked.</> },
  { ico: 'history', title: 'A searchable paper trail', text: <>Every decision, discussion and fix is recorded permanently. Six months later, anyone can answer: <b>why does this code exist?</b></> },
];

export default function S18Issues() {
  return (
    <section className="slide">
      <SlideHead
        num={20}
        eyebrow="Act IV · Tracking the Work"
        title="Issues — The Team's To-Do & Bug Tracker"
        sub="An issue is a tracked conversation about one specific problem or idea — the heartbeat of every GitHub project."
      />

      <div className="issue-grid">
        <div className="issue-mock rise" style={{ '--d': '.15s' }}>
          <div className="issue-head">
            <span className="issue-state">● Open</span>
            <span className="issue-title">#142 · App crashes when login fails twice</span>
          </div>
          <div className="issue-body">
            <b>Steps to reproduce:</b> ① enter a wrong password ② press Enter twice quickly.
            <br />
            <b>Expected:</b> show “Invalid credentials” — <b>Actual:</b> white screen 💥
            <br />
            Looks like <code>auth.js:37</code> throws before the error state renders.
            <div className="issue-labels">
              <span className="issue-label bug">🐞 bug</span>
              <span className="issue-label first">🌱 good first issue</span>
              <span className="issue-label enh">🚀 priority: high</span>
            </div>
          </div>
          <div className="issue-foot">
            <span className="mini-avatar" style={{ background: 'linear-gradient(135deg,#7c3aed,#c084fc)' }}>A</span>
            <span>assigned to aisha-dev</span>
            <span style={{ marginLeft: 'auto' }}>💬 3 comments · opened 2 days ago</span>
          </div>
        </div>

        <div className="anatomy-facts">
          {FACTS.map((f, idx) => (
            <div key={f.title} className="card fact-row rise" style={{ '--d': `${0.25 + idx * 0.2}s` }}>
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
        <span className="reveal-note rise" style={{ '--d': '1.1s' }}>
          An issue is a promise: <b>“this problem is known, tracked, and will be handled”</b>
        </span>
      </div>
    </section>
  );
}