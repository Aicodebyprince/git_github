import React from 'react';

const MAIN_Y = 86;
const FEAT_Y = 186;
const X = { c1: 60, c2: 210, c3: 350, c4: 490 };
const C_MAIN = '#818cf8';
const C_FEAT = '#a78bfa';
const FONT_MONO = 'JetBrains Mono, monospace';
const FONT_BODY = 'Inter, sans-serif';

/**
 * Animated branching simulation.
 * `n` is the current phase (0..5):
 *   0 start on main · 1 branch splits off · 2 first commit on the branch ·
 *   3 second commit · 4 switch back to main · 5 two branches side by side
 */
export default function BranchDemo({ n }) {
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

  const head = (x, y) => (
    <g className="md-tag shown">
      <rect x={x - 40} y={y} width={80} height={28} rx="14" fill="rgba(52,211,153,0.14)" stroke="rgba(52,211,153,0.45)" />
      <text x={x} y={y + 19} textAnchor="middle" fontSize="13" fill="#34d399" fontFamily={FONT_MONO} fontWeight="700">
        HEAD
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 660 300" className="md-svg" role="img" aria-label="Animated git branching">
      {/* main lane — stays at c2 the whole time */}
      <line
        className={'md-line' + (n >= 0 ? ' draw' : '')}
        x1={40} y1={MAIN_Y} x2={X.c2} y2={MAIN_Y}
        stroke="#3d4773" strokeWidth="2.2"
      />
      {/* feature lane — splits off and grows */}
      <path
        className={'md-line branch' + (n >= 1 ? ' draw' : '')}
        d={`M ${X.c2} ${MAIN_Y} C ${X.c2 + 20} ${MAIN_Y}, ${X.c2 + 24} ${FEAT_Y}, ${X.c2 + 48} ${FEAT_Y} L ${X.c4} ${FEAT_Y}`}
        fill="none" stroke={C_FEAT} strokeWidth="2.2" strokeDasharray="8 7"
      />

      {/* commits */}
      {node(X.c1, MAIN_Y, C_MAIN, 'init', 'c1', n >= 0)}
      {node(X.c2, MAIN_Y, C_MAIN, 'fix', 'c2', n >= 0)}
      {node(X.c3, FEAT_Y, C_FEAT, 'feature', 'c3', n >= 2)}
      {node(X.c4, FEAT_Y, C_FEAT, 'feature', 'c4', n >= 3)}

      {/* branch labels */}
      {tag(X.c2, MAIN_Y - 66, 'main', 88, n >= 0 ? 'shown' : '', 'mk-main')}
      {tag(X.c4, FEAT_Y - 66, 'feature/login', 148, n >= 1 ? 'shown' : '', 'mk-feat')}

      {/* HEAD marker — follows the branch you are on */}
      {n >= 1 && n < 4 && head(X.c3, FEAT_Y + 56)}
      {n >= 4 && head(X.c1, MAIN_Y + 56)}

      {/* final flourish: main stayed put */}
      {n >= 5 && (
        <text x={X.c4} y={FEAT_Y + 100} textAnchor="middle" fontSize="14" fill="#34d399" fontFamily={FONT_BODY} fontWeight="700">
          main never noticed a thing ✓
        </text>
      )}
    </svg>
  );
}