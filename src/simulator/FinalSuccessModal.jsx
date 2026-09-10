import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, RotateCcw, GitBranch, GitMerge, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import GitGraphVisualizer from './GitGraphVisualizer.jsx';

export default function FinalSuccessModal({ onRestart, healthScore = 100 }) {
  useEffect(() => {
    // Fire festive confetti bursts
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#10b981', '#6366f1', '#a855f7', '#38bdf8', '#fbbf24']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#10b981', '#6366f1', '#a855f7', '#38bdf8', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const checklistItems = [
    { title: 'Feature Branches Used', desc: 'login-feature, login-ui, and register-feature cleanly isolated development.' },
    { title: 'Pull Requests Used', desc: 'Every line was code reviewed and passed automated CI testing.' },
    { title: 'Rebase Applied', desc: 'register-feature replayed seamlessly on top of updated main without merge noise.' },
    { title: 'Squash Merge Applied', desc: '8 messy intermediate commits compressed into 1 clean production commit.' },
    { title: 'Clean Commit History', desc: 'Linear, bisectable, and fully readable release history.' },
    { title: 'Safe Deployment Workflow', desc: 'Zero direct pushes to main; 100% protected branch compliance.' }
  ];

  return (
    <div className="final-modal-overlay">
      <div className="final-modal-card anim-modal-pop">
        {/* Top Celebration Banner */}
        <div className="final-modal-header">
          <div className="final-trophy-orb">
            <Award size={36} className="text-emerald-400" />
            <Sparkles size={20} className="trophy-sparkle anim-spin" />
          </div>

          <div className="final-badge-pill">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>ENTERPRISE RELEASE CERTIFIED</span>
          </div>

          <h1 className="final-congrats-title">
            Congratulations! You completed a real-world Git workflow used by professional software teams.
          </h1>

          <p className="final-congrats-sub">
            You successfully guided Alex, Sarah, and Mike through a high-stakes production release at ShopFlow. All branch protection guardrails and code quality gates remained intact.
          </p>

          <div className="final-health-banner">
            <div className="final-health-metric">
              <span className="final-health-label">Repository Health:</span>
              <span className="final-health-value">100%</span>
            </div>
            <div className="final-health-status">
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>Zero Build Failures · Zero Direct Pushes</span>
            </div>
          </div>
        </div>

        {/* 6-Point Enterprise Checklist Grid */}
        <div className="final-checklist-section">
          <h3 className="checklist-heading">
            <ShieldCheck size={18} className="text-emerald-400" />
            <span>Workflow Engineering Verification Checklist</span>
          </h3>

          <div className="final-checklist-grid">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="final-check-card">
                <div className="check-icon-orb">
                  <CheckCircle2 size={16} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="check-item-title">{item.title}</h4>
                  <p className="check-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fully Built Git Graph Preview */}
        <div className="final-graph-container">
          <div className="final-graph-header">
            <GitBranch size={16} className="text-brand-light" />
            <span>Fully Built Production Git Graph</span>
          </div>
          <GitGraphVisualizer
            currentStage={9}
            lastAction={null}
            scenario={{}}
            isComplete={true}
          />
        </div>

        {/* Action Controls */}
        <div className="final-actions-footer">
          <button
            id="btn-restart-simulator"
            className="btn-primary-glow btn-restart"
            onClick={onRestart}
          >
            <RotateCcw size={16} />
            <span>Restart Simulator Mission</span>
          </button>
        </div>
      </div>
    </div>
  );
}
