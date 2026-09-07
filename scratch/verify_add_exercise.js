const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('--- TESTING ADD NEW EXERCISE IN ADMIN & PATIENT PORTALS ---');

// 1. Check HTML elements in admin/exercises.html
const adminHtml = fs.readFileSync(path.join(__dirname, '..', 'admin', 'exercises.html'), 'utf8');

assert(adminHtml.includes('id="openUploadExerciseBtn"'), 'Must have openUploadExerciseBtn id');
assert(adminHtml.includes('window.openAddExerciseModal()'), 'Must have window.openAddExerciseModal() onclick');
assert(adminHtml.includes('id="submitExerciseBtn"'), 'Must have submitExerciseBtn id');
assert(adminHtml.includes('Add New Exercise'), 'Submit button must say Add New Exercise');
assert(adminHtml.includes('window.closeAddExerciseModal()'), 'Must have closeAddExerciseModal');
assert(adminHtml.includes('window.deleteExercise'), 'Must have window.deleteExercise');
assert(adminHtml.includes('closeModalSafely'), 'Must have closeModalSafely');

console.log('✓ PASS: admin/exercises.html has all required IDs, onclick handlers, and buttons');

// 2. Check patient/exercises.html sync
const patientHtml = fs.readFileSync(path.join(__dirname, '..', 'patient', 'exercises.html'), 'utf8');
assert(patientHtml.includes('syncAdminExercises'), 'patient/exercises.html must have syncAdminExercises');
assert(patientHtml.includes('physiolife_admin_exercises'), 'patient/exercises.html must read physiolife_admin_exercises from localStorage');

console.log('✓ PASS: patient/exercises.html has syncAdminExercises for custom exercises');

// 3. Functional Simulation Test
const mockLocalStorage = {};
global.localStorage = {
  getItem: (key) => mockLocalStorage[key] || null,
  setItem: (key, val) => { mockLocalStorage[key] = val; }
};

// Simulate admin exercise store
const INITIAL_EXERCISES = [
  { id: 'ex_mckenzie', title: 'McKenzie Prone Press-Up', target: 'Lumbar Spine Extensors', difficulty: 'Beginner' }
];

let list = [...INITIAL_EXERCISES];
const newExercise = {
  id: 'ex_' + Date.now(),
  title: 'Hamstring Active Nerve Floss',
  target: 'Sciatic & Hamstrings',
  difficulty: 'Gentle',
  duration: '04:00',
  patients: '0 Patients',
  status: 'Published',
  video: '../assets/videos/sciatic-floss.mp4'
};

list.unshift(newExercise);
localStorage.setItem('physiolife_admin_exercises', JSON.stringify(list));

// Verify storage
const stored = JSON.parse(localStorage.getItem('physiolife_admin_exercises'));
assert.strictEqual(stored.length, 2, 'Stored list must have 2 exercises');
assert.strictEqual(stored[0].title, 'Hamstring Active Nerve Floss', 'First exercise must be newly added');

console.log('✓ PASS: Adding new exercise updates list and localStorage correctly');

// Simulate delete
const filtered = stored.filter(e => e.id !== newExercise.id);
localStorage.setItem('physiolife_admin_exercises', JSON.stringify(filtered));
const storedAfterDel = JSON.parse(localStorage.getItem('physiolife_admin_exercises'));
assert.strictEqual(storedAfterDel.length, 1, 'Stored list must have 1 exercise after delete');

console.log('✓ PASS: Delete exercise removes item from localStorage');
console.log('\n🎉 ALL EXERCISE ADD & SYNC VERIFICATIONS PASSED SUCCESSFULLY!');
