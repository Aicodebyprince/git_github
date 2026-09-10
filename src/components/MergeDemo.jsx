import React from 'react';

const MAIN_Y = 86;
const FEAT_Y = 186;
const X = { c1: 60, c2: 210, c3: 350, c4: 490, c5: 596 };
const C_MAIN = '#818cf8';
const C_FEAT = '#a78bfa';
const C_GOOD = '#34d399';
const FONT_MONO = 'JetBrains Mono, monospace';
const FONT_BODY = 'Inter, sans-serif';

/**
 * Animated merge simulation.
 * `n` is the current phase (0..6):
 *   0 start on main · 1 branch splits · 2 first feature commit ·
 *   3 second feature commit · 4 merge commit joins · 5 branch deleted
 */
export default function MergeDemo({ n }) {
  const node = (x, y, color, sub, label, shown) => (
    <g className={'md-node' + (shown ? ' shown' : '')}>
      <circle cx={x} cy={y} r="12.5" fill="#0c1128" stroke={color} strokeWidth="3" />
      <circle cx={x} cy={y} r="4.6" fill={color} />
      {sub && (
        <text x={x} y={y - 22} textAnchor="middle" fontSize="12" fill="#828cb8" fontFamily={FONT_MONO}>
          {sub}
        </text>
      )}
      {label && (
        <text x={x} y={y + 34} textAnchor="middle" fontSize="15.5" fill="#cdd6ff" fontFamily={FONT_BODY} fontWeight="700">
          {label}
        </text>
      )}
    </g>
  );

  const tag = (x, y, text, w, cls, kind) => (
    <g className={'md-tag ' + cls + ' ' + kind}>
      <rect x={x - w / 2} y={y} width={w} height="30" rx="15" />
      <text x={x} y={y + 20} textAnchor="middle" fontSize="13.5" fill="#fff" fontFamily={FONT_MONO} fontWeight="700">
        {text}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 660 236" className="md-svg" role="img" aria-label="Animated git merge">
      {/* main lane — base segment */}
      <line
        className={'md-line' + (n >= 0 ? ' draw' : '')}
        x1={40} y1={MAIN_Y} x2={X.c2} y2={MAIN_Y}
        stroke="#3d4773" strokeWidth="2.2"
      />
      {/* main lane — extended after merge */}
      <line
        className={'md-line' + (n >= 4 ? ' draw' : '')}
        x1={X.c2} y1={MAIN_Y} x2={X.c5} y2={MAIN_Y}
        stroke="#3d4773" strokeWidth="2.2"
      />
      {/* feature lane — branch splits off */}
      <path
        className={'md-line branch' + (n >= 1 ? ' draw' : '')}
        d={`M ${X.c2} ${MAIN_Y} C ${X.c2 + 20} ${MAIN_Y}, ${X.c2 + 24} ${FEAT_Y}, ${X.c2 + 48} ${FEAT_Y} L ${X.c4} ${FEAT_Y}`}
        fill="none" stroke={C_FEAT} strokeWidth="2.2" strokeDasharray="8 7"
      />
      {/* merge curve — feature joins back to main */}
      <path
        className={'md-line merge' + (n >= 4 ? ' draw' : '')}
        d={`M ${X.c4} ${FEAT_Y} C ${X.c4 + 32} ${FEAT_Y}, ${X.c5 - 34} ${FEAT_Y}, ${X.c5} ${MAIN_Y}`}
        fill="none" stroke={C_GOOD} strokeWidth="2.6"
      />

      {/* commits */}
      {node(X.c1, MAIN_Y, C_MAIN, 'init', 'c1', n >= 0)}
      {node(X.c2, MAIN_Y, C_MAIN, 'fix', 'c2', n >= 0)}
      {node(X.c3, FEAT_Y, C_FEAT, 'feature', 'c3', n >= 2)}
      {node(X.c4, FEAT_Y, C_FEAT, 'feature', 'c4', n >= 3)}
      {node(X.c5, MAIN_Y, C_GOOD, 'merge', 'c5', n >= 4)}

      {/* branch labels */}
      {tag(X.c2, MAIN_Y - 66, 'main', 88, n >= 0 ? (n >= 5 ? 'bye' : 'shown') : '', 'mk-main')}
      {tag(X.c5, MAIN_Y - 66, 'main', 88, n >= 5 ? 'shown' : '', 'mk-main')}
      {tag(X.c4, FEAT_Y - 66, 'feature/login', 148, n >= 1 ? (n >= 5 ? 'bye' : 'shown') : '', 'mk-feat')}

      {/* HEAD marker */}
      {n >= 5 && (
        <g className="md-tag shown">
          <rect x={X.c5 - 40} y={FEAT_Y - 40} width={80} height={28} rx={14} fill="rgba(52,211,153,0.14)" stroke="rgba(52,211,153,0.45)" />
          <text x={X.c5} y={FEAT_Y - 20} textAnchor="middle" fontSize="13" fill="#34d399" fontFamily={FONT_MONO} fontWeight="700">
            HEAD
          </text>
        </g>
      )}
    </svg>
  );
}