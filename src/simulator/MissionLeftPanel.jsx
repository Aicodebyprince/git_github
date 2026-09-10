import React from 'react';
import { Shield, Building2, Users, AlertCircle, Sparkles, Terminal, CheckCircle2, HeartPulse, XCircle } from 'lucide-react';
import { DEVELOPERS } from './scenarios.js';

export default function MissionLeftPanel({
  scenario,
  currentStage,
  healthScore = 100,
  correctCount = 0,
  incorrectCount = 0
}) {
  const currentDev = scenario.developer;

  // Health color calculation
  let healthColor = '#10b981';
  let healthStatus = 'Nominal (Production Ready)';
  if (healthScore < 75) {
    healthColor = '#f59e0b';
    healthStatus = 'At Risk (Policy Violations)';
  }
  if (healthScore < 50) {
    healthColor = '#ef4444';
    healthStatus = 'Critical Incident Threat';
  }

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (healthScore / 100) * circumference;

  return (
    <aside className="panel-mission-left">
      {/* Enterprise Company Card */}
      <div className="card-glass company-card">
        <div className="company-badge-header">
          <div className="company-logo-avatar">
            <Building2 size={18} className="text-brand-light" />
          </div>
          <div>
            <div className="company-name-row">
              <span className="company-title">ShopFlow</span>
              <span className="badge-corp">E-Commerce</span>
            </div>
            <span className="company-repo">shopflow / auth-service</span>
          </div>
        </div>

        <p className="mission-pitch">
          Modernizing authentication with zero downtime and strict branch protection.
        </p>

        <div className="repo-policy-strip">
          <div className="policy-item">
            <Shield size={13} className="text-emerald-400" />
            <span>Main Protected</span>
          </div>
          <div className="policy-item">
            <CheckCircle2 size={13} className="text-brand-light" />
            <span>CI: Strict</span>
          </div>
        </div>
      </div>

      {/* Active Developer Spotlight */}
      <div className="card-glass dev-spotlight-card">
        <div className="section-eyebrow">
          <Sparkles size={13} className="text-brand-light" />
          <span>ACTIVE ENGINEER SPOTLIGHT</span>
        </div>

        <div className="dev-hero-row">
          <div className="dev-avatar-orb" style={{ borderColor: currentDev.color }}>
            <span className="dev-emoji">{currentDev.avatar}</span>
            <span className="dev-online-dot" />
          </div>
          <div className="dev-hero-info">
            <h4 className="dev-hero-name">{currentDev.name}</h4>
            <span className="dev-hero-role">{currentDev.role}</span>
            <div className="dev-branch-tag">
              <Terminal size={11} />
              <code>{currentDev.branch}</code>
            </div>
          </div>
        </div>

        <p className="dev-bio-text">{currentDev.bio}</p>
      </div>

      {/* Current Engineering Situation / Dilemma */}
      <div className="card-glass dilemma-card">
        <div className="section-eyebrow">
          <AlertCircle size={13} className="text-amber-400" />
          <span>CURRENT SITUATION</span>
        </div>

        <h3 className="dilemma-heading">{scenario.title}</h3>
        <p className="dilemma-body">{scenario.dilemma}</p>

        <div className="dilemma-highlight-box">
          <div className="dilemma-highlight-title">The Engineering Challenge:</div>
          <p className="dilemma-highlight-desc">{scenario.situation}</p>
        </div>
      </div>

      {/* Repository Health Compact Telemetry */}
      <div className="card-glass health-compact-card">
        <div className="section-eyebrow">
          <HeartPulse size={13} style={{ color: healthColor }} />
          <span>REPOSITORY HEALTH & SAFETY</span>
        </div>

        <div className="health-compact-row">
          <div className="gauge-svg-wrap-compact">
            <svg viewBox="0 0 80 80" className="health-radial-svg">
              <circle cx="40" cy="40" r={radius} className="gauge-bg-circle" />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="gauge-progress-circle"
                stroke={healthColor}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="gauge-score-overlay">
              <span className="gauge-number-compact" style={{ color: healthColor }}>
                {healthScore}%
              </span>
            </div>
          </div>

          <div className="health-compact-details">
            <div className="health-compact-badge" style={{ borderColor: `${healthColor}40`, color: healthColor }}>
              {healthStatus}
            </div>
            <div className="health-compact-counters">
              <span className="counter-item text-emerald-400">
                <CheckCircle2 size={12} /> {correctCount} Approved
              </span>
              <span className="counter-item text-red-400">
                <XCircle size={12} /> {incorrectCount} Blocked
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Roster */}
      <div className="card-glass team-roster-card">
        <div className="section-eyebrow">
          <Users size={13} className="text-brand-light" />
          <span>ENGINEERING SQUAD</span>
        </div>

        <div className="roster-list">
          {Object.values(DEVELOPERS).map((dev) => {
            const isActive = dev.id === currentDev.id;
            return (
              <div key={dev.id} className={`roster-item ${isActive ? 'active-squad-member' : ''}`}>
                <span className="roster-avatar">{dev.avatar}</span>
                <div className="roster-meta">
                  <div className="roster-top">
                    <span className="roster-name">{dev.name}</span>
                    {isActive && <span className="roster-active-badge">Active</span>}
                  </div>
                  <span className="roster-branch"><code>{dev.branch}</code></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
