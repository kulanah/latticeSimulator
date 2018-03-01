let scene = new THREE.Scene();
let angleX = 0.1;
let angleY = 0.1;
let angleZ = 0;
let camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1500);
// let camera = new THREE.OrthographicCamera(window.innerWidth / sizemult, window.innerWidth / sizemult, window.innerHeight / sizemult, window.innerHeight / sizemult, 1, 101000);
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


  $('#latticecolorpicker').spectrum({
    color: "#ff37d8",
    preferredFormat: "hex",
  });

  $('#atomcolorpicker').spectrum({
    color: "#f00",
    preferredFormat: "hex",
  });

}

let render = function(){
  renderer.render(scene, camera);
}

let drawSpecimen = function(){
}

let animate = function(){
  requestAnimationFrame(animate);
  controls.update();
}

let lengthX = $('#lengthX')[0].value;
let lengthY = $('#lengthY')[0].value;
let lengthZ = $('#lengthZ')[0].value;
let angleA = $('#angleA')[0].value;
let angleB = $('#angleB')[0].value;
let angleC = $('#angleC')[0].value;
let countX = $('#xcountnumber')[0].value;
let countY = $('#ycountnumber')[0].value;
let countZ = $('#zcountnumber')[0].value;
let lineweight = $('#latticeweight')[0].value;


let newSpecimen = new Specimen('square', countX, countY, countZ, lengthX, lengthY, lengthZ, angleA, angleB, angleC, scene, lineweight);
// newSpecimen.addAtom(0, 0, 0, "#fff");
// newSpecimen.addAtom(0, 0, 1, "#fff");
// newSpecimen.addAtom(0, 1, 0, "#fff");
// newSpecimen.addAtom(0, 1, 1, "#fff");
// newSpecimen.addAtom(1, 0, 0, "#fff");
// newSpecimen.addAtom(1, 0, 1, "#fff");
// newSpecimen.addAtom(1, 1, 0, "#fff");
// newSpecimen.addAtom(1, 1, 1, "#fff");
newSpecimen.addAtom(0.5, 0.5, 0.5, "#fff");

let selected;
let id;
drawSpecimen();
init();
animate();
newSpecimen.drawSpheres();


let draggables = ['controlsbox'];

for (let i = 0; i < draggables.length; ++i){
  $('#' + draggables[i]).draggable({
    addClasses: true,
    // cancel: 'map, iframe',
    // iframeFix: true,
    cursor: 'move'
  });
}

$('.hidden').hide();


let addAtomToList = function(x, y, z, colorhex){
  newSpecimen.addAtom(x, y, z, colorhex);
  //TODO: Add item to the list

  // newSpecimen.addSphere

}