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
  camera.position.x = 0;
  camera.position.z = 100;
  camera.position.y = 20;
  camera.position.x = xVal;

  controls.target = new THREE.Vector3(xVal, 0, 0);
};



let render = function(){
  renderer.render(scene, camera);
};

let drawScene = function(){
  temColumn.init();

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