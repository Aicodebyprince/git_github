import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';

const FACTS = [
  { ico: 'globe', title: 'Your repo, given a URL', text: <>A GitHub repository is <b>your local repo published online</b>. Anyone with the link can <code>clone</code> it, and the team pushes & pulls to it every day.</> },
  { ico: 'file', title: 'README.md — the front door', text: <>The <b>README</b> is a Markdown file shown on the repo's home page: what the project does, how to install it, how to contribute. First thing visitors read.</> },
  { ico: 'shield', title: 'Public vs Private', text: <><b>Public</b> = anyone in the world can see and contribute · <b>Private</b> = only invited teammates. Most coursework and portfolios are public.</> },
  { ico: 'lock', title: '.gitignore — the filter', text: <>A file telling Git which things to <b>never track</b>: <code>node_modules/</code>, <code>.env</code> secrets, build folders. One line and they stay off GitHub forever.</> },
];

export default function S15GitHubRepos() {
  return (
    <section className="slide">
      <SlideHead
        num={17}
        eyebrow="Act IV · Where Code Lives Online"
        title="GitHub Repositories — Your Project's Public Face"
        sub="The same repository you created locally, now visible to the whole world — with superpowers around it."
      />

      <div className="ghrepo-grid">
        <div className="repo-mock rise" style={{ '--d': '.15s' }}>
          <div className="repo-mock-top">
            <span className="repo-avatar" />
            <span className="repo-name">sara-dev / <span>my-project</span></span>
            <span className="repo-pill"><span className="star">★</span> 1.2k</span>
            <span className="repo-pill"><Icon name="branch" size={11} /> 310</span>
          </div>
          <div className="repo-tabs">
            <span className="tab on">Code</span>
            <span className="tab">Issues <span className="cnt">12</span></span>
            <span className="tab">Pull requests <span className="cnt">8</span></span>
            <span className="tab">Actions <span className="cnt">✓</span></span>
          </div>
          <div className="repo-main">
            <div className="repo-readme">
              <div className="rm-bar">README.md</div>
              <div className="rm-body">
                <h5># My Project 🚀</h5>
                A tiny app that tracks study habits. Built with React.
                <br /><br />
                <b>Install:</b> <code className="rm-code">npm install</code> &nbsp;·&nbsp; <b>Run:</b> <code className="rm-code">npm start</code>
              </div>
            </div>
            <div className="repo-clone">
              <span className="url">git clone https://github.com/sara-dev/my-project.git</span>
              <button className="btn" style={{ padding: '9px 18px', fontSize: 12 }}>Clone</button>
            </div>
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
          ★ star = bookmark it · 🍴 fork = copy it · issues & PRs = discuss and improve it
        </span>
      </div>
    </section>
  );
}