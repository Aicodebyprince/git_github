import React from 'react';

export default function Terminal({ title = 'zsh — project', children, className = '', style }) {
  return (
    <div className={'terminal ' + className} style={style}>
      <div className="terminal-bar">
        <span /><span /><span />
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}
