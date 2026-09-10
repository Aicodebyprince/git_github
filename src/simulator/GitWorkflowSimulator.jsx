import React, { useState, useCallback } from 'react';
import { Volume2, VolumeX, RotateCcw, GitBranch } from 'lucide-react';
import { SCENARIOS } from './scenarios.js';
import { useSimulatorSound } from './useSimulatorSound.js';
import MissionLeftPanel from './MissionLeftPanel.jsx';
import DecisionCenterPanel from './DecisionCenterPanel.jsx';
import FinalSuccessModal from './FinalSuccessModal.jsx';
import './simulator.css';

export default function GitWorkflowSimulator({ onBackToDeck = null }) {
  const [currentStage, setCurrentStage] = useState(1);
  const [healthScore, setHealthScore] = useState(100);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackState, setFeedbackState] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const sound = useSimulatorSound();
  const currentScenario = SCENARIOS[currentStage - 1] || SCENARIOS[0];

  const handleSelectOption = useCallback(
    (option) => {
      setSelectedOption(option);
      sound.playClick();

      if (option.isCorrect) {
        sound.playSuccess();
        setFeedbackState({
          isCorrect: true,
          explanation: option.explanation
        });
        setLastAction({
          type: 'correct',
          stage: currentStage
        });
        setCorrectCount((c) => c + 1);
      } else {
        sound.playError();
        setFeedbackState({
          isCorrect: false,
          dangerTitle: option.dangerTitle,
          dangerExplanation: option.dangerExplanation
        });
        setLastAction({
          type: 'danger',
          dangerTitle: option.dangerTitle,
          dangerExplanation: option.dangerExplanation,
          stage: currentStage
        });
        setIncorrectCount((c) => c + 1);
        setHealthScore((h) => Math.max(10, h - 10));
      }
    },
    [currentStage, sound]
  );

  const handleNextStage = useCallback(() => {
    sound.playClick();
    if (currentStage >= 9) {
      sound.playCelebration();
      setHealthScore(100);
      setIsCompleted(true);
    } else {
      setCurrentStage((s) => s + 1);
      setSelectedOption(null);
      setFeedbackState(null);
      setLastAction(null);
    }
  }, [currentStage, sound]);

  const handleRestart = useCallback(() => {
    sound.playClick();
    setCurrentStage(1);
    setHealthScore(100);
    setCorrectCount(0);
    setIncorrectCount(0);
    setSelectedOption(null);
    setFeedbackState(null);
    setLastAction(null);
    setIsCompleted(false);
  }, [sound]);

  return (
    <div className="simulator-root">
      {/* Top Navigation Bar */}
      <header className="simulator-header">
        <div className="header-brand-group">
          <div className="brand-logo-mark">
            <GitBranch size={17} />
          </div>
          <div className="brand-titles">
            <h1 className="brand-main-title">Git Workflow Simulator</h1>
            <span className="brand-sub-badge">ShopFlow Auth System</span>
          </div>
          <div className="header-status-pill">
            <span className="live-dot" />
            <span>Interactive Engineering Engine</span>
          </div>
        </div>

        <div className="header-controls-group">
          {/* Audio toggle */}
          <button
            className={`btn-header-tool ${sound.muted ? 'muted' : ''}`}
            onClick={sound.toggleMute}
            title={sound.muted ? 'Unmute audio effects' : 'Mute audio effects'}
          >
            {sound.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{sound.muted ? 'Muted' : 'Audio On'}</span>
          </button>

          {/* Reset button */}
          <button
            className="btn-header-tool"
            onClick={handleRestart}
            title="Reset simulation to Stage 1"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

          {/* Back to Slides toggle if available */}
          {onBackToDeck && (
            <button
              className="btn-header-tool btn-back-deck"
              onClick={onBackToDeck}
              title="Return to Presentation Slides"
            >
              <span>Back to Slides</span>
            </button>
          )}
        </div>
      </header>

      {/* 2-Column Dashboard Grid: Left Mission Panel + Big Center Decision & Straight Git Graph */}
      <main className="simulator-dashboard-grid-2col">
        <MissionLeftPanel
          scenario={currentScenario}
          currentStage={currentStage}
          healthScore={healthScore}
          correctCount={correctCount}
          incorrectCount={incorrectCount}
        />

        <DecisionCenterPanel
          scenario={currentScenario}
          currentStage={currentStage}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
          feedbackState={feedbackState}
          onNextStage={handleNextStage}
          lastAction={lastAction}
        />
      </main>

      {/* Final Celebration Modal */}
      {isCompleted && (
        <FinalSuccessModal
          onRestart={handleRestart}
          healthScore={healthScore}
        />
      )}
    </div>
  );
}
