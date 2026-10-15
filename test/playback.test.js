import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { sessions, buildQueue, fadeVolume } from '../sessions.js';

test('cortina timer and delayed ENDED events advance once and keep the first next recording', () => {
  const elements = new Map();
  const element = () => ({ textContent: '', value: '', style: {}, classList: { toggle() {} }, append() {}, replaceChildren() {}, addEventListener() {}, setAttribute() {}, removeAttribute() {}, dataset: {} });
  let tick, events, video, state = -1, position = 0;
  const loaded = [];
  const player = { setVolume() {}, loadVideoById(spec) { video = spec.videoId; state = 3; position = 0; loaded.push(spec); }, getVideoUrl: () => `https://youtube.com/watch?v=${video}`, getPlayerState: () => state, getCurrentTime: () => position, getDuration: () => 180, pauseVideo() {}, playVideo() {} };
  const context = vm.createContext({ sessions, buildQueue, fadeVolume, URL, URLSearchParams, localStorage: { getItem: () => null }, location: { search: '', origin: 'https://example.test' }, history: {}, document: { getElementById(id) { if (!elements.has(id)) elements.set(id, element()); return elements.get(id); }, createElement: element, querySelectorAll: () => [], head: element() }, window: {}, setInterval(fn) { tick = fn; }, YT: { PlayerState: { PLAYING: 1, ENDED: 0, PAUSED: 2, BUFFERING: 3 }, Player: function (id, options) { events = options.events; return player; } } });
  const source = readFileSync(new URL('../app.js', import.meta.url), 'utf8').replace(/^import .*\n/, '');
  vm.runInContext(source, context); context.window.onYouTubeIframeAPIReady(); events.onReady();
  const queue = buildQueue('troilo'), cortinaIndex = queue.findIndex(t => t.kind === 'cortina');
  vm.runInContext(`select(${cortinaIndex})`, context);
  state = 1; events.onStateChange({ data: 1 }); position = queue[cortinaIndex].end; tick();
  assert.equal(loaded.at(-1).videoId, queue[cortinaIndex + 1].id);
  assert.equal(queue[cortinaIndex + 1].position, 1);
  const count = loaded.length;
  events.onStateChange({ data: 0 }); tick();
  assert.equal(loaded.length, count);
  state = 1; events.onStateChange({ data: 1 }); events.onStateChange({ data: 0 });
  assert.equal(loaded.length, count, 'stale ENDED while new recording is playing is ignored');
  state = 0; events.onStateChange({ data: 0 });
  assert.equal(loaded.at(-1).videoId, queue[cortinaIndex + 2].id);
  events.onStateChange({ data: 0 }); assert.equal(loaded.length, count + 1);
});
