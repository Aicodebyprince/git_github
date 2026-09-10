import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import Terminal from '../components/Terminal.jsx';

const FACTS = [
  { ico: 'zap', title: 'CI — Continuous Integration', text: <>Every push or pull request automatically runs your <b>build + tests</b>. Code that breaks everything is caught in minutes, not at demo time.</> },
  { ico: 'rocket', title: 'CD — Continuous Delivery', text: <>When tests pass, the workflow can <b>deploy automatically</b> — to a test server, or straight to production. Shipping becomes a routine, not an event.</> },
  { ico: 'refresh', title: 'Events fire the workflows', text: <><code>push</code>, <code>pull_request</code>, <code>schedule</code> (cron), <code>issue_comment</code>… pick a trigger and GitHub runs your automation on it.</> },
  { ico: 'shield', title: 'Green or red — merge only on green', text: <>The README badge shows pass/fail. A red workflow blocks the merge: <b>broken code never reaches main</b>.</> },
];

export default function S19Actions() {
  return (
    <section className="slide">
      <SlideHead
        num={21}
        eyebrow="Act IV · Automation"
        title="GitHub Actions — Your Automated Assistant"
        sub="A workflow file in your repo tells GitHub: every time X happens, automatically do Y. Build, test, deploy — hands-free."
      />

      <div className="actions-grid">
        <div>
          <Terminal title=".github/workflows/ci.yml">
            <div className="yaml">
              <div><span className="y-com"># triggered on every push & pull request</span></div>
              <div><span className="y-key">name:</span> <span className="y-str">CI</span></div>
              <div><span className="y-key">on:</span> <span className="y-bool">push</span></div>
              <div><span className="y-key">jobs:</span></div>
              <div>&nbsp;&nbsp;<span className="y-key">test:</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="y-key">runs-on:</span> <span className="y-str">ubuntu-latest</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="y-key">steps:</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="y-key">uses:</span> <span className="y-str">actions/checkout@v4</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="y-key">run:</span> <span className="y-str">npm ci</span></div>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- <span className="y-key">run:</span> <span className="y-str">npm test</span></div>
            </div>
          </Terminal>
          <div className="act-strip">
            <span className="act-chip"><Icon name="upload" size={12} /> push / PR</span>
            <Icon name="arrowRight" size={14} style={{ color: 'var(--ink-3)' }} />
            <span className="act-chip"><Icon name="zap" size={12} /> workflow runs</span>
            <Icon name="arrowRight" size={14} style={{ color: 'var(--ink-3)' }} />
            <span className="act-chip"><Icon name="terminal" size={12} /> jobs on runners</span>
            <Icon name="arrowRight" size={14} style={{ color: 'var(--ink-3)' }} />
            <span className="act-chip good"><Icon name="check" size={12} /> ✅ green → merge & deploy</span>
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
    </section>
  );
}