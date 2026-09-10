import React, { useState, useEffect, useMemo } from 'react';
import { GitBranch, ShieldAlert, Sparkles } from 'lucide-react';

export default function GitGraphVisualizer({
  currentStage,
  lastAction,
  scenario,
  isComplete = false
}) {
  const [rebaseMode, setRebaseMode] = useState('rebased'); // 'rebased' | 'behind'
  const [squashMode, setSquashMode] = useState('squashed'); // 'squashed' | 'messy'
  const [hoveredRow, setHoveredRow] = useState(null);

  // Sync mode with stage progression
  useEffect(() => {
    if (currentStage === 7) setRebaseMode('rebased');
    if (currentStage === 9) setSquashMode('squashed');
  }, [currentStage]);

  // 3 BIG, BOLD, STRAIGHT RAILWAY TRACKS (X coordinates)
  // Generously spaced (200px between each line) so the graph is huge, clear, and visible!
  const TRACKS = {
    main: 110,           // Line 1: main (Green)
    login: 310,          // Line 2: login-feature (Indigo)
    reg: 510             // Line 3: register-feature (Sky Blue)
  };

  const SVG_WIDTH = 620;
  const ROW_HEIGHT = 78;
  const START_Y = 46;

  // Build the chronological commit rows
  const rows = useMemo(() => {
    const list = [];

    // Row 0: Initial Commit on main
    list.push({
      id: 'row_0',
      track: 'main',
      hash: 'e3f19a0',
      branchName: 'main',
      branchColor: '#10b981',
      title: 'Initial Project baseline',
      author: 'Tech Lead',
      badge: 'baseline',
      badgeColor: '#10b981',
      type: 'commit'
    });

    // Row 1: Alex starts login-feature (Stage 1+)
    if (currentStage >= 1) {
      list.push({
        id: 'row_1',
        track: 'login',
        branchFrom: { track: 'main', rowIdx: 0 },
        hash: '8a12d4f',
        branchName: 'login-feature',
        branchColor: '#818cf8',
        title: currentStage >= 4 ? 'feat(api): login backend & auth routes' : 'branch: login-feature created',
        author: 'Alex Rivera',
        badge: currentStage >= 4 ? 'PR #101' : 'active',
        badgeColor: currentStage >= 4 ? '#818cf8' : '#64748b',
        type: 'branch'
      });
    }

    // Row 2: Sarah develops login-ui (Stage 2+) - stays strictly on Line 2
    if (currentStage >= 2) {
      list.push({
        id: 'row_2',
        track: 'login',
        hash: '3c90f2b',
        branchName: 'login-ui',
        branchColor: '#f472b6',
        title: currentStage >= 5 ? 'feat(ui): responsive login form & validation' : 'branch: login-ui created',
        author: 'Sarah Chen',
        badge: currentStage >= 5 ? 'merged' : 'active',
        badgeColor: currentStage >= 5 ? '#94a3b8' : '#f472b6',
        type: 'commit'
      });
    }

    // Row 3: Mike creates register-feature (Stage 3+) - on Line 3
    if (currentStage >= 3) {
      const isRebased = currentStage >= 7 && rebaseMode === 'rebased';
      list.push({
        id: 'row_3',
        track: 'reg',
        branchFrom: isRebased ? { track: 'main', rowIdx: 5 } : { track: 'main', rowIdx: 0 },
        hash: isRebased ? '2a88f7c' : '9b71e41',
        branchName: 'register-feature',
        branchColor: '#38bdf8',
        title: isRebased
          ? (currentStage >= 8 ? 'feat(auth): complete user registration' : 'register-feature (rebased on main)')
          : 'branch: register-feature created',
        author: 'Mike Kowalski',
        badge: currentStage >= 8 ? 'PR #102' : isRebased ? 'rebased' : 'active',
        badgeColor: '#38bdf8',
        type: isRebased ? 'rebase' : 'branch'
      });
    }

    // Row 4: Sarah integrates UI into login-feature (Stage 5+) - on Line 2
    if (currentStage >= 5) {
      list.push({
        id: 'row_4',
        track: 'login',
        hash: '5e44a10',
        branchName: 'login-feature',
        branchColor: '#818cf8',
        title: 'Merge login-ui into login-feature (UI Integration)',
        author: 'Sarah + Alex',
        badge: 'merged',
        badgeColor: '#a855f7',
        type: 'merge'
      });
    }

    // Row 5: Merge login-feature into main (Stage 6+) - back to Line 1
    if (currentStage >= 6) {
      list.push({
        id: 'row_5',
        track: 'main',
        mergeFrom: { track: 'login', rowIdx: 4 },
        hash: '1d99b24',
        branchName: 'main',
        branchColor: '#10b981',
        title: 'PR #101 Merged: Auth Flow live on production main',
        author: 'ShopFlow CI',
        badge: 'production',
        badgeColor: '#10b981',
        type: 'merge'
      });
    }

    // Row 6: Mike's Rebase step (Stage 7+) or behind warning
    if (currentStage >= 7 && rebaseMode === 'behind') {
      list.push({
        id: 'row_6_behind',
        track: 'reg',
        hash: 'BEHIND',
        branchName: 'register-feature',
        branchColor: '#f59e0b',
        title: '⚠️ Branch is behind main (Run git rebase main)',
        author: 'Mike Kowalski',
        badge: 'behind main',
        badgeColor: '#f59e0b',
        type: 'warning'
      });
    }

    // Row 7: Squash Merge into main (Stage 9+) - back to Line 1
    if (currentStage >= 9) {
      if (squashMode === 'squashed') {
        list.push({
          id: 'row_7_squash',
          track: 'main',
          mergeFrom: { track: 'reg', rowIdx: 3 },
          hash: '7d31b09',
          branchName: 'main',
          branchColor: '#10b981',
          title: 'PR #102: feat(auth): User Registration [8 commits squashed → 1]',
          author: 'Mike Kowalski',
          badge: 'squash merged ✓',
          badgeColor: '#10b981',
          type: 'squash'
        });
      } else {
        const messyCommits = [
          'wip register API',
          'fix typo in schema',
          'forgot token helper',
          'test again',
          'fix test error',
          'lint fix',
          'clean up',
          'ready for PR'
        ];
        messyCommits.forEach((m, i) => {
          list.push({
            id: `row_7_messy_${i}`,
            track: 'reg',
            hash: `m0${i + 1}`,
            branchName: 'register-feature',
            branchColor: '#f59e0b',
            title: `WIP Commit ${i + 1}/8: ${m}`,
            author: 'Mike',
            badge: 'unsquashed',
            badgeColor: '#f59e0b',
            type: 'wip'
          });
        });
      }
    }

    return list;
  }, [currentStage, rebaseMode, squashMode]);

  // Compute exact coordinates
  const computedRows = useMemo(() => {
    return rows.map((r, idx) => ({
      ...r,
      rowIdx: idx,
      x: TRACKS[r.track],
      y: START_Y + idx * ROW_HEIGHT
    }));
  }, [rows]);

  const svgHeight = Math.max(340, START_Y + computedRows.length * ROW_HEIGHT + 30);

  // Line end heights
  const mainEndY = svgHeight - 24;
  const loginEndY = currentStage >= 6 ? START_Y + 4 * ROW_HEIGHT : svgHeight - 24;
  const regEndY = currentStage >= 9 && squashMode === 'squashed' ? START_Y + 3 * ROW_HEIGHT : svgHeight - 24;

  return (
    <div className="git-graph-card-v3">
      {/* Header Bar with Live Badge & View Switchers */}
      <div className="graph-v3-header">
        <div className="graph-v3-title-group">
          <div className="graph-icon-glow">
            <GitBranch size={18} className="text-brand-light" />
          </div>
          <div>
            <div className="graph-v3-title-row">
              <span className="graph-v3-title">ShopFlow Repository Network Graph</span>
              <span className="badge-live-pulse">3 STRAIGHT RAILS</span>
            </div>
            <span className="graph-v3-sub">
              Large, clear, deterministic railway tracks: main · login-feature · register-feature
            </span>
          </div>
        </div>

        <div className="graph-v3-controls">
          {currentStage >= 7 && (
            <div className="v3-pill-group">
              <span className="v3-pill-label">Rebase:</span>
              <button
                className={`v3-pill-btn ${rebaseMode === 'rebased' ? 'active' : ''}`}
                onClick={() => setRebaseMode('rebased')}
              >
                Rebased Linear ✓
              </button>
              <button
                className={`v3-pill-btn ${rebaseMode === 'behind' ? 'active' : ''}`}
                onClick={() => setRebaseMode('behind')}
              >
                Behind Main
              </button>
            </div>
          )}

          {currentStage >= 9 && (
            <div className="v3-pill-group">
              <span className="v3-pill-label">Squash:</span>
              <button
                className={`v3-pill-btn ${squashMode === 'squashed' ? 'active' : ''}`}
                onClick={() => setSquashMode('squashed')}
              >
                1 Clean Commit ✨
              </button>
              <button
                className={`v3-pill-btn ${squashMode === 'messy' ? 'active' : ''}`}
                onClick={() => setSquashMode('messy')}
              >
                8 Messy Commits
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Body: Big 3-Rail SVG (Left, 620px) + Full Width Commit Table (Right) */}
      <div className="graph-v3-body">
        {/* Left Side: Big 3-Rail SVG Container */}
        <div className="v3-railway-container" style={{ width: `${SVG_WIDTH}px`, minWidth: `${SVG_WIDTH}px` }}>
          {/* Top Branch Header Badges centered over each big line */}
          <div className="v3-railway-headers">
            <div className="v3-track-header" style={{ left: `${TRACKS.main}px` }}>
              <span className="track-badge main">main</span>
            </div>
            {currentStage >= 1 && (
              <div className="v3-track-header" style={{ left: `${TRACKS.login}px` }}>
                <span className="track-badge login">login-feature</span>
              </div>
            )}
            {currentStage >= 3 && (
              <div className="v3-track-header" style={{ left: `${TRACKS.reg}px` }}>
                <span className="track-badge reg">register-feature</span>
              </div>
            )}
          </div>

          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
            className="v3-railway-svg"
            style={{ height: `${svgHeight}px`, width: '100%' }}
          >
            <defs>
              <filter id="glow-main-big" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-danger-big" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Subtle vertical background guideline lanes */}
            <line x1={TRACKS.main} y1={20} x2={TRACKS.main} y2={svgHeight - 10} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
            <line x1={TRACKS.login} y1={20} x2={TRACKS.login} y2={svgHeight - 10} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
            <line x1={TRACKS.reg} y1={20} x2={TRACKS.reg} y2={svgHeight - 10} stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

            {/* LINE 1: main (Bold, Perfectly Straight Vertical Line) */}
            <line
              x1={TRACKS.main}
              y1={START_Y}
              x2={TRACKS.main}
              y2={mainEndY}
              stroke="#10b981"
              strokeWidth={5}
              strokeLinecap="round"
              strokeOpacity={0.9}
            />

            {/* LINE 2: login-feature (Bold, Perfectly Straight Vertical Line next to main) */}
            {currentStage >= 1 && (
              <line
                x1={TRACKS.login}
                y1={START_Y + 1 * ROW_HEIGHT}
                x2={TRACKS.login}
                y2={loginEndY}
                stroke="#818cf8"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeOpacity={currentStage >= 6 ? 0.35 : 0.9}
                strokeDasharray={currentStage >= 6 ? '5 4' : 'none'}
              />
            )}

            {/* LINE 3: register-feature (Bold, Perfectly Straight Vertical Line next to login) */}
            {currentStage >= 3 && (
              <line
                x1={TRACKS.reg}
                y1={START_Y + 3 * ROW_HEIGHT}
                x2={TRACKS.reg}
                y2={regEndY}
                stroke="#38bdf8"
                strokeWidth={4.5}
                strokeLinecap="round"
                strokeOpacity={currentStage >= 9 && squashMode === 'squashed' ? 0.35 : 0.9}
                strokeDasharray={currentStage >= 9 ? '5 4' : 'none'}
              />
            )}

            {/* CONNECTING ARCS: Smooth, wide, rounded branching and merging curves */}
            {computedRows.map((row) => {
              // Branch-out curve
              if (row.branchFrom) {
                const parentX = TRACKS[row.branchFrom.track];
                const parentY = START_Y + row.branchFrom.rowIdx * ROW_HEIGHT;
                const childX = row.x;
                const childY = row.y;
                const midY = (parentY + childY) / 2;

                return (
                  <path
                    key={`branch_arc_${row.id}`}
                    d={`M ${parentX} ${parentY} C ${parentX} ${midY}, ${childX} ${midY}, ${childX} ${childY}`}
                    fill="none"
                    stroke={row.branchColor}
                    strokeWidth={3.5}
                    strokeOpacity={0.85}
                  />
                );
              }

              // Merge-in curve
              if (row.mergeFrom) {
                const sourceX = TRACKS[row.mergeFrom.track];
                const sourceY = START_Y + row.mergeFrom.rowIdx * ROW_HEIGHT;
                const destX = row.x;
                const destY = row.y;
                const midY = (sourceY + destY) / 2;

                return (
                  <path
                    key={`merge_arc_${row.id}`}
                    d={`M ${sourceX} ${sourceY} C ${sourceX} ${midY}, ${destX} ${midY}, ${destX} ${destY}`}
                    fill="none"
                    stroke={row.type === 'squash' ? '#10b981' : '#818cf8'}
                    strokeWidth={3.5}
                    strokeDasharray={row.type === 'squash' ? '5 5' : 'none'}
                    strokeOpacity={0.9}
                  />
                );
              }

              return null;
            })}

            {/* COMMIT NODES: Big, prominent circles centered on the straight lines */}
            {computedRows.map((row) => {
              const isHovered = hoveredRow === row.id;
              const isLatest = row.rowIdx === computedRows.length - 1;

              return (
                <g
                  key={`node_${row.id}`}
                  className="v3-node-group"
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Big outer glowing pulse ring for HEAD commit */}
                  {isLatest && (
                    <circle
                      cx={row.x}
                      cy={row.y}
                      r={24}
                      fill="none"
                      stroke={row.branchColor}
                      strokeWidth={2}
                      className="anim-ping"
                      opacity={0.7}
                    />
                  )}

                  {/* Main Node Circle (Big radius: 14px) */}
                  <circle
                    cx={row.x}
                    cy={row.y}
                    r={isHovered ? 16 : 14}
                    fill={row.branchColor}
                    stroke="#0b1023"
                    strokeWidth={3.5}
                    filter={row.branchColor === '#10b981' ? 'url(#glow-main-big)' : undefined}
                    style={{ transition: 'r 0.18s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />

                  {/* Inner Symbol inside node */}
                  {row.type === 'merge' ? (
                    <circle cx={row.x} cy={row.y} r={4.5} fill="#ffffff" />
                  ) : row.type === 'squash' ? (
                    <rect x={row.x - 4} y={row.y - 4} width={8} height={8} fill="#ffffff" rx={1.5} />
                  ) : (
                    <circle cx={row.x} cy={row.y} r={3} fill="#0b1023" />
                  )}
                </g>
              );
            })}

            {/* Dangerous Action Indicator if user made an unsafe choice */}
            {lastAction?.type === 'danger' && (
              <g className="unsafe-attempt-marker">
                <line
                  x1={TRACKS.main}
                  y1={START_Y + 1 * ROW_HEIGHT}
                  x2={TRACKS.main}
                  y2={START_Y + 2 * ROW_HEIGHT}
                  stroke="#ef4444"
                  strokeWidth={4}
                  strokeDasharray="5 5"
                  className="anim-dash"
                />
                <circle
                  cx={TRACKS.main}
                  cy={START_Y + 1.5 * ROW_HEIGHT}
                  r={16}
                  fill="#ef4444"
                  stroke="#ffffff"
                  strokeWidth={2.5}
                  filter="url(#glow-danger-big)"
                />
                <text
                  x={TRACKS.main - 6}
                  y={START_Y + 1.5 * ROW_HEIGHT + 5}
                  fill="#ffffff"
                  fontSize="14"
                  fontWeight="bold"
                >
                  ✕
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Right Side: Straight Synchronized Commit Rows (Matches exact 78px height) */}
        <div className="v3-commit-table">
          {computedRows.map((row) => {
            const isHovered = hoveredRow === row.id;
            const isLatest = row.rowIdx === computedRows.length - 1;

            return (
              <div
                key={`row_table_${row.id}`}
                className={`v3-table-row ${isHovered ? 'hovered' : ''} ${isLatest ? 'is-head' : ''}`}
                style={{ height: `${ROW_HEIGHT}px` }}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Monospace SHA Tag */}
                <div className="v3-col-hash">
                  <code>{row.hash}</code>
                </div>

                {/* Branch Chip Tag */}
                <div className="v3-col-branch">
                  <span
                    className="v3-branch-pill"
                    style={{
                      color: row.branchColor,
                      backgroundColor: `${row.branchColor}18`,
                      borderColor: `${row.branchColor}40`
                    }}
                  >
                    {row.branchName}
                  </span>
                </div>

                {/* Commit Message & Author */}
                <div className="v3-col-info">
                  <span className="v3-msg-text">{row.title}</span>
                  <span className="v3-author-text">authored by {row.author}</span>
                </div>

                {/* Status Badge */}
                <div className="v3-col-badge">
                  {row.badge && (
                    <span
                      className="v3-status-pill"
                      style={{
                        color: row.badgeColor || '#94a3b8',
                        borderColor: `${row.badgeColor || '#94a3b8'}40`,
                        backgroundColor: `${row.badgeColor || '#94a3b8'}15`
                      }}
                    >
                      {row.badge}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Danger Banner if Unsafe Decision was made */}
      {lastAction?.type === 'danger' && (
        <div className="v3-danger-alert anim-shake">
          <ShieldAlert size={20} className="text-red-400 shrink-0" />
          <div>
            <strong>Branch Protection Blocked Action:</strong> {lastAction.dangerTitle} — {lastAction.dangerExplanation}
          </div>
        </div>
      )}

      {/* Squash Success Summary */}
      {currentStage === 9 && squashMode === 'squashed' && (
        <div className="v3-squash-summary">
          <Sparkles size={18} className="text-emerald-400 shrink-0" />
          <div>
            <strong>Clean Commit History Verified:</strong> All 8 messy WIP commits were squashed into 1 clean production commit on <code>main</code> with zero merge conflict noise.
          </div>
        </div>
      )}
    </div>
  );
}
