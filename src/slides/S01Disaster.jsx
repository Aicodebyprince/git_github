import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Terminal from '../components/Terminal.jsx';
import Icon from '../components/Icon.jsx';
import useSequence from '../hooks/useSequence.js';

const FILES = [
  { name: 'project_final.zip', tag: '2w old' },
  { name: 'project_final_v2.zip', tag: 'v2??' },
  { name: 'project_final_latest.zip', tag: 'latest?' },
  { name: 'project_final_latest_fixed.zip', tag: 'fixed?!' },
  { name: 'project_final_latest_final.zip', tag: 'TRUST??' },
];

const PAINS = [
  { ico: 'trash', text: 'An important file gets deleted — forever' },
  { ico: 'search', text: 'Nobody knows which version worked yesterday' },
  { ico: 'upload', text: 'A teammate emails yet another ZIP file' },
  { ico: 'alert', text: 'The “latest” code breaks everything' },
];

export default function S01Disaster() {
  const files = useSequence(true, 5, 320);
  const pains = useSequence(files.done, 4, 520);

  return (
    <section className="slide">
      <SlideHead
        num={1}
        eyebrow="Act I · The Nightmare"
        title="The Project Disaster"
        sub="Two weeks of work. Submission tomorrow. What could possibly go wrong?"
      />

      <div className="disaster-grid">
        <div>
          <div className="laptop">
            <Terminal title="your-projects-folder">
              <div className="laptop-body">
                {FILES.map((f, idx) => (
                  <div
                    key={f.name}
                    className={
                      'laptop-file' +
                      (idx < files.n ? ' shown' : '') +
                      (idx === FILES.length - 1 && files.done ? ' trust' : '')
                    }
                  >
                    <span>{f.name}</span>
                    <span>{files.done && idx === FILES.length - 1 ? <span className="q">TRUST??</span> : f.tag}</span>
                  </div>
                ))}
              </div>
            </Terminal>
            <div className="laptop-base" />
          </div>
        </div>

        <div className="disaster-side">
          <ul className="pain-list">
            {PAINS.map((p, idx) => (
              <li key={p.text} className={idx < pains.n ? 'shown' : ''}>
                <span className="pain-ico"><Icon name={p.ico} size={15} /></span>
                {p.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="interaction">
        {pains.done && (
          <div className="bigquote rise">
            <span className="quote-mark">“</span>
            <p>
              Which version would you trust?
              <span className="sub">Take a moment. Discuss with the person next to you.</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
