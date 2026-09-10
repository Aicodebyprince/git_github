import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import { GitMark, GitHubMark } from '../components/Logos.jsx';

const GIT_FACTS = [
  <>A <b>version control system</b> — software that runs on <b>your computer</b>.</>,
  <>Created by <b>Linus Torvalds</b> in 2005. Free & open source.</>,
  <>Works <b>fully offline</b>. Tracks history, commits, branches, merges.</>,
];

const GH_FACTS = [
  <>A <b>cloud platform</b> that hosts Git repositories and gives teams a shared meeting point.</>,
  <>Founded 2008 · acquired by Microsoft in 2018. Free for students & open source.</>,
  <>Adds <b>Pull Requests, Issues, Actions (CI/CD)</b> and code review on top of Git.</>,
];

const ROWS = [
  { k: 'What it is', git: 'Software (a tool)', gh: 'A website / cloud service' },
  { k: 'Runs', git: 'Locally, on your machine', gh: 'Online, in the cloud' },
  { k: 'Internet?', git: 'Never required', gh: 'Always required' },
  { k: 'Main job', git: 'Track changes & history', gh: 'Store, share & review code' },
  { k: 'Alone?', git: 'Works 100% without GitHub', gh: "Can't exist without Git" },
];

export default function S14GitVsGitHub() {
  return (
    <section className="slide">
      <SlideHead
        num={16}
        eyebrow="Act IV · Two Names, One Story"
        title="Git vs GitHub — Engine vs Showroom"
        sub="People say them together, but they are two different things. The analogy makes it obvious."
      />

      <div className="vs-wrap">
        <div className="vs-row">
          <div className="card vs-panel git rise" style={{ '--d': '.15s' }}>
            <div className="vs-head">
              <span className="vs-orb git"><GitMark size={28} /></span>
              <div>
                <h3>Git — the engine</h3>
                <span className="role">runs inside your laptop</span>
              </div>
            </div>
            <div className="vs-facts">
              {GIT_FACTS.map((f, i) => (
                <div key={i} className="vs-fact"><Icon name="check" size={13} style={{ color: 'var(--good)', flex: 'none', marginTop: 2 }} /><span>{f}</span></div>
              ))}
            </div>
          </div>

          <div className="card vs-panel gh rise" style={{ '--d': '.3s' }}>
            <div className="vs-head">
              <span className="vs-orb gh"><GitHubMark size={24} /></span>
              <div>
                <h3>GitHub — the showroom</h3>
                <span className="role">where the team meets online</span>
              </div>
            </div>
            <div className="vs-facts">
              {GH_FACTS.map((f, i) => (
                <div key={i} className="vs-fact"><Icon name="check" size={13} style={{ color: 'var(--brand)', flex: 'none', marginTop: 2 }} /><span>{f}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="card cmp-card rise" style={{ '--d': '.45s' }}>
          <table className="cmp-table">
            <thead>
              <tr><th style={{ width: '22%' }}>Question</th><th>Git</th><th>GitHub</th></tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.k}>
                  <td>{r.k}</td>
                  <td>{r.git}</td>
                  <td>{r.gh}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="interaction">
        <div className="vs-combo rise" style={{ '--d': '.6s' }}>
          <span className="vs-combo-logo git"><GitMark size={20} /></span>
          <span className="vs-plus">+</span>
          <span className="vs-combo-logo gh"><GitHubMark size={17} /></span>
          <span className="vs-combo-text">= the professional combo — <b>Git does the work, GitHub hosts the team</b></span>
        </div>
      </div>
    </section>
  );
}