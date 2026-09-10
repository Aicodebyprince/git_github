import React from 'react';
import SlideHead from '../components/SlideHead.jsx';
import Icon from '../components/Icon.jsx';
import Terminal from '../components/Terminal.jsx';
import useSequence from '../hooks/useSequence.js';

const FILES = [
  { name: 'index.html', st: 'clean', tag: '✓ committed' },
  { name: 'app.js', st: 'mod', tag: '● modified' },
  { name: 'style.css', st: 'mod', tag: '● modified' },
  { name: 'logo.png', st: 'unt', tag: '? untracked' },
  { name: 'notes.txt', st: 'unt', tag: '? untracked' },
];

const FACTS = [
  { ico: 'folder', title: 'Your real folder — where you code', text: <>The <b>Working Directory</b> is the project folder you open in your editor. You create, edit and delete files here every day. Git simply <b>watches</b> it from <code>.git</code>.</> },
  { ico: 'eye', title: 'Git never touches your files', text: <>Your changes are <b>100% yours</b> until you stage them. Git never auto-saves, never overwrites, never hides files — it only records what you tell it to.</> },
  { ico: 'search', title: 'Three states live here', text: <><b>Untracked</b> = new file Git doesn't know yet · <b>Modified</b> = tracked file with new changes · <b>Clean</b> = unchanged since the last commit.</> },
];

export default function S06WorkingDir() {
  const { n } = useSequence(true, 7, 380);

  return (
    <section className="slide">
      <SlideHead
        num={6}
        eyebrow="Act II · The First Area"
        title="Working Directory — Where You Actually Work"
        sub="This is the folder you already know. Git just adds a quiet observer inside it."
      />

      <div className="wd-grid">
        <Terminal title="~/my-project — file states">
          <div className="wd-explorer">
            {FILES.map((f, idx) => (
              <div key={f.name} className={'wd-row' + (idx < n ? ' shown' : '')}>
                <span className={'st ' + f.st}>{f.st === 'clean' ? '✓' : f.st === 'mod' ? 'M' : '?'}</span>
                <span className="fname">{f.name}</span>
                <span className="dim" style={{ marginLeft: 'auto' }}>{f.tag}</span>
              </div>
            ))}
            <div className="wd-legend">
              <span className="wd-legend-chip good">✓ clean — safe, already saved</span>
              <span className="wd-legend-chip warn">M modified — changed, not yet staged</span>
              <span className="wd-legend-chip gray">? untracked — new, Git hasn't met it</span>
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
          <Terminal title="what git sees" style={{ marginTop: 2 }}>
            <div><span className="p">$</span> <span className="cmd">git status</span></div>
            <div className="dim">  On branch main</div>
            <div className="out">  Changes not staged for commit:</div>
            <div className="dim">    modified:   app.js</div>
            <div className="hl">  Untracked files:</div>
            <div className="dim">    logo.png</div>
          </Terminal>
        </div>
      </div>
    </section>
  );
}