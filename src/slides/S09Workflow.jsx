import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import Terminal from '../components/Terminal.jsx';
import useSequence from '../hooks/useSequence.js';

const NODES = [
  { ico: 'folder', cls: '', title: 'Working Directory', text: 'edit files' },
  { ico: 'layers', cls: '', title: 'Staging Area', text: 'choose changes' },
  { ico: 'box', cls: '', title: 'Local Repo', text: 'saved history' },
  { ico: 'remote', cls: 'remote', title: 'Remote (GitHub)', text: 'team’s shared copy' },
];

const ARROWS = [
  { label: 'git add', delay: '.25s' },
  { label: 'git commit', delay: '.45s' },
  { label: 'git push', delay: '.65s' },
];

export default function S09Workflow() {
  const { n } = useSequence(true, 4, 620);

  return (
    <section className="slide">
      <SlideHead
        num={9}
        eyebrow="Act II · The Big Picture"
        title="The Git Workflow — One Loop to Rule Them All"
        sub="Everything you'll ever do with Git is this loop. Master the loop, and Git stops being scary."
      />

      <div className="wf">
        <div className="wf-row">
          {NODES.map((node, idx) => (
            <React.Fragment key={node.title}>
              <div className={'card wf-node' + (n >= idx + 1 ? ' shown' : '')}>
                <div className={'wf-ico' + (node.cls ? ' ' + node.cls : '')}><Icon name={node.ico} size={21} /></div>
                <h4>{node.title}</h4>
                <p>{node.text}</p>
              </div>
              {idx < NODES.length - 1 && (
                <div className={'wf-arrow' + (n >= idx + 2 ? ' shown' : '')} style={{ '--d': ARROWS[idx].delay }}>
                  <Icon name="arrowRight" size={16} />
                  <span>{ARROWS[idx].label}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="wf-return">
          <div className={'wf-arrow down' + (n >= 4 ? ' shown' : '')} style={{ '--d': '.85s' }}>
            <Icon name="download" size={14} /> git pull — brings teammates' commits back down into your working directory
          </div>
        </div>

        <div className="wf-side">
          <div className="card fact-row rise" style={{ '--d': '.4s' }}>
            <div className="f-ico" style={{ background: 'var(--good-soft)', color: 'var(--good)' }}><Icon name="check" size={17} /></div>
            <div>
              <h5>Your daily rhythm</h5>
              <p style={{ margin: 0, fontSize: 'clamp(11.5px,1.2vw,13px)', color: 'var(--ink-2)', lineHeight: 1.55 }}>
                <b>edit → stage → commit → push</b> — repeat. Small commits, clear messages, push at the end of the day.
              </p>
            </div>
          </div>
          <Terminal title="one loop, four commands">
            <div><span className="p">$</span> <span className="cmd">git pull</span> <span className="dim"># 9:00 — sync with the team</span></div>
            <div><span className="p">$</span> <span className="cmd">git add .</span></div>
            <div><span className="p">$</span> <span className="cmd">git commit -m <span className="flag">“Add payment form”</span></span></div>
            <div><span className="p">$</span> <span className="cmd">git push</span> <span className="dim"># 17:00 — share your work</span></div>
          </Terminal>
        </div>
      </div>

      <div className="interaction">
        <span className="reveal-note rise" style={{ '--d': '1.3s' }}>
          Pull first thing in the morning, push before you leave — that's the whole secret
        </span>
      </div>
    </section>
  );
}