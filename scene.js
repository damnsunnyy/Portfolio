import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const canvas = document.querySelector('#scene');
const host = canvas.parentElement;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
camera.position.set(0, 0, 7.8);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.16;

const sculpture = new THREE.Group();
scene.add(sculpture);

const body = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1.28, .39, 280, 36, 2, 3),
  new THREE.MeshPhysicalMaterial({
    color: 0xb58de2,
    metalness: .83,
    roughness: .19,
    clearcoat: 1,
    clearcoatRoughness: .12,
    iridescence: .82,
    iridescenceIOR: 1.6,
    iridescenceThicknessRange: [120, 520],
  }),
);
sculpture.add(body);

const rimMaterial = new THREE.MeshBasicMaterial({ color: 0xd8c0ff, transparent: true, opacity: .27 });
const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.06, .008, 8, 220), rimMaterial);
ringA.rotation.set(1.04, .2, -.26);
sculpture.add(ringA);
const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.34, .006, 8, 220), new THREE.MeshBasicMaterial({ color: 0x9170ba, transparent: true, opacity: .22 }));
ringB.rotation.set(.28, -.54, .66);
sculpture.add(ringB);

scene.add(new THREE.HemisphereLight(0xe9ddff, 0x150e20, 2.05));
const key = new THREE.DirectionalLight(0xfff9ff, 4.2);
key.position.set(-3, 4, 5); scene.add(key);
const violet = new THREE.PointLight(0x9b5eff, 48, 12, 2);
violet.position.set(3, -1.6, 2.2); scene.add(violet);
const cool = new THREE.PointLight(0xb8d7ff, 22, 12, 2);
cool.position.set(-3, -2, -2); scene.add(cool);

// Deep-space particles add scale and parallax without overwhelming the object.
const particleCount = innerWidth < 600 ? 240 : 480;
const particlePositions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  const radius = 2.7 + Math.random() * 5.4;
  const theta = Math.random() * Math.PI * 2;
  const y = (Math.random() - .5) * 7;
  particlePositions[i * 3] = Math.cos(theta) * radius;
  particlePositions[i * 3 + 1] = y;
  particlePositions[i * 3 + 2] = Math.sin(theta) * radius - 1.5;
}
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xc9b2e9, size: .018, transparent: true, opacity: .58, sizeAttenuation: true }));
scene.add(particles);

let pointerX = 0, pointerY = 0, aimX = 0, aimY = 0;
let dragging = false, lastPointerX = 0, lastPointerY = 0, manualX = 0, manualY = 0, motionPaused = false;
host.addEventListener('pointermove', (event) => {
  const rect = host.getBoundingClientRect();
  aimX = ((event.clientX - rect.left) / rect.width - .5) * .7;
  aimY = ((event.clientY - rect.top) / rect.height - .5) * .46;
  if (dragging) {
    manualX += (event.clientX - lastPointerX) * .008;
    manualY += (event.clientY - lastPointerY) * .008;
    lastPointerX = event.clientX; lastPointerY = event.clientY;
  }
}, { passive: true });
host.addEventListener('pointerleave', () => { aimX = 0; aimY = 0; }, { passive: true });
host.addEventListener('pointerdown', (event) => { dragging = true; lastPointerX = event.clientX; lastPointerY = event.clientY; host.setPointerCapture?.(event.pointerId); });
host.addEventListener('pointerup', () => { dragging = false; });
host.addEventListener('pointercancel', () => { dragging = false; });
window.addEventListener('scene-motion', (event) => { motionPaused = Boolean(event.detail?.paused); });

function resize() {
  const rect = host.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.position.z = innerWidth < 600 ? 8.7 : 7.8;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(host);
resize();

const clock = new THREE.Clock();
let elapsed = 0;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
function animate() {
  requestAnimationFrame(animate);
  if (document.hidden) return;
  const delta = Math.min(clock.getDelta(), .05);
  if (!motionPaused && !reducedMotion) elapsed += delta;
  const t = elapsed;
  pointerX += (aimX - pointerX) * .035;
  pointerY += (aimY - pointerY) * .035;
  sculpture.rotation.y = t * .19 + pointerX + manualX;
  sculpture.rotation.x = Math.sin(t * .22) * .11 + pointerY + manualY;
  sculpture.rotation.z = Math.sin(t * .16) * .075;
  particles.rotation.y = -t * .012;
  renderer.render(scene, camera);
}
animate();
window.dispatchEvent(new Event('scene-ready'));
