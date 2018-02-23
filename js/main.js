
let scene, renderer, controls;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

let camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 100);

function init() {
  scene = new THREE.Scene();

  initMesh();
  initCamera();
  initLights();
  initRenderer();

  renderer.domElement.id = 'threeCanvas';

  document.body.appendChild(renderer.domElement);


  camera.position.x = 0;
  camera.position.y = 3.5;
  camera.position.z = 5;

  controls = new THREE.TrackballControls(camera, document.getElementById('threeCanvas'));
  controls.addEventListener('change', render);

  render();
  animate();
}

function initCamera() {
  camera.position.set(0, 3.5, 5);
  camera.lookAt(scene.position);
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
}

function initLights() {
  var light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
}

var mesh = null;
function initMesh() {
  var loader = new THREE.JSONLoader();
  loader.load('http://127.0.0.1:8080/json/tecnaiv2.json', function(geometry, materials) {
    mesh = new THREE.Mesh(geometry, materials);
    mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
    mesh.translation = geometry.center();
    scene.add(mesh);
  });
}

let render = function() {
  renderer.render(scene, camera);
};

let animate = function(){
  requestAnimationFrame(animate);
  controls.update();

};

init();
render();
animate();
// mesh.rotation.x =  50;