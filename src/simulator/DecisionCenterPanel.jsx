import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, CornerDownLeft, Sparkles, Terminal, Code2 } from 'lucide-react';
import GitGraphVisualizer from './GitGraphVisualizer.jsx';

export default function DecisionCenterPanel({
  scenario,
  currentStage,
  selectedOption,
  onSelectOption,
  feedbackState,
  onNextStage,
  lastAction
}) {
  // Keyboard listener for 1, 2, 3, 4 and Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing inside an input
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;

      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (scenario.options[idx]) {
          onSelectOption(scenario.options[idx]);
        }
      } else if (e.key === 'Enter' && feedbackState?.isCorrect) {
        onNextStage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scenario, feedbackState, onSelectOption, onNextStage]);

  return (
    <div className="panel-decision-center">
      {/* Question Card */}
      <div className="card-glass question-container-card">
        <div className="question-meta-row">
          <span className="category-pill">{scenario.category}</span>
          <span className="stage-counter-pill">
            STAGE {String(currentStage).padStart(2, '0')} / 09
          </span>
        </div>

        <h2 className="question-title">{scenario.question}</h2>

        {/* 4 Interactive Decision Action Cards */}
        <div className="decision-grid">
          {scenario.options.map((opt, idx) => {
            const keyNum = idx + 1;
            const isSelected = selectedOption?.id === opt.id;
            const isThisCorrect = feedbackState?.isCorrect && isSelected;
            const isThisDanger = feedbackState && !feedbackState.isCorrect && isSelected;

            let cardStateClass = '';
            if (isThisCorrect) cardStateClass = 'state-correct';
            if (isThisDanger) cardStateClass = 'state-danger anim-shake';

            return (
              <button
                key={opt.id}
                id={`decision-opt-${opt.id}`}
                className={`decision-option-card ${cardStateClass}`}
                onClick={() => onSelectOption(opt)}
                disabled={feedbackState?.isCorrect}
              >
                <div className="option-top-row">
                  <span className="key-badge">[{keyNum}]</span>
                  <div className="cmd-pill">
                    <Terminal size={11} className="text-slate-400" />
                    <code>{opt.cmd}</code>
                  </div>
                </div>

                <div className="option-body-row">
                  <span className="option-label">{opt.label}</span>
                  {isThisCorrect && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
                  {isThisDanger && <AlertTriangle size={18} className="text-red-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Alert: Correct State */}
        {feedbackState?.isCorrect && (
          <div className="feedback-banner success-banner anim-slide-up">
            <div className="feedback-banner-header">
              <div className="feedback-icon success-icon">
                <CheckCircle2 size={20} />
              </div>
              <div className="feedback-headline">
                <h4>Excellent Engineering Decision!</h4>
                <p>{feedbackState.explanation}</p>
              </div>
            </div>

            <div className="feedback-actions">
              <button
                id="btn-next-stage"
                className="btn-primary-glow btn-next-stage"
                onClick={onNextStage}
              >
                <span>Continue to Stage {currentStage < 9 ? currentStage + 1 : 'Review'}</span>
                <ArrowRight size={16} />
                <span className="key-hint-enter">
                  <CornerDownLeft size={11} /> Enter
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Feedback Alert: Danger / Incorrect State */}
        {feedbackState && !feedbackState.isCorrect && (
          <div className="feedback-banner danger-banner anim-shake">
            <div className="feedback-banner-header">
              <div className="feedback-icon danger-icon">
                <AlertTriangle size={20} />
              </div>
              <div className="feedback-headline">
                <h4 className="text-red-400">{feedbackState.dangerTitle || 'High Risk Production Action'}</h4>
                <p>{feedbackState.dangerExplanation}</p>
              </div>
            </div>

            <div className="feedback-subnote">
              <span>⚠️ Team policy requires selecting a safe, standard Git workflow. Please choose another option.</span>
            </div>
          </div>
        )}
      </div>

      {/* Live Dynamic SVG Git Graph Visualizer */}
      <GitGraphVisualizer
        currentStage={currentStage}
        lastAction={lastAction}
        scenario={scenario}
      />
    </div>
  );
}
