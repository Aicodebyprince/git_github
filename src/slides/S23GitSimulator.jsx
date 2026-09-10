import React from 'react';
import GitWorkflowSimulator from '../simulator/GitWorkflowSimulator.jsx';

export default function S23GitSimulator({ onNext }) {
  return (
    <div className="simulator-slide-wrapper" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <GitWorkflowSimulator />
    </div>
  );
}
