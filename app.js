let scene = new THREE.Scene();
let angleX = 0.1;
let angleY = 0.1;
let angleZ = 0;
let camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 150);
let controls;
let renderer;

let init = function(){
  camera.position.set(0,45,0);
  camera.lookAt(new THREE.Vector3(0,0,0));

  controls = new THREE.TrackballControls(camera);
  controls.addEventListener('change', render);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth - 5, window.innerHeight - 5);
  //change this to be based on the size of the crystals we use
  renderer.domElement.id = 'threeCanvas';
  document.body.appendChild(renderer.domElement);
  rotateX(0.0);
}

let render = function(){
  renderer.render(scene, camera);
}

let drawSpecimen = function(){
  newSpecimen.drawShape(scene);
  newSpecimen.createSpheres();
  newSpecimen.placeSpheres();
}

let rotateX = function(delta){
  renderer.render(scene, camera);
  angleX += delta;
  angleZ += delta;
  
  camera.position.x = 65 * Math.cos(angleX);
  camera.position.z = 65 * Math.sin(angleZ);
  camera.lookAt(scene.position);
}

let rotateY = function(delta){
  renderer.render(scene, camera);
  angleY += delta;
  angleZ += delta;
  camera.position.z = 1 * Math.cos(angleZ);
  camera.position.y = 100 * Math.cos(angleY);
  camera.lookAt(scene.position);
}

let animate = function(){
  requestAnimationFrame(animate);
  controls.update();
}

let newSpecimen = new Specimen('square', 2, 1);
drawSpecimen();
init();
animate();