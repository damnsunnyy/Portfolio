import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

const canvas = document.querySelector('#scene');
const host = canvas.parentElement;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, .1, 100);
camera.position.set(0, 0, 8.6);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const keyboard = new THREE.Group();
keyboard.rotation.x = -.38;
keyboard.rotation.z = -.12;
scene.add(keyboard);
const baseMat = new THREE.MeshPhysicalMaterial({ color: 0x161d2b, metalness: .65, roughness: .28, clearcoat: .7 });
const base = new THREE.Mesh(new THREE.BoxGeometry(5.6, .25, 2.3), baseMat);
base.position.y = -.12;
keyboard.add(base);
const trim = new THREE.Mesh(new THREE.BoxGeometry(5.7, .035, 2.38), new THREE.MeshStandardMaterial({ color: 0x70819b, metalness: .8, roughness: .23 }));
trim.position.y = -.26;
keyboard.add(trim);

const colors = [0xffa15e, 0x69d9f5, 0xb593f9, 0x9cdb79, 0xf07879, 0x6f9df5, 0xf2d36e];
const techs = [
  ['Py','python','Python · machine learning'],['PT','pytorch','PyTorch · computer vision'],['JS','javascript','JavaScript · interactive apps'],['Re','react','React · streaming and collaboration'],['Dj','django','Django · full-stack web'],['J','java','Java · resume matching'],['Sp','spring','Spring · backend services'],
  ['AI','python','Python · applied AI'],['<>','javascript','JavaScript · the web'],['DB','mongodb','MongoDB · document storage'],['SQL','sqlite','SQLite · lightweight data'],['Ex','express','Express · web APIs'],['↔','socketio','Socket.IO · real-time sync'],['ND','node','Node.js · server-side JavaScript'],
  ['HT','javascript','Web technologies · front end'],['CSS','javascript','Web technologies · styling'],['ML','pytorch','PyTorch · model training'],['API','django','Django · REST APIs'],['DOC','socketio','Socket.IO · DocsFlow collaboration'],['CV','pytorch','Computer vision · 120 breeds'],['ATS','java','Java · applicant tracking']
];
const keyGeometry = new THREE.BoxGeometry(.65, .19, .62);
const labelGeometry = new THREE.PlaneGeometry(.48, .32);
const keyMeshes = [];
const keyRows = [7,7,7];
let item = 0;
for (let row = 0; row < keyRows.length; row++) {
  for (let col = 0; col < keyRows[row]; col++) {
    const [label, tech, title] = techs[item];
    const material = new THREE.MeshPhysicalMaterial({ color: colors[(item * 3 + row) % colors.length], metalness: .28, roughness: .24, clearcoat: .82, clearcoatRoughness: .18, emissive: 0x000000 });
    const key = new THREE.Mesh(keyGeometry, material);
    key.position.set((col - 3) * .76, .11, (row - 1) * .72);
    key.userData = { label, tech, title, original: key.scale.clone(), material };
    keyboard.add(key);
    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 192; textureCanvas.height = 128;
    const ctx = textureCanvas.getContext('2d');
    ctx.clearRect(0, 0, 192, 128);
    ctx.fillStyle = 'rgba(8,12,20,.78)';
    ctx.beginPath(); ctx.roundRect(10, 18, 172, 92, 18); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = `700 ${label.length > 3 ? 35 : 48}px Arial`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, 96, 64);
    const texture = new THREE.CanvasTexture(textureCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const mark = new THREE.Mesh(labelGeometry, new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false }));
    mark.position.set(key.position.x, .211, key.position.z);
    mark.rotation.x = -Math.PI / 2;
    keyboard.add(mark);
    keyMeshes.push(key);
    item++;
  }
}
const spaceBar = new THREE.Mesh(new THREE.BoxGeometry(2.4,.17,.38), new THREE.MeshPhysicalMaterial({ color: 0x394153, metalness:.35, roughness:.32, clearcoat:.7 }));
spaceBar.position.set(0,.1,1.23); keyboard.add(spaceBar);

