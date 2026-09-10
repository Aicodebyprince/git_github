import React from 'react';

const MAIN_Y = 56;
const FEAT_Y = 130;
const X = { c1: 80, c2: 230, c3: 390, c4: 500, c5: 650 };
const C_MAIN = '#818cf8';
const C_FEAT = '#a78bfa';
const C_GOOD = '#34d399';
const C_BAD = '#fb7185';
const FONT_MONO = 'JetBrains Mono, monospace';
const FONT_BODY = 'Inter, sans-serif';

/**
 * Animated "day in the life" simulation.
 * `n` is the current phase (0..7):
 *   0 pull · 1 create branch · 2 commit · 3 push ·
 *   4 open PR · 5 review approved · 6 merge · 7 shipped
 */
export default function DayDemo({ n }) {
  const node = (x, y, color, sub, label, shown) => (
    <g className={'md-node' + (shown ? ' shown' : '')}>
      <circle cx={x} cy={y} r="12.5" fill="#0c1128" stroke={color} strokeWidth="3" />
      <circle cx={x} cy={y} r="4.6" fill={color} />
      {sub && (
        <text x={x} y={y - 21} textAnchor="middle" fontSize="11.5" fill="#828cb8" fontFamily={FONT_MONO}>
          {sub}
        </text>
      )}
      {label && (
        <text x={x} y={y + 32} textAnchor="middle" fontSize="15" fill="#cdd6ff" fontFamily={FONT_BODY} fontWeight="700">
          {label}
        </text>
      )}
    </g>
  );

  const tag = (x, y, text, w, cls, kind) => (
    <g className={'md-tag ' + cls + ' ' + kind}>
      <rect x={x - w / 2} y={y} width={w} height="28" rx="14" />
      <text x={x} y={y + 18.5} textAnchor="middle" fontSize="13" fill="#fff" fontFamily={FONT_MONO} fontWeight="700">
        {text}
      </text>
    </g>
  );

  const badge = (x, y, text, w, color, flash) => (
    <g className={'dd-badge' + (flash ? ' flash' : '')}>
      <rect x={x - w / 2} y={y} width={w} height="28" rx="14" />
      <text x={x} y={y + 18.5} textAnchor="middle" fontSize="12.5" fill={color} fontFamily={FONT_MONO} fontWeight="700">
        {text}
      </text>
    </g>
  );

  const head = (x, y, shown) => (
    <g className={'dd-head' + (shown ? ' shown' : '')}>
      <rect x={x - 34} y={y} width="68" height="24" rx="12" />
      <text x={x} y={y + 16} textAnchor="middle" fontSize="12" fill={C_GOOD} fontFamily={FONT_MONO} fontWeight="700">
        HEAD
      </text>
    </g>
  );

  return (
    <div className="dd-wrap">
      <svg viewBox="0 0 720 200" className="md-svg" role="img" aria-label="Animated real-world git workflow day">
        {/* main lane */}
        <line className={'md-line' + (n >= 0 ? ' draw' : '')} x1={40} y1={MAIN_Y} x2={X.c2} y2={MAIN_Y} stroke="#3d4773" strokeWidth="2.5" />
        {/* main lane extended by the merge */}
        <line className={'md-line' + (n >= 6 ? ' draw' : '')} x1={X.c2} y1={MAIN_Y} x2={X.c5} y2={MAIN_Y} stroke="#3d4773" strokeWidth="2.5" />
        {/* feature lane */}
        <path
          className={'md-line branch' + (n >= 1 ? ' draw' : '')}
          d={`M ${X.c2} ${MAIN_Y} C ${X.c2 + 18} ${MAIN_Y}, ${X.c2 + 24} ${FEAT_Y}, ${X.c2 + 46} ${FEAT_Y} L ${X.c4} ${FEAT_Y}`}
          fill="none" stroke={C_FEAT} strokeWidth="2.5" strokeDasharray="9 7"
        />
        {/* merge curve */}
        <path
          className={'md-line branch' + (n >= 6 ? ' draw' : '')}
          d={`M ${X.c4} ${FEAT_Y} C ${X.c4 + 26} ${FEAT_Y}, ${X.c4 + 40} ${MAIN_Y}, ${X.c4 + 70} ${MAIN_Y} L ${X.c5} ${MAIN_Y}`}
          fill="none" stroke={C_GOOD} strokeWidth="3"
        />

        {node(X.c1, MAIN_Y, C_MAIN, 'init', 'c1', n >= 0)}
        {node(X.c2, MAIN_Y, C_MAIN, 'baseline', 'c2', n >= 0)}
        {node(X.c3, FEAT_Y, C_FEAT, 'payment form', 'c3', n >= 2)}
        {node(X.c4, FEAT_Y, C_FEAT, 'validation', 'c4', n >= 3)}
        {node(X.c5, MAIN_Y, C_GOOD, 'merge', 'c5', n >= 6)}

        {tag(X.c2, MAIN_Y - 54, 'main', 84, n >= 0 ? 'shown' : '', 'mk-main')}
        {tag(X.c5, MAIN_Y - 54, 'main', 84, n >= 6 ? 'shown' : '', 'mk-main')}
        {tag(276, FEAT_Y - 54, 'feature/payment', 156, n >= 1 ? (n >= 6 ? 'bye' : 'shown') : '', 'mk-feat')}

        {head(X.c2 - 60, MAIN_Y + 16, n >= 0 && n < 1)}
        {head(X.c3 - 60, FEAT_Y + 16, n >= 1 && n < 3)}
        {head(X.c4 - 60, FEAT_Y + 16, n >= 3 && n < 6)}
        {head(X.c5 - 60, MAIN_Y + 16, n >= 6)}

        {n >= 3 && n < 4 && badge(540, 2, '↑ pushed to origin', 132, C_GOOD, false)}
        {n >= 4 && n < 6 && badge(540, 2, 'PR #142 · open', 118, C_MAIN, n === 4)}
        {n >= 6 && badge(540, 2, '✓ approved & merged', 142, C_GOOD, false)}
      </svg>

      <div className={'dd-done' + (n >= 7 ? ' shown' : '')}>
        ✓ Shipped to main — tomorrow at 9:00 everyone starts with <code>git pull origin main</code> again
      </div>
    </div>
  );
}