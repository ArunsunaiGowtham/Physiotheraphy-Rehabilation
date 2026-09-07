/**
 * Interactive DOM Simulation Test for patient/exercises.html
 * Validates dynamic click events, video source loading, modal event handling,
 * and completion checkbox toggles.
 * Strictly Node.js - NO Python
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'patient', 'exercises.html');
const html = fs.readFileSync(htmlPath, 'utf8');

console.log('========================================================');
console.log('Testing Interactive DOM Simulation for Home Exercises');
console.log('========================================================\n');

// Mock a lightweight browser DOM environment
class MockElement {
  constructor(tag, id = '') {
    this.tagName = tag.toUpperCase();
    this.id = id;
    this.className = '';
    this.classList = {
      _classes: new Set(),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      contains: (c) => this.classList._classes.has(c),
      toggle: (c) => {
        if (this.classList._classes.has(c)) this.classList._classes.delete(c);
        else this.classList._classes.add(c);
      }
    };
    this.attributes = {};
    this.style = {};
    this.textContent = '';
    this.src = '';
    this.checked = false;
    this.children = [];
    this.parentElement = null;
    this.listeners = {};
  }

  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k] || null; }
  removeAttribute(k) { delete this.attributes[k]; }

  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }

  dispatchEvent(evt) {
    if (this.listeners[evt]) {
      this.listeners[evt].forEach(fn => fn.call(this, { target: this }));
    }
  }

  closest(selector) {
    let curr = this;
    while (curr) {
      if (selector.startsWith('.') && curr.className.includes(selector.slice(1))) {
        return curr;
      }
      curr = curr.parentElement;
    }
    return null;
  }

  querySelector(sel) {
    for (let ch of this.children) {
      if (sel.startsWith('.') && ch.className.includes(sel.slice(1))) return ch;
      if (ch.children) {
        const found = ch.querySelector(sel);
        if (found) return found;
      }
    }
    return null;
  }

  querySelectorAll(sel) {
    let res = [];
    for (let ch of this.children) {
      if (sel.startsWith('.') && ch.className.includes(sel.slice(1))) res.push(ch);
      if (ch.children) res = res.concat(ch.querySelectorAll(sel));
    }
    return res;
  }

  load() { this._loaded = true; }
  pause() { this._paused = true; this._playing = false; }
  play() {
    this._playing = true;
    this._paused = false;
    return Promise.resolve();
  }
}

// Build mock document
const doc = {
  elements: {},
  listeners: {},
  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  },
  trigger(evt) {
    if (this.listeners[evt]) {
      this.listeners[evt].forEach(fn => fn());
    }
  },
  getElementById(id) { return this.elements[id] || null; },
  querySelectorAll(sel) {
    let res = [];
    Object.values(this.elements).forEach(el => {
      if (sel.startsWith('.') && el.className.includes(sel.slice(1))) {
        res.push(el);
      }
    });
    return res;
  }
};

// Setup elements
const videoModal = new MockElement('div', 'videoPlayerModal');
const videoPlayer = new MockElement('video', 'exerciseVideoPlayer');
const fallbackEl = new MockElement('div', 'videoErrorFallback');
const videoTitle = new MockElement('h5', 'videoTitle');
const videoNotes = new MockElement('p', 'videoNotes');
const videoBadge = new MockElement('span', 'videoBadge');
const counterBadge = new MockElement('span', 'dailyRoutineCounter');

fallbackEl.classList.add('d-none');

doc.elements['videoPlayerModal'] = videoModal;
doc.elements['exerciseVideoPlayer'] = videoPlayer;
doc.elements['videoErrorFallback'] = fallbackEl;
doc.elements['videoTitle'] = videoTitle;
doc.elements['videoNotes'] = videoNotes;
doc.elements['videoBadge'] = videoBadge;
doc.elements['dailyRoutineCounter'] = counterBadge;

// Create 4 mock exercise cards with checkboxes
const cards = [
  { id: 'checkEx1', key: 'mckenzie', checked: true, title: 'McKenzie Prone Press-Up', file: '../assets/videos/mckenzie-pressup.mp4' },
  { id: 'checkEx2', key: 'floss', checked: true, title: 'Seated Sciatic Nerve Floss', file: '../assets/videos/sciatic-floss.mp4' },
  { id: 'checkEx3', key: 'bridge', checked: false, title: 'Supine Pelvic Glute Bridge', file: '../assets/videos/glute-bridge.mp4' },
  { id: 'checkEx4', key: 'birddog', checked: false, title: 'Quadruped Bird-Dog', file: '../assets/videos/quadruped-birddog.mp4' }
];

cards.forEach((c, idx) => {
  const card = new MockElement('div', `exerciseCard${idx + 1}`);
  card.className = 'exercise-item-card';
  if (c.checked) card.classList.add('completed-exercise');

  const cb = new MockElement('input', c.id);
  cb.className = 'exercise-check';
  cb.checked = c.checked;
  cb.parentElement = card;

  const lbl = new MockElement('label');
  lbl.className = 'form-check-label';
  lbl.textContent = c.checked ? 'Completed' : 'Mark Done';
  lbl.parentElement = card;

  card.children.push(cb, lbl);
  doc.elements[c.id] = cb;
  doc.elements[`exerciseCard${idx + 1}`] = card;
});

// Extract JavaScript logic from HTML
const scriptMatch = html.match(/const EXERCISE_DATA = \{[\s\S]*?<\/script>/);
if (!scriptMatch) {
  console.error('❌ Could not extract script from patient/exercises.html');
  process.exit(1);
}

// Evaluate script inside mock sandbox
const sandbox = {
  document: doc,
  bootstrap: {
    Modal: {
      getOrCreateInstance: (el) => ({
        show: () => { el._shown = true; },
        hide: () => { el._shown = false; el.dispatchEvent('hidden.bs.modal'); }
      })
    }
  },
  console: console
};

const scriptCode = scriptMatch[0].replace('</script>', '');
const fn = new Function('document', 'bootstrap', 'console', `
  ${scriptCode}
  return { EXERCISE_DATA, openExerciseVideo, retryExerciseVideo };
`);

const { EXERCISE_DATA, openExerciseVideo } = fn(sandbox.document, sandbox.bootstrap, sandbox.console);
sandbox.document.trigger('DOMContentLoaded');

let testsPassed = 0;
let testsTotal = 0;
function test(desc, cond) {
  testsTotal++;
  if (cond) {
    console.log(`✓ PASS: ${desc}`);
    testsPassed++;
  } else {
    console.error(`❌ FAIL: ${desc}`);
  }
}

// Test 1: Video data mapping exists and is non-empty
test('EXERCISE_DATA has at least 4 registered exercises', Object.keys(EXERCISE_DATA).length >= 4);

// Test 2: McKenzie Video Playback
openExerciseVideo('mckenzie');
test('McKenzie Prone Press-Up video source loads', videoPlayer.src === '../assets/videos/mckenzie-pressup.mp4');
test('McKenzie Prone Press-Up title loads in modal', videoTitle.textContent === 'McKenzie Prone Press-Up');
test('McKenzie Prone Press-Up modal is shown', videoModal._shown === true);
test('McKenzie Prone Press-Up video is playing', videoPlayer._playing === true);

// Test 3: Close modal stops video
videoModal.dispatchEvent('hidden.bs.modal');
test('Modal close pauses video', videoPlayer._paused === true);
test('Modal close clears video src', videoPlayer.src === '');

// Test 4: Seated Sciatic Nerve Floss Video Playback
openExerciseVideo('floss');
test('Seated Sciatic Nerve Floss video source loads', videoPlayer.src === '../assets/videos/sciatic-floss.mp4');
test('Seated Sciatic Nerve Floss title loads in modal', videoTitle.textContent === 'Seated Sciatic Nerve Floss');
videoModal.dispatchEvent('hidden.bs.modal');

// Test 5: Supine Pelvic Glute Bridge Video Playback
openExerciseVideo('bridge');
test('Supine Pelvic Glute Bridge video source loads', videoPlayer.src === '../assets/videos/glute-bridge.mp4');
test('Supine Pelvic Glute Bridge title loads in modal', videoTitle.textContent === 'Supine Pelvic Glute Bridge');
videoModal.dispatchEvent('hidden.bs.modal');

// Test 6: Quadruped Bird-Dog Video Playback
openExerciseVideo('birddog');
test('Quadruped Bird-Dog video source loads', videoPlayer.src === '../assets/videos/quadruped-birddog.mp4');
test('Quadruped Bird-Dog title loads in modal', videoTitle.textContent === 'Quadruped Bird-Dog');
videoModal.dispatchEvent('hidden.bs.modal');

// Test 7: Fallback on video error
openExerciseVideo('mckenzie');
videoPlayer.dispatchEvent('error');
test('On video error, fallback message is displayed', !fallbackEl.classList.contains('d-none'));
test('On video error, video element is hidden', videoPlayer.style.display === 'none');
videoModal.dispatchEvent('hidden.bs.modal');
test('Modal close resets fallback element', fallbackEl.classList.contains('d-none'));

// Test 8: Completion Checkbox Functionality
const cb3 = doc.getElementById('checkEx3');
const card3 = doc.getElementById('exerciseCard3');
test('Initial state of Card 3 is unchecked', cb3.checked === false);
test('Initial state of Card 3 has no completed-exercise class', !card3.classList.contains('completed-exercise'));

// Toggle Card 3 to checked
cb3.checked = true;
cb3.dispatchEvent('change');

test('Toggling Card 3 checkbox adds completed-exercise class', card3.classList.contains('completed-exercise'));
test('Card 3 label changes to "Completed"', card3.querySelector('.form-check-label').textContent === 'Completed');
test('Routine counter updates to "3 of 4 Completed"', counterBadge.textContent === 'Daily Routine: 3 of 4 Completed');

// Toggle Card 3 back to unchecked
cb3.checked = false;
cb3.dispatchEvent('change');
test('Unchecking Card 3 removes completed-exercise class', !card3.classList.contains('completed-exercise'));
test('Card 3 label reverts to "Mark Done"', card3.querySelector('.form-check-label').textContent === 'Mark Done');
test('Routine counter updates to "2 of 4 Completed"', counterBadge.textContent === 'Daily Routine: 2 of 4 Completed');

console.log('\n========================================================');
console.log(`Simulation complete: ${testsPassed} of ${testsTotal} tests passed!`);
console.log('========================================================');

process.exit(testsPassed === testsTotal ? 0 : 1);
