import React from 'react';

export default function SlideHead({ num, eyebrow, title, sub, center }) {
  return (
    <div className={'slide-head' + (center ? ' center' : '')}>
      {eyebrow && (
        <span className="eyebrow rise">
          {num != null && <span className="n">{num}</span>}
          {eyebrow}
        </span>
      )}
      <h1 className="title rise" style={{ '--d': '.06s' }}>
        {title}
      </h1>
      {sub && (
        <p className="subtitle rise" style={{ '--d': '.12s' }}>
          {sub}
        </p>
      )}
    </div>
  );
}
