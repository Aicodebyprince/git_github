import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import Terminal from '../components/Terminal.jsx';

const FACTS = [
  { ico: 'branch', title: 'Fork = your own copy, on GitHub', text: <>Clicking <b>Fork</b> copies someone's repo into <b>your account</b>. You own the copy — your changes never touch the original.</> },
  { ico: 'search', title: "Fork vs Clone — don't mix them", text: <><b>Clone</b> copies a repo to your machine. <b>Fork</b> copies it on GitHub first; then you clone <i>your</i> fork. Fork = clone + a home base you control.</> },
  { ico: 'pr', title: 'The open-source path', text: <>Found a bug in a library you use? <b>Fork → branch → fix → pull request</b> back to the original repo (“upstream”). That's how a million developers improve projects they don't own.</> },
  { ico: 'refresh', title: 'Stay in sync with upstream', text: <>The original repo keeps moving. Add it as a remote and <code>git pull upstream main</code> to bring fresh commits into your fork.</> },
];

export default function S17Forks() {
  return (
    <section className="slide">
      <SlideHead
        num={19}
        eyebrow="Act IV · Contributing Anywhere"
        title="Forks — Your Own Copy of Any Repo"
        sub="Want to improve a project you don't own? Fork it — now it's yours to experiment with."
      />

      <div className="fork-grid">
        <div className="card fork-viz">
          <div className="fork-node-row">
            <div className="fork-node upstream rise" style={{ '--d': '.15s' }}>
              <Icon name="globe" size={19} />
              Original repo
              <span className="sub">upstream · the official project</span>
            </div>
            <div className="fork-arrow"><Icon name="arrowRight" size={17} /></div>
            <div className="fork-node yours rise" style={{ '--d': '.3s' }}>
              <Icon name="users" size={19} />
              Your fork
              <span className="sub">you/name — fully yours</span>
            </div>
            <div className="fork-arrow"><Icon name="arrowRight" size={17} /></div>
            <div className="fork-node rise" style={{ '--d': '.45s' }}>
              <Icon name="folder" size={19} />
              Your laptop
              <span className="sub">git clone your-fork</span>
            </div>
          </div>
          <div className="fork-pr rise" style={{ '--d': '.6s' }}>
            <Icon name="pr" size={14} />
            Pull request → sends your fix back to the original repo
          </div>
          <div className="fork-caption dim" style={{ textAlign: 'center', fontSize: 'clamp(11px,1.15vw,12.5px)', color: 'var(--ink-3)', fontWeight: 600 }}>
            original owner reviews your PR → merges → the whole world gets your fix
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
          <Terminal title="the fork ritual" style={{ marginTop: 2 }}>
            <div className="dim"># 1 · fork on GitHub → 2 · clone your copy</div>
            <div><span className="p">$</span> <span className="cmd">git clone https://github.com/you/lib.git</span></div>
            <div><span className="p">$</span> <span className="cmd">git remote add upstream <span className="flag">https://github.com/original/lib.git</span></span></div>
            <div><span className="p">$</span> <span className="cmd">git pull upstream main</span> <span className="dim"># sync with original</span></div>
          </Terminal>
        </div>
      </div>

    </section>
  );
}