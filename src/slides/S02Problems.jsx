import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';

const PROBLEMS = [
  { ico: 'trash', title: 'Lost Code', text: 'A file is deleted accidentally — and it is simply gone. No undo. No trash bin history.' },
  { ico: 'layers', title: 'Multiple Versions', text: 'Nobody knows which copy is newest. Everyone guesses and hopes for the best.' },
  { ico: 'users', title: 'Team Conflicts', text: 'Two developers overwrite the same file. Days of someone’s work silently vanish.' },
  { ico: 'undo', title: 'No Recovery', text: 'A bug slips in on Friday. The last known-good version? It was never saved anywhere.' },
];

export default function S02Problems() {
  return (
    <section className="slide">
      <SlideHead
        num={2}
        eyebrow="Act I · Sound Familiar?"
        title="What Goes Wrong Without Version Control?"
        sub="Every developer on Earth has lived at least one of these — most have lived all four."
      />

      <div className="problem-grid">
        {PROBLEMS.map((p, idx) => (
          <div key={p.title} className="card problem-card rise" style={{ '--d': `${0.2 + idx * 0.18}s` }}>
            <div className="problem-ico"><Icon name={p.ico} size={26} /></div>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>

      <div className="interaction">
        <div className="bigquote rise" style={{ '--d': '1.1s' }}>
          <span className="quote-mark">“</span>
          <p>
            Without a system to track changes, software development becomes{' '}
            <span style={{ color: 'var(--bad)' }}>complete chaos.</span>
            <span className="sub">Hover the cards — you have probably lived every single one.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
