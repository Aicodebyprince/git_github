import React from 'react';
import { HeartPulse, CheckCircle2, XCircle, Terminal, Activity, ShieldCheck, Flame, GitCommit } from 'lucide-react';

export default function StatusRightPanel({
  currentStage,
  totalStages = 9,
  healthScore,
  correctCount,
  incorrectCount,
  terminalLogs = [],
  completedStages = []
}) {
  const progressPercent = Math.round(((currentStage - 1) / totalStages) * 100);

  // Health color calculation
  let healthColor = '#10b981'; // Green
  let healthStatus = 'Nominal (Production Ready)';
  if (healthScore < 75) {
    healthColor = '#f59e0b'; // Amber
    healthStatus = 'At Risk (Policy Violations)';
  }
  if (healthScore < 50) {
    healthColor = '#ef4444'; // Red
    healthStatus = 'Critical Incident Threat';
  }

  // Circular gauge calculations (radius = 38, perimeter ~ 238.76)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <aside className="panel-status-right">
      {/* Repository Health Score Card */}
      <div className="card-glass health-card">
        <div className="section-eyebrow">
          <HeartPulse size={13} style={{ color: healthColor }} />
          <span>REPOSITORY HEALTH</span>
        </div>

        <div className="health-gauge-row">
          <div className="gauge-svg-wrap">
            <svg viewBox="0 0 100 100" className="health-radial-svg">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="gauge-bg-circle"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="gauge-progress-circle"
                stroke={healthColor}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="gauge-score-overlay">
              <span className="gauge-number" style={{ color: healthColor }}>
                {healthScore}%
              </span>
            </div>
          </div>

          <div className="health-meta-info">
            <div className="health-status-badge" style={{ borderColor: `${healthColor}40`, color: healthColor }}>
              {healthStatus}
            </div>
            <p className="health-tip">
              Protects against regressions, broken builds, and unprotected pushes.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="status-metrics-grid">
          <div className="metric-pill metric-correct">
            <div className="metric-icon-wrap">
              <CheckCircle2 size={15} className="text-emerald-400" />
            </div>
            <div>
              <span className="metric-value">{correctCount}</span>
              <span className="metric-label">Approved</span>
            </div>
          </div>

          <div className="metric-pill metric-incorrect">
            <div className="metric-icon-wrap">
              <XCircle size={15} className="text-red-400" />
            </div>
            <div>
              <span className="metric-value">{incorrectCount}</span>
              <span className="metric-label">Prevented</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Progress Roadmap */}
      <div className="card-glass progress-card">
        <div className="section-eyebrow">
          <Activity size={13} className="text-brand-light" />
          <span>WORKFLOW STAGE PROGRESS</span>
        </div>

        <div className="progress-header-row">
          <span className="progress-title">Stage {currentStage} of {totalStages}</span>
          <span className="progress-pct">{progressPercent}%</span>
        </div>

        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Stages Step Timeline */}
        <div className="stages-step-list">
          {Array.from({ length: totalStages }).map((_, idx) => {
            const stepNum = idx + 1;
            const isDone = stepNum < currentStage;
            const isCurrent = stepNum === currentStage;

            return (
              <div
                key={stepNum}
                className={`stage-timeline-item ${isDone ? 'step-done' : ''} ${isCurrent ? 'step-current' : ''}`}
              >
                <div className="step-indicator-dot">
                  {isDone ? '✓' : stepNum}
                </div>
                <span className="step-label">
                  {stepNum === 1 && 'Alex Login Branch'}
                  {stepNum === 2 && 'Sarah UI Branch'}
                  {stepNum === 3 && 'Mike Registration'}
                  {stepNum === 4 && 'Alex Pull Request'}
                  {stepNum === 5 && 'UI Merge to Feature'}
                  {stepNum === 6 && 'Feature Merge to Main'}
                  {stepNum === 7 && 'Mike Git Rebase'}
                  {stepNum === 8 && 'Registration PR'}
                  {stepNum === 9 && 'Squash Merge'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Git Terminal Audit Log */}
      <div className="card-glass terminal-audit-card">
        <div className="section-eyebrow">
          <Terminal size={13} className="text-emerald-400" />
          <span>GIT AUDIT LOG</span>
        </div>

        <div className="terminal-screen">
          <div className="terminal-header-dots">
            <span className="term-dot dot-red" />
            <span className="term-dot dot-yellow" />
            <span className="term-dot dot-green" />
            <span className="term-user">shopflow@ci-runner:~/auth</span>
          </div>

          <div className="terminal-body-log">
            {terminalLogs.length === 0 ? (
              <div className="term-log-empty">Waiting for team action...</div>
            ) : (
              terminalLogs.slice(-6).map((log, idx) => (
                <div key={idx} className={`term-log-line ${log.type || 'info'}`}>
                  <span className="term-prompt">$</span>
                  <span className="term-cmd">{log.cmd}</span>
                  {log.output && <div className="term-out">{log.output}</div>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
