import React, { useCallback, useEffect, useRef, useState } from 'react';
import S01Disaster from './slides/S01Disaster.jsx';
import S02Problems from './slides/S02Problems.jsx';
import S03Collab from './slides/S03Collab.jsx';
import S04WhatIs from './slides/S04WhatIs.jsx';
import S05Repository from './slides/S05Repository.jsx';
import S06WorkingDir from './slides/S06WorkingDir.jsx';
import S07Staging from './slides/S07Staging.jsx';
import S08Commit from './slides/S08Commit.jsx';
import S09Workflow from './slides/S09Workflow.jsx';
import S10Commands from './slides/S10Commands.jsx';
import S11ProCommands1 from './slides/S11ProCommands1.jsx';
import S12ProCommands2 from './slides/S12ProCommands2.jsx';
import S13Branch from './slides/S13Branch.jsx';
import S14Merging from './slides/S14Merging.jsx';
import S15Conflicts from './slides/S15Conflicts.jsx';
import S16GitVsGitHub from './slides/S16GitVsGitHub.jsx';
import S17GitHubRepos from './slides/S17GitHubRepos.jsx';
import S18PullRequests from './slides/S18PullRequests.jsx';
import S19Forks from './slides/S19Forks.jsx';
import S20Issues from './slides/S20Issues.jsx';
import S21Actions from './slides/S21Actions.jsx';
import S22RealWorld from './slides/S22RealWorld.jsx';
import S23GitSimulator from './slides/S23GitSimulator.jsx';
import GitWorkflowSimulator from './simulator/GitWorkflowSimulator.jsx';

const SLIDES = [
  { id: 'nightmare', label: 'The Disaster', Comp: S01Disaster },
  { id: 'problems', label: 'The Problems', Comp: S02Problems },
  { id: 'collab', label: 'Team Chaos', Comp: S03Collab },
  { id: 'whatis', label: 'What is Git', Comp: S04WhatIs },
  { id: 'repository', label: 'Repository', Comp: S05Repository },
  { id: 'working', label: 'Working Directory', Comp: S06WorkingDir },
  { id: 'staging', label: 'Staging Area', Comp: S07Staging },
  { id: 'commit', label: 'Commit', Comp: S08Commit },
  { id: 'workflow', label: 'Git Workflow', Comp: S09Workflow },
  { id: 'commands', label: 'Commands', Comp: S10Commands },
  { id: 'procmd1', label: 'Pro Commands I', Comp: S11ProCommands1 },
  { id: 'procmd2', label: 'Pro Commands II', Comp: S12ProCommands2 },
  { id: 'branch', label: 'Branching', Comp: S13Branch },
  { id: 'merging', label: 'Merging', Comp: S14Merging },
  { id: 'conflicts', label: 'Merge Conflicts', Comp: S15Conflicts },
  { id: 'vs', label: 'Git vs GitHub', Comp: S16GitVsGitHub },
  { id: 'ghrepo', label: 'GitHub Repos', Comp: S17GitHubRepos },
  { id: 'pr', label: 'Pull Requests', Comp: S18PullRequests },
  { id: 'forks', label: 'Forks', Comp: S19Forks },
  { id: 'issues', label: 'Issues', Comp: S20Issues },
  { id: 'actions', label: 'Actions', Comp: S21Actions },
  { id: 'realworld', label: 'Real-World', Comp: S22RealWorld },
  { id: 'simulator', label: '⚡ Git Workflow Simulator', Comp: S23GitSimulator },
];

export default function App() {
  // Default to simulator view as requested by user, with toggle to presentation deck
  const [appMode, setAppMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('view') === 'deck') return 'deck';
    }
    return 'simulator'; // 'simulator' | 'deck'
  });

  const [i, setI] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const touchX = useRef(null);
  const total = SLIDES.length;

  const go = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      if (clamped === i) return;
      setI(clamped);
      setAnimKey((k) => k + 1);
    },
    [i, total]
  );

  useEffect(() => {
    if (appMode !== 'deck') return;

    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(i + 1); }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(i - 1); }
      else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(total - 1);
      else if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
        else document.exitFullscreen?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, i, total, appMode]);

  // If in dedicated simulator view
  if (appMode === 'simulator') {
    return (
      <div className="simulator-fullscreen-container">
        {/* Top App Mode Switcher */}
        <div className="app-mode-floating-bar">
          <div className="mode-toggle-cluster">
            <button
              className={`mode-btn ${appMode === 'simulator' ? 'active' : ''}`}
              onClick={() => setAppMode('simulator')}
            >
              <span className="mode-icon">⚡</span>
              <span>Git Workflow Simulator</span>
            </button>
            <button
              className={`mode-btn ${appMode === 'deck' ? 'active' : ''}`}
              onClick={() => {
                setAppMode('deck');
                setI(0);
              }}
            >
              <span className="mode-icon">📖</span>
              <span>Course Slides ({total})</span>
            </button>
          </div>
        </div>

        <GitWorkflowSimulator onBackToDeck={() => setAppMode('deck')} />
      </div>
    );
  }

  const { Comp } = SLIDES[i];

  return (
    <div
      className="deck"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 60) go(i + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="aurora" aria-hidden="true" />
      <div className="progress" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${((i + 1) / total) * 100}%` }} />
      </div>

      {/* Mode Switcher inside Deck */}
      <div className="deck-mode-bar">
        <div className="mode-toggle-cluster">
          <button
            className={`mode-btn ${appMode === 'simulator' ? 'active' : ''}`}
            onClick={() => setAppMode('simulator')}
          >
            <span className="mode-icon">⚡</span>
            <span>Launch Simulator</span>
          </button>
          <button
            className={`mode-btn ${appMode === 'deck' ? 'active' : ''}`}
            onClick={() => setAppMode('deck')}
          >
            <span className="mode-icon">📖</span>
            <span>Slides ({i + 1}/{total})</span>
          </button>
        </div>
      </div>

      <main key={animKey} className="stage" aria-live="polite">
        <Comp onNext={() => go(i + 1)} />
      </main>

      <div className="controls">
        <button className="ctrl" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous slide">←</button>
        <div className="dots" role="tablist" aria-label="Slides">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={idx === i}
              title={s.label}
              className={'dot' + (idx === i ? ' active' : '') + (idx < i ? ' seen' : '')}
              onClick={() => go(idx)}
            />
          ))}
        </div>
        <button className="ctrl" onClick={() => go(i + 1)} disabled={i === total - 1} aria-label="Next slide">→</button>
      </div>

      <div className="slide-counter">{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
      <div className="hint"><b>← →</b> navigate &nbsp;·&nbsp; <b>space</b> next &nbsp;·&nbsp; <b>F</b> fullscreen</div>
      <div className="brandmark"><span className="cube">G</span> GIT MASTERCLASS</div>
    </div>
  );
}