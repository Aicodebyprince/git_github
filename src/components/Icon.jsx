import React from 'react';

const PATHS = {
  trash: <><path d="M4 7h16" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" /><path d="M10 11v7M14 11v7" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 12.5l9 5 9-5" /><path d="M3 17l9 5 9-5" /></>,
  merge: <><circle cx="6" cy="5" r="2.4" /><circle cx="18" cy="19" r="2.4" /><path d="M6 7.5V13a6 6 0 0 0 6 6h3.5" /></>,
  branch: <><circle cx="6" cy="4.5" r="2.4" /><circle cx="6" cy="19.5" r="2.4" /><circle cx="18" cy="8" r="2.4" /><path d="M6 7v10" /><path d="M18 10.5A7 7 0 0 1 11 17.5" /></>,
  undo: <><path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-15-6.7L3 13" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>,
  camera: <><path d="M4 8h3.2L9 5.4h6L16.8 8H20a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13.5" r="3.4" /></>,
  remote: <><path d="M17.5 19a4.5 4.5 0 1 0-1-8.9 6 6 0 0 0-11.5 1.7A4 4 0 0 0 6.5 19h11z" /></>,
  pr: <><circle cx="6" cy="6" r="2.4" /><circle cx="6" cy="18" r="2.4" /><circle cx="18" cy="18" r="2.4" /><path d="M6 8.5v7" /><path d="M15.5 15.5V9a3 3 0 0 0-3-3H10" /><path d="M12.5 3.5L10 6l2.5 2.5" /></>,
  terminal: <><path d="M4 17l6-5-6-5" /><path d="M12 19h8" /></>,
  zap: <><path d="M13 2L4.5 13.5H11L10 22l8.5-11.5H12L13 2z" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  check: <path d="M4.5 12.5l5 5L20 6.5" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  alert: <><path d="M12 3.5L22 20.5H2L12 3.5z" /><path d="M12 10v4.5" /><path d="M12 17.8v.2" /></>,
  users: <><circle cx="9" cy="8" r="3.4" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><circle cx="17.5" cy="9.5" r="2.6" /><path d="M16.5 20a6 6 0 0 1 5-5.5" /></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />,
  file: <><path d="M6.5 2.5h7l5 5v14h-12v-19z" /><path d="M13.5 2.5v5h5" /><path d="M9.5 13h5M9.5 16.5h5" /></>,
  filePlus: <><path d="M6.5 2.5h7l5 5v14h-12v-19z" /><path d="M13.5 2.5v5h5" /><path d="M12 11.5v5M9.5 14h5" /></>,
  arrowRight: <path d="M4 12h15M13.5 6L19.5 12l-6 6" />,
  history: <><path d="M3.5 12a8.5 8.5 0 1 0 2.5-6L3.5 8.5" /><path d="M3.5 3.5v5h5" /><path d="M12 7.5V12l3.2 1.9" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4.5" /></>,
  box: <><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></>,
  commit: <><circle cx="12" cy="12" r="3.4" /><path d="M2.5 12H8.5M15.5 12h6" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c3 3.6 3 14.4 0 18-3-3.6-3-14.4 0-18z" /></>,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7.5a4 4 0 0 1 8 0V11" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.2 6L12 16.7 6.5 19.6l1.2-6L3.2 9.4l6.1-.8L12 3z" />,
  rocket: <><path d="M12 15c-2-1-3-2-4-4 2-6 7-9 12-9 0 5-3 10-8 13z" /><circle cx="14.5" cy="9.5" r="1.8" /><path d="M6 18c-1.5.5-2.5 2-2.5 2s4 .8 5.5-.7" /></>,
  play: <path d="M7 4.5l12 7.5-12 7.5v-15z" />,
  puzzle: <><path d="M9 4a2 2 0 1 1 4 0h5v5a2 2 0 1 1 0 4v5h-5a2 2 0 1 0-4 0H4v-5a2 2 0 1 0 0-4V4h5z" /></>,
  download: <><path d="M12 3v12" /><path d="M7 10.5l5 5 5-5" /><path d="M4 20h16" /></>,
  upload: <><path d="M12 15V3" /><path d="M7 7.5l5-5 5 5" /><path d="M4 20h16" /></>,
  refresh: <><path d="M20.5 12a8.5 8.5 0 1 1-2.5-6L20.5 8.5" /><path d="M20.5 3.5v5h-5" /></>,
  flag: <><path d="M5 21V4" /><path d="M5 4h13l-2.5 4L18 12H5" /></>,
  key: <><circle cx="8" cy="15.5" r="4.5" /><path d="M11.5 12.5L20 4" /><path d="M16.5 7.5l3 3" /></>,
};

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '', style }) {
  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name] || PATHS.box}
    </svg>
  );
}
