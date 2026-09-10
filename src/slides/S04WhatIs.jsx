import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';

const POWERS = [
  { ico: 'clock', title: 'Time Machine', text: 'Travel to any point in your project’s past — every version is kept.' },
  { ico: 'shield', title: 'Safety Net', text: 'Nothing that is committed is ever lost. Mistakes become reversible.' },
  { ico: 'users', title: 'Team Engine', text: 'Dozens of developers work in parallel without stepping on each other.' },
  { ico: 'eye', title: 'Full Transparency', text: 'See who changed what, when, and exactly why — line by line.' },
];

export default function S04WhatIs() {
  return (
    <section className="slide">
      <SlideHead
        num={4}
        eyebrow="Act II · Enter the Hero"
        title="What is Git?"
        sub="The pain you just felt? Millions of developers felt it too. That pain built Git."
      />

      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="card whatis-hero">
          <div className="git-orb rise"><div className="core">Git</div></div>
          <h2 className="rise" style={{ '--d': '.15s' }}>
            Git is a <em>Version Control System</em>
          </h2>
          <p className="rise" style={{ '--d': '.3s' }}>
            Git records <b>every change</b> you make, builds a complete <b>history</b> of your project,
            and lets a whole team <b>collaborate safely</b> on the same code — no more{' '}
            <code className="inline-code">final_v2.zip</code>. Ever again.
          </p>

          <div className="power-grid">
            {POWERS.map((p, idx) => (
              <div key={p.title} className="card power-card grow" style={{ '--d': `${0.55 + idx * 0.14}s` }}>
                <div className="power-ico"><Icon name={p.ico} size={22} /></div>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
