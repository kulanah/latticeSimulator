let scene = new THREE.Scene();
let angleX = 0.1;
let angleY = 0.1;
let angleZ = 0;
let camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1500);
let controls;
let renderer;

let init = function(){
  camera.position.set(0,0,0);
  // camera.lookAt(new THREE.Vector3(0,0,0));


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //change this to be based on the size of the crystals we use
  renderer.domElement.id = 'threeCanvas';
  document.body.appendChild(renderer.domElement);

  controls = new THREE.TrackballControls(camera, document.getElementById('threeCanvas'));
  controls.addEventListener('change', render);


  let xVal = 20;
  camera.position.x = 0;
  // camera.position.y = -100;
  camera.position.z = 200;
  camera.position.y = 20;
  // camera.lookAt(scene.position);
  camera.position.x = xVal;

  controls.target = new THREE.Vector3(xVal, 0, 0);

  $('#colorpicker').spectrum({
    color: "#f00",
    preferredFormat: "hex",
  });

}

let render = function(){
  renderer.render(scene, camera);
}

let drawSpecimen = function(){
  newSpecimen.drawShape(scene);
}

let animate = function(){
  requestAnimationFrame(animate);
  controls.update();
}

let lengthX = 10;
let lengthY = 10;
let lengthZ = 10;
let angleA = 60;
let angleB = 60;
let angleC = 60;


let newSpecimen = new Specimen('square', 4, 2, 1, lengthX, lengthY, lengthZ, angleA, angleB, angleC, scene);

let selected;
let id;
drawSpecimen();
init();
animate();


let draggables = ['controlsbox'];

for (let i = 0; i < draggables.length; ++i){
  $('#' + draggables[i]).draggable({
    addClasses: true,
    // cancel: 'map, iframe',
    // iframeFix: true,
    cursor: 'move'
  });
}