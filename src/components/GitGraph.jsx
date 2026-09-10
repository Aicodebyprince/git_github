import React from 'react';

/**
 * Horizontal animated git graph.
 * nodes: [{ x, label, sub, tone: 'main'|'branch'|'bug'|'good' }]
 * branchFrom: index of node after which the branch line arcs out
 */
export default function GitGraph({ nodes = [], branchFrom = null, height = 150, showSub = true }) {
  const W = 100;
  const unit = W / (nodes.length + 0.6);
  const laneY = { main: 38, branch: 96 };

  return (
    <svg viewBox={`0 0 ${W} ${height / 1.6}`} style={{ width: '100%', height: 'auto' }} role="img">
      {branchFrom != null && (
        <path
          d={`M ${unit * (branchFrom + 0.5)} ${laneY.main} C ${unit * (branchFrom + 1.1)} ${laneY.main}, ${unit * (branchFrom + 0.9)} ${laneY.branch}, ${unit * (branchFrom + 1.5)} ${laneY.branch}`}
          fill="none"
          stroke="#a5b4fc"
          strokeWidth="1.4"
          strokeDasharray="3 2.4"
          className="gg-line"
        />
      )}
      <line x1={unit * 0.5} y1={laneY.main} x2={unit * (nodes.length - 0.3)} y2={laneY.main} stroke="#3d4773" strokeWidth="1.4" />
      {nodes.map((n, i) => {
        const x = unit * (i + 0.5);
        const onBranch = branchFrom != null && i > branchFrom;
        const y = onBranch ? laneY.branch : laneY.main;
        const color = n.tone === 'bug' ? '#fb7185' : n.tone === 'good' ? '#34d399' : onBranch ? '#a78bfa' : '#818cf8';
        return (
          <g key={i} className="gg-node" style={{ animationDelay: `${i * 0.28}s` }}>
            <circle cx={x} cy={y} r="4.6" fill="#fff" stroke={color} strokeWidth="2" />
            <circle cx={x} cy={y} r="1.8" fill={color} />
            <text x={x} y={y + 15} textAnchor="middle" fontSize="4.1" fill="#cdd6ff" fontFamily="Inter, sans-serif" fontWeight="700">
              {n.label}
            </text>
            {showSub && n.sub && (
              <text x={x} y={y - 9} textAnchor="middle" fontSize="3.5" fill="#828cb8" fontFamily="JetBrains Mono, monospace">
                {n.sub}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
