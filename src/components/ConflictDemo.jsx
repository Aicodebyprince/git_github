import React from 'react';

const MAIN_Y = 44;
const FEAT_Y = 112;
const X = { c1: 60, c2: 190, m1: 340, f1: 340, c5: 520 };
const C_MAIN = '#818cf8';
const C_FEAT = '#a78bfa';
const C_GOOD = '#34d399';
const C_BAD = '#fb7185';
const FONT_MONO = 'JetBrains Mono, monospace';
const FONT_BODY = 'Inter, sans-serif';

/**
 * Animated conflict simulation.
 * `n` is the current phase (0..5):
 *   0 two branches diverge · 1 main edits the line · 2 feature edits it too ·
 *   3 merge → CONFLICT · 4 you resolve · 5 committed
 */
export default function ConflictDemo({ n }) {
  const node = (x, y, color, sub, label, shown) => (
    <g className={'md-node' + (shown ? ' shown' : '')}>
      <circle cx={x} cy={y} r="10.5" fill="#0c1128" stroke={color} strokeWidth="2.8" />
      <circle cx={x} cy={y} r="3.9" fill={color} />
      {sub && (
        <text x={x} y={y - 19} textAnchor="middle" fontSize="11" fill="#828cb8" fontFamily={FONT_MONO}>
          {sub}
        </text>
      )}
      {label && (
        <text x={x} y={y + 30} textAnchor="middle" fontSize="14" fill="#cdd6ff" fontFamily={FONT_BODY} fontWeight="700">
          {label}
        </text>
      )}
    </g>
  );

  const tag = (x, y, text, w, cls, kind) => (
    <g className={'md-tag ' + cls + ' ' + kind}>
      <rect x={x - w / 2} y={y} width={w} height="26" rx="13" />
      <text x={x} y={y + 17.5} textAnchor="middle" fontSize="12.5" fill="#fff" fontFamily={FONT_MONO} fontWeight="700">
        {text}
      </text>
    </g>
  );

  const badge = (x, y, text, w, color, flash) => (
    <g className={'cd-badge' + (flash ? ' flash' : '')}>
      <rect x={x - w / 2} y={y} width={w} height="26" rx="13" fill="rgba(251,113,133,0.14)" stroke={color} strokeWidth="1.4" />
      <text x={x} y={y + 17.5} textAnchor="middle" fontSize="12" fill={color} fontFamily={FONT_MONO} fontWeight="700">
        {text}
      </text>
    </g>
  );

  const line = (num, content, cls, delay) => (
    <div className={'cd-line shown ' + (cls || '')} style={{ '--d': delay }}>
      <span className="cd-num">{num}</span>
      <code>{content}</code>
    </div>
  );

  return (
    <div className="cd-wrap">
      <svg viewBox="0 0 660 152" className="cd-svg" role="img" aria-label="Animated merge conflict">
        {/* main lane */}
        <line className={'md-line' + (n >= 0 ? ' draw' : '')} x1={40} y1={MAIN_Y} x2={X.m1} y2={MAIN_Y} stroke="#3d4773" strokeWidth="2" />
        {/* main lane extended after resolution */}
        <line className={'md-line' + (n >= 4 ? ' draw' : '')} x1={X.m1} y1={MAIN_Y} x2={X.c5} y2={MAIN_Y} stroke="#3d4773" strokeWidth="2" />
        {/* feature lane */}
        <path
          className={'md-line branch' + (n >= 2 ? ' draw' : '')}
          d={`M ${X.c2} ${MAIN_Y} C ${X.c2 + 16} ${MAIN_Y}, ${X.c2 + 20} ${FEAT_Y}, ${X.c2 + 40} ${FEAT_Y} L ${X.f1} ${FEAT_Y}`}
          fill="none" stroke={C_FEAT} strokeWidth="2" strokeDasharray="8 7"
        />

        {node(X.c1, MAIN_Y, C_MAIN, 'init', 'c1', n >= 0)}
        {node(X.c2, MAIN_Y, C_MAIN, 'fix', 'c2', n >= 0)}
        {node(X.m1, MAIN_Y, C_MAIN, 'main edit', 'm1', n >= 1)}
        {node(X.f1, FEAT_Y, C_FEAT, 'feature edit', 'f1', n >= 2)}
        {node(X.c5, MAIN_Y, C_GOOD, 'merge', 'c5', n >= 4)}

        {tag(X.c2, MAIN_Y - 52, 'main', 80, n >= 0 ? (n >= 5 ? 'bye' : 'shown') : '', 'mk-main')}
        {tag(X.c5, MAIN_Y - 52, 'main', 80, n >= 5 ? 'shown' : '', 'mk-main')}
        {tag(X.f1, FEAT_Y - 52, 'feature/login', 132, n >= 2 ? (n >= 5 ? 'bye' : 'shown') : '', 'mk-feat')}

        {n === 3 && badge(440, 62, '⚡ CONFLICT', 128, C_BAD, true)}
        {n >= 4 && badge(440, 62, '✓ resolved', 116, C_GOOD, false)}
      </svg>

      <div className="cd-editor">
        <div className="cd-bar">
          <span className="cd-dot r" /><span className="cd-dot y" /><span className="cd-dot g" />
          <span className="cd-file">style.css</span>
        </div>
        <div className="cd-body">
          {n < 3 && (
            <>
              {line(1, 'button {', '', '.05s')}
              {line(2, '  color: "blue";', '', '.15s')}
              {line(3, '}', '', '.25s')}
            </>
          )}
          {n === 3 && (
            <>
              {line(1, 'button {', '', '.05s')}
              {line(2, '<<<<<<< HEAD', 'marker', '.2s')}
              {line(3, '  color: "indigo";', 'mine', '.32s')}
              {line(4, '=======', 'marker', '.44s')}
              {line(5, '  color: "green";', 'theirs', '.56s')}
              {line(6, '>>>>>>> feature/login', 'marker', '.68s')}
              {line(7, '}', '', '.8s')}
            </>
          )}
          {n >= 4 && (
            <>
              {line(1, 'button {', '', '.05s')}
              {line(2, '  color: "violet";', 'resolve', '.2s')}
              {line(3, '}', '', '.3s')}
              <div className={'cd-done' + (n >= 4 ? ' shown' : '')} style={{ '--d': '.55s' }}>
                ✓ conflict resolved — {n >= 5 ? 'committed (c5d6e7f), nothing lost' : 'markers removed, ready to commit'}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}