scene.add(new THREE.HemisphereLight(0xe6efff, 0x14101d, 2));
const keyLight = new THREE.DirectionalLight(0xffffff, 4.5); keyLight.position.set(-3, 5, 5); scene.add(keyLight);
const lime = new THREE.PointLight(0xc8f46b, 34, 12, 2); lime.position.set(3, -1, 2); scene.add(lime);
const blue = new THREE.PointLight(0x62bfff, 25, 12, 2); blue.position.set(-3, 1, -2); scene.add(blue);
const particleCount = innerWidth < 600 ? 180 : 360;
const positions = new Float32Array(particleCount * 3);
for (let i=0;i<particleCount;i++) { const radius=3.2+Math.random()*5; const angle=Math.random()*Math.PI*2; positions[i*3]=Math.cos(angle)*radius; positions[i*3+1]=(Math.random()-.5)*6; positions[i*3+2]=Math.sin(angle)*radius-1.4; }
const particleGeometry = new THREE.BufferGeometry(); particleGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
const particles = new THREE.Points(particleGeometry,new THREE.PointsMaterial({color:0xcbd6eb,size:.017,transparent:true,opacity:.55,sizeAttenuation:true})); scene.add(particles);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let pointerX=0,pointerY=0,aimX=0,aimY=0,dragging=false,lastX=0,lastY=0,manualX=0,manualY=0,motionPaused=false,downX=0,downY=0;
let hovered = null;
function hitKey(event) {
  const rect=canvas.getBoundingClientRect(); pointer.x=((event.clientX-rect.left)/rect.width)*2-1; pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;
  raycaster.setFromCamera(pointer,camera); return raycaster.intersectObjects(keyMeshes,false)[0]?.object || null;
}
function showKey(key) {
  if (hovered && hovered !== key) { hovered.scale.copy(hovered.userData.original); hovered.material.emissive.setHex(0x000000); }
  hovered=key;
  if (key) { key.scale.set(1.08,1.2,1.08); key.material.emissive.setHex(0x343434); host.classList.add('key-active'); document.querySelector('#keyboard-toast').textContent=key.userData.title.toUpperCase(); }
  else { host.classList.remove('key-active'); }
}
host.addEventListener('pointermove',event=>{
  const rect=host.getBoundingClientRect(); aimX=((event.clientX-rect.left)/rect.width-.5)*.65; aimY=((event.clientY-rect.top)/rect.height-.5)*.4;
  if (dragging) { manualX+=(event.clientX-lastX)*.007; manualY+=(event.clientY-lastY)*.007; lastX=event.clientX; lastY=event.clientY; }
  else { const key=hitKey(event); showKey(key); canvas.style.cursor=key?'pointer':'grab'; }
},{passive:true});
host.addEventListener('pointerleave',()=>{aimX=0;aimY=0;showKey(null);},{passive:true});
host.addEventListener('pointerdown',event=>{dragging=true;lastX=event.clientX;lastY=event.clientY;downX=event.clientX;downY=event.clientY;host.setPointerCapture?.(event.pointerId);});
host.addEventListener('pointerup',event=>{dragging=false;if(Math.hypot(event.clientX-downX,event.clientY-downY)<8){const key=hitKey(event);if(key){showKey(key);window.dispatchEvent(new CustomEvent('portfolio-filter-tech',{detail:{tech:key.userData.tech}}));}}});
host.addEventListener('pointercancel',()=>{dragging=false;});
window.addEventListener('scene-motion',event=>{motionPaused=Boolean(event.detail?.paused);});
function resize(){const rect=host.getBoundingClientRect();renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/rect.height;camera.position.z=innerWidth<600?9.8:8.6;camera.updateProjectionMatrix();keyboard.scale.setScalar(innerWidth<600?.82:1);}
new ResizeObserver(resize).observe(host); resize();
const clock=new THREE.Clock();let elapsed=0;const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
function animate(){requestAnimationFrame(animate);if(document.hidden)return;const delta=Math.min(clock.getDelta(),.05);if(!motionPaused&&!reducedMotion)elapsed+=delta;const t=elapsed;pointerX+=(aimX-pointerX)*.035;pointerY+=(aimY-pointerY)*.035;keyboard.rotation.y=t*.13+pointerX+manualX;keyboard.rotation.x=-.38+Math.sin(t*.2)*.045+pointerY+manualY;keyboard.position.y=Math.sin(t*.65)*.08;particles.rotation.y=-t*.01;renderer.render(scene,camera);}
animate();window.dispatchEvent(new Event('scene-ready'));
