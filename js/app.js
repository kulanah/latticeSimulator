let scene = new THREE.Scene();
let angleX = 0.1;
let angleY = 0.1;
let angleZ = 0;
let camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1500);
let controls;
let renderer;

let init = function(){
  camera.position.set(0,45,0);
  camera.lookAt(new THREE.Vector3(0,0,0));


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  //change this to be based on the size of the crystals we use
  renderer.domElement.id = 'threeCanvas';
  document.body.appendChild(renderer.domElement);

  controls = new THREE.TrackballControls(camera, document.getElementById('threeCanvas'));
  controls.addEventListener('change', render);

  camera.position.x = 60;
  camera.position.z = 60;
  camera.lookAt(scene.position);


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

let newSpecimen = new Specimen('square', 2, 3, scene);
newSpecimen.addSphere(0, 0, 0, '#008080', 0);
newSpecimen.addSphere(.1, .1, .1, '#ffab32', 1);
newSpecimen.addSphere(1, 1, 1, '#22d951', 2);
// newSpecimen.addSphere(1, 0, 0, '#ffffff');
// newSpecimen.addSphere(0.5, 0.5, 0.5, '#ff8080');
// newSpecimen.addSphere(0.25, 0.25, 0.25);


let selected;
let id;
drawSpecimen();
init();
animate();