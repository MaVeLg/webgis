import Split from 'split.js';

export function useSplit() {
  let instance = null;

  function init(selectors, opts = {}, onDragCb = null) {
    instance = Split(selectors, {
      gutterSize: 8,
      snapOffset: 0,
      ...opts,
      onDrag: () => { if (onDragCb) onDragCb(); },
    });
    return instance;
  }

  function setSizes(sizes) { instance?.setSizes(sizes); }
  function getSizes() { return instance?.getSizes?.() ?? []; }
  function collapse(i) { instance?.collapse?.(i); }

  return { init, setSizes, getSizes, collapse };
}

