const config = {
  runscope: { owner: 'damnsunnyy', repo: 'RunScope', label: 'RUNSCOPE' },
  portfolio: { owner: 'damnsunnyy', repo: 'Portfolio', label: 'PORTFOLIO' },
  streambox: { owner: 'damnsunnyy', repo: 'react-streaming-catalog', label: 'STREAMBOX' },
};

const stage = document.querySelector('#stage');
const world = document.querySelector('#world');
const frameReadout = document.querySelector('#frame-readout');
const scanButton = document.querySelector('#scan-button');
const apiNote = document.querySelector('#api-note');
let pitch = 61;
let yaw = -25;
let frame = 0;
let pointer = null;

function setPose(nextPitch = pitch, nextYaw = yaw) {
  pitch = Math.max(47, Math.min(75, nextPitch));
  yaw = ((nextYaw + 180) % 360 + 360) % 360 - 180;
  world.style.setProperty('--rx', `${pitch}deg`);
  world.style.setProperty('--ry', `${yaw}deg`);
  frame += 1;
  frameReadout.textContent = String(frame).padStart(3, '0');
}

function turn(direction) {
  setPose(pitch + (direction > 0 ? -2 : 2), yaw + direction * 13);
}

stage.addEventListener('pointerdown', (event) => {
  if (event.target.closest('a,button')) return;
  pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, yaw, pitch };
  stage.setPointerCapture(event.pointerId);
});
stage.addEventListener('pointermove', (event) => {
  if (!pointer || pointer.id !== event.pointerId) return;
  const dx = event.clientX - pointer.x;
  const dy = event.clientY - pointer.y;
  setPose(pointer.pitch + dy * 0.12, pointer.yaw + dx * 0.18);
});
stage.addEventListener('pointerup', (event) => {
  if (pointer?.id === event.pointerId) pointer = null;
});
stage.addEventListener('pointercancel', () => { pointer = null; });
stage.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); turn(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); turn(1); }
  if (event.key === 'Home') { event.preventDefault(); resetPose(); }
});
document.querySelectorAll('[data-turn]').forEach((button) => {
  button.addEventListener('click', () => turn(Number(button.dataset.turn)));
});
function resetPose() { setPose(61, -25); }
document.querySelector('#reset-view').addEventListener('click', resetPose);

function relativeTime(value) {
  const elapsed = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (elapsed < 60) return `${elapsed}s ago`;
  if (elapsed < 3600) return `${Math.floor(elapsed / 60)}m ago`;
  if (elapsed < 86400) return `${Math.floor(elapsed / 3600)}h ago`;
  return `${Math.floor(elapsed / 86400)}d ago`;
}

function outcome(run) {
  if (run.status !== 'completed') {
    if (run.status === 'in_progress') return ['pending', 'RUNNING'];
    return ['pending', (run.status || 'QUEUED').replaceAll('_', ' ').toUpperCase()];
  }
  return run.conclusion === 'success' ? ['success', 'PASSED'] : ['failure', (run.conclusion || 'STOPPED').replaceAll('_', ' ').toUpperCase()];
}

async function scanWorkflows() {
  scanButton.disabled = true;
  scanButton.querySelector('span').textContent = '…';
  apiNote.textContent = 'ASKING GITHUB FOR THE LATEST PUBLIC WORKFLOW RUNS…';
  const items = Object.entries(config);
  const responses = await Promise.allSettled(items.map(async ([key, item]) => {
    const url = `https://api.github.com/repos/${item.owner}/${item.repo}/actions/runs?per_page=1`;
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store' });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const data = await response.json();
    const run = data.workflow_runs?.[0];
    if (!run) throw new Error('No public workflow runs');
    return { key, item, run };
  }));

  let received = 0;
  for (const result of responses) {
    if (result.status === 'rejected') {
      const [key, item] = items[responses.indexOf(result)];
      showUnavailable(key, item, result.reason);
      continue;
    }
    received += 1;
    showRun(result.value);
  }
  apiNote.textContent = received
    ? `LIVE PUBLIC DATA · UPDATED ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · CLICK A ROW FOR THE RUN`
    : 'PUBLIC WORKFLOW SIGNAL UNAVAILABLE · TRY AGAIN IN A MOMENT';
  scanButton.disabled = false;
  scanButton.querySelector('span').textContent = '↻';
}

function showRun({ key, item, run }) {
  const row = document.querySelector(`[data-run="${key}"]`);
  const [state, label] = outcome(run);
  row.href = run.html_url;
  row.target = '_blank';
  row.rel = 'noreferrer';
  row.setAttribute('aria-label', `${item.label}: ${label}, ${run.name || run.display_title}, ${relativeTime(run.updated_at)}. Open this workflow run on GitHub.`);
  row.querySelector('.run-indicator').className = `run-indicator ${state}`;
  row.querySelector('small').textContent = `${run.name || run.display_title || 'Workflow'} · ${relativeTime(run.updated_at)}`;
  row.querySelector('.run-state').textContent = label;
  const tileSignal = document.querySelector(`[data-signal="${key}"]`);
  if (tileSignal) {
    tileSignal.className = `signal signal-${state}`;
    tileSignal.textContent = label;
  }
}

function showUnavailable(key, item, error) {
  const row = document.querySelector(`[data-run="${key}"]`);
  row.removeAttribute('href');
  row.removeAttribute('target');
  row.removeAttribute('rel');
  row.querySelector('.run-indicator').className = 'run-indicator idle';
  row.querySelector('small').textContent = error instanceof Error && error.message.includes('No public') ? 'No public workflow run found' : 'Public API signal unavailable';
  row.querySelector('.run-state').textContent = 'NO DATA';
  const tileSignal = document.querySelector(`[data-signal="${key}"]`);
  if (tileSignal) {
    tileSignal.className = 'signal signal-wait';
    tileSignal.textContent = 'NO DATA';
  }
  row.setAttribute('aria-label', `${item.label}: no public workflow signal is available.`);
}

scanButton.addEventListener('click', scanWorkflows);
scanWorkflows();
