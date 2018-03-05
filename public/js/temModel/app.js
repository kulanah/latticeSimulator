let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1500);
let controls;
let renderer;

let init = function(){
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = 'threeCanvas';
  document.body.appendChild(renderer.domElement);

  controls = new THREE.TrackballControls(camera, document.getElementById('threeCanvas'));
  controls.addEventListener('change', render);


  let xVal = -3;
  // camera.positon.set(0,0,0);
  // camera.positon.set(new THREE.Vector3(0,0,0));
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 20;
  camera.position.x = xVal;

  controls.target = new THREE.Vector3(xVal, 0, 0);
  initLights();

};


function initLights() {
  var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(122, 100%, 100%)'), 1);
  keyLight.position.set(20, 0, 5);
  
  var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(285, 100%, 100%)'), 1);
  fillLight.position.set(-10, 0, 5);
  
  var backLight = new THREE.DirectionalLight(new THREE.Color('hsl(58, 100%, 100%)'), 1);
  backLight.position.set(10, 0, -5).normalize();
  
  var topLight = new THREE.DirectionalLight(new THREE.Color('hsl(338, 100%, 100%)'), 1);
  backLight.position.set(0, 10, 0).normalize();

  scene.add(keyLight);
  scene.add(fillLight);
  // scene.add(backLight);
  // scene.add(topLight);
}

let render = function(){
  renderer.render(scene, camera);
};

let drawScene = function(){
  temColumn.init();
  render();
};

let animate = function(){
  requestAnimationFrame(animate);
  controls.update();
};


let temColumn = new column();


let draggables = [];

for (let i = 0; i < draggables.length; ++i){
  $('#' + draggables[i]).draggable({
    addClasses: true,
    // cancel: 'map, iframe',
    // iframeFix: true,
    cursor: 'move'
  });
}

$('.hidden').hide();


init();
animate();
drawScene();