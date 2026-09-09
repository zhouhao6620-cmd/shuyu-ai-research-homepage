const iconPaths = {
  graduation: '<path d="m2 9 10-5 10 5-10 5-10-5Z"/><path d="M6 11v5c3 3 9 3 12 0v-5M22 9v7"/>',
  stethoscope: '<path d="M5 3v6a5 5 0 0 0 10 0V3M3 3h4M13 3h4M10 14v2a5 5 0 0 0 10 0v-3"/><circle cx="20" cy="10.5" r="2.5"/>',
  team: '<circle cx="9" cy="7" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 4a3 3 0 0 1 0 6M18 13a5 5 0 0 1 3 5v2"/>',
  building: '<path d="M5 21V4h14v17M2 21h20M9 21v-5h6v5M9 7h6M12 5v4M8 12h2M14 12h2"/>',
  flask: '<path d="M9 3h6M10 3v6L4 19a1.4 1.4 0 0 0 1.2 2h13.6a1.4 1.4 0 0 0 1.2-2L14 9V3M8 13h8"/>',
  monitor: '<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8M12 16v5M6 10h3l2-4 3 7 2-3h2"/>',

  chatPlus: '<path d="M7 18.5 3.5 21v-5A8 8 0 1 1 7 18.5Z"/><path d="M12 7v6M9 10h6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4 4"/>',
  bookOpen: '<path d="M4 5.5c3.2-.8 5.7-.2 8 1.8v11c-2.3-2-4.8-2.6-8-1.8v-11ZM20 5.5c-3.2-.8-5.7-.2-8 1.8v11c2.3-2 4.8-2.6 8-1.8v-11Z"/>',
  edit: '<path d="m4 20 4.2-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z"/><path d="m13.8 7.4 3 3M5.2 15.8l3 3"/>',
  project: '<path d="M3.5 6.5h6l2 2h9v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-12Z"/><path d="M3.5 10.5h17"/>',
  tasks: '<path d="M4 12h3l2.2-5 4.2 10 2.1-5H20"/>',
  history: '<path d="M4 5v5h5"/><path d="M5 10a8 8 0 1 1 2.2 7.5"/><path d="M12 8v4l3 2"/>',
  user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  upload: '<path d="M12 16V4M7.5 8.5 12 4l4.5 4.5"/><path d="M5 14v5h14v-5"/>',
  download: '<path d="M12 4v12M7.5 11.5 12 16l4.5-4.5"/><path d="M5 15v4h14v-4"/>',
  enhance: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
  send: '<path d="M12 19V5M6.5 10.5 12 5l5.5 5.5"/>',
  chevronDown: '<path d="m7 9 5 5 5-5"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  file: '<path d="M6 3.5h7l5 5v12H6v-17Z"/><path d="M13 3.5v5h5M9 13h6M9 17h6"/>',
  check: '<path d="m5 12.5 4.2 4.2L19 7"/>',
  undo: '<path d="M8 7H4v-4"/><path d="M4.5 7A8 8 0 1 1 5 16.8"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  blueprint: '<path d="M4 5h16v14H4z"/><path d="M8 5v4H4M16 19v-4h4M8 13h8M12 9v8"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  figure: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="m8.4 11 7.2-4M8.4 13l7.2 4"/>',
  review: '<path d="M12 3 5 6v5c0 4.5 2.6 7.8 7 10 4.4-2.2 7-5.5 7-10V6l-7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"/>',
  more: '<circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/>',
  arrowRight: '<path d="M5 12h14M14 7l5 5-5 5"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v7H4V6h7"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/>',
  document: '<path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4M9 12h6M9 16h6"/>'
};

export function icon(name, size = 24, className = "") {
  const paths = iconPaths[name] ?? iconPaths.info;
  return `<svg class="icon ${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
}
