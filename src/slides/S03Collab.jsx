import React, { useState } from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import useSequence from '../hooks/useSequence.js';

const DEVS = [
  { cls: 'dev-a', name: 'Developer A', task: 'Updates Login Page', zip: 'login_FINAL_final.zip' },
  { cls: 'dev-b', name: 'Developer B', task: 'Updates Dashboard', zip: 'dashboard_v3_NEW.zip' },
  { cls: 'dev-c', name: 'Developer C', task: 'Updates Navbar', zip: 'navbar_fixed(2).zip' },
];

export default function S03Collab() {
  const [revealed, setRevealed] = useState(false);
  const tiles = useSequence(true, 3, 380);

  return (
    <section className="slide">
      <SlideHead
        num={3}
        eyebrow="Act I · Teamwork Nightmare"
        title="The Collaboration Disaster"
        sub="One team. Three features. Three separate ZIP files. Now merge them — by hand. 😅"
      />

      <p className="collab-head rise" style={{ '--d': '.1s' }}>
        <Icon name="clock" size={18} />
        All three worked in parallel all week — then each sent their own version:
      </p>

      <div className="collab-grid">
        {DEVS.map((d, idx) => (
          <div key={d.name} className="card dev-tile rise" style={{ '--d': `${0.15 + idx * 0.35}s` }}>
            <div className={'dev-avatar ' + d.cls}><Icon name="terminal" size={28} /></div>
            <h3>{d.name}</h3>
            <span className="dev-task">{d.task}</span>
            <span className={'zip-chip' + (tiles.done ? ' shown' : '')} style={{ animationDelay: `${idx * 0.22}s` }}>
              <Icon name="box" size={13} /> {d.zip}
            </span>
          </div>
        ))}
      </div>

      <div className="interaction">
        {!revealed ? (
          <>
            {tiles.done && <span className="chaos-badge"><Icon name="alert" size={15} /> 3 zips · 0 shared history · infinite pain</span>}
            <div className="interaction-row">
              <button
                className={'btn pulse-ring' + (tiles.done ? ' rise' : '')}
                style={{ opacity: tiles.done ? undefined : 0 }}
                onClick={() => setRevealed(true)}
              >
                💭 How should the team combine all this?
              </button>
            </div>
          </>
        ) : (
          <div className="bigquote rise">
            <span className="quote-mark">“</span>
            <p>
              This exact problem led to the creation of{' '}
              <span style={{ color: 'var(--brand)' }}>Version Control Systems.</span>
              <span className="sub">Manual merging wastes hours and destroys work. The industry needed a better way.</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
