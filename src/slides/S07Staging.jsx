import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import Terminal from '../components/Terminal.jsx';
import useSequence from '../hooks/useSequence.js';

const FACTS = [
  { ico: 'layers', title: 'You choose exactly what ships', text: <>A bug fix doesn't have to ride along with your unfinished feature. Stage <b>only the changes that belong together</b> — every commit becomes a clean, understandable unit.</> },
  { ico: 'search', title: 'A review point before saving', text: <>Run <code>git diff --staged</code> to inspect the exact lines about to be committed. One last look before the snapshot is taken.</> },
  { ico: 'undo', title: 'Change your mind anytime', text: <><code>git restore --staged file</code> moves a file back out of staging — nothing is lost, nothing is final until you commit.</> },
];

export default function S07Staging() {
  const { n } = useSequence(true, 5, 480);

  return (
    <section className="slide">
      <SlideHead
        num={7}
        eyebrow="Act II · The Second Area"
        title="Staging Area — The Waiting Room"
        sub="Between your editor and Git's history sits a tiny room with one job: let you decide what gets saved."
      />

      <div className="stage-grid">
        <div className="card" style={{ padding: 'clamp(16px,2.6vh,26px)' }}>
          <div className="funnel">
            <div className={'funnel-step' + (n >= 1 ? ' shown' : '')}>
              <div className="fs-ico"><Icon name="folder" size={19} /></div>
              <div>
                <h4>Working Directory</h4>
                <p>5 files changed after an afternoon of coding…</p>
              </div>
            </div>
            <div className={'funnel-arrow' + (n >= 2 ? ' shown' : '')}>
              <Icon name="arrowRight" size={15} /> git add login.js → only this file
            </div>
            <div className={'funnel-step stage' + (n >= 3 ? ' shown' : '')}>
              <div className="fs-ico"><Icon name="layers" size={19} /></div>
              <div>
                <h4>Staging Area</h4>
                <p>Holds <b>login.js</b> — waiting for the photo.</p>
              </div>
            </div>
            <div className={'funnel-arrow' + (n >= 4 ? ' shown' : '')}>
              <Icon name="arrowRight" size={15} /> git commit -m “Fix login validation”
            </div>
            <div className={'funnel-step' + (n >= 5 ? ' shown' : '')}>
              <div className="fs-ico" style={{ background: 'var(--good-soft)', color: 'var(--good)' }}><Icon name="box" size={19} /></div>
              <div>
                <h4>Repository</h4>
                <p>Snapshot saved forever. The other 4 files stay untouched.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="anatomy-facts">
          {FACTS.map((f, idx) => (
            <div key={f.title} className="card fact-row rise" style={{ '--d': `${0.3 + idx * 0.2}s` }}>
              <div className="f-ico"><Icon name={f.ico} size={17} /></div>
              <div>
                <h5>{f.title}</h5>
                <p>{f.text}</p>
              </div>
            </div>
          ))}
          <Terminal title="selective staging in action" style={{ marginTop: 2 }}>
            <div><span className="p">$</span> <span className="cmd">git add login.js</span></div>
            <div><span className="p">$</span> <span className="cmd">git status --short</span></div>
            <div className="hl">  M  login.js</div>
            <div className="dim">   M style.css   <span className="dim"># still waiting — not staged</span></div>
            <div><span className="p">$</span> <span className="cmd">git commit -m <span className="flag">“Fix login validation”</span></span></div>
            <div className="out">  [main a3f9c1d] Fix login validation</div>
          </Terminal>
        </div>
      </div>

      <div className="interaction">
        <span className="reveal-note rise" style={{ '--d': '1.2s' }}>
          Stage like a photographer: <b>choose what goes in the photo</b> before you press the shutter
        </span>
      </div>
    </section>
  );
}