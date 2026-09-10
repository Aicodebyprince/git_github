import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import Terminal from '../components/Terminal.jsx';
import useSequence from '../hooks/useSequence.js';

const TREE = [
  { name: '.git/', dir: true, note: 'Git’s private database — the brain' },
  { name: '├── HEAD', note: '→ which branch am I on right now?' },
  { name: '├── config', note: '→ my identity, remotes & settings' },
  { name: '├── index', note: '→ the staging area lives here' },
  { name: '├── objects/', dir: true, note: '→ every commit, tree & file (the content)' },
  { name: '└── refs/', dir: true, note: '→ branch & tag names (the labels)' },
];

const FACTS = [
  { ico: 'box', title: 'Folder + hidden database', text: <>A <b>repository</b> (repo) = your project folder plus a hidden <code>.git</code> folder. Your files are the body; <code>.git</code> is the brain that remembers everything.</> },
  { ico: 'filePlus', title: 'Any folder can become one', text: <>Run <code>git init</code> in a folder and Git creates the <code>.git</code> database instantly. Run <code>git clone</code> to copy an existing repo — <b>including its entire history</b>.</> },
  { ico: 'globe', title: 'Local repo vs Remote repo', text: <>Your <b>local repo</b> lives on your machine and works fully offline. The <b>remote repo</b> is the shared copy on a server (GitHub) that the whole team syncs with.</> },
  { ico: 'history', title: 'History travels with the repo', text: <>A clone isn't just files — it's every commit, branch and tag. That's why losing your laptop doesn't lose your work.</> },
];

export default function S05Repository() {
  const { n } = useSequence(true, TREE.length + 1, 420);

  return (
    <section className="slide">
      <SlideHead
        num={5}
        eyebrow="Act II · The Foundation"
        title="The Repository — Git's Home Base"
        sub="Everything Git does happens inside one thing: a repository. Understand it, and half of Git clicks into place."
      />

      <div className="repo-grid">
        <Terminal title="my-project — tree of the brain">
          <div className="git-tree">
            {TREE.map((t, idx) => (
              <div key={t.name} className={'tree-line' + (idx < n ? ' shown' : '')}>
                {t.dir ? <span className="t-dir">{t.name}</span> : <span className="t-name">{t.name}</span>}
                {'  '}
                <span className="dim">{t.note}</span>
              </div>
            ))}
            <div className={'tree-line' + (n >= TREE.length ? ' shown' : '')} style={{ marginTop: 8 }}>
              <span className="t-hl">$ git init</span> <span className="dim">→ “Initialized empty Git repository in my-project/.git/”</span>
            </div>
          </div>
        </Terminal>

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