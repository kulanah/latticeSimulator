
// let sizeMult = 40;
// let width = window.innerWidth;
// let height = window.innerHeight;
// let camera = new THREE.OrthographicCamera(width / -sizeMult, width / sizeMult,  height / sizeMult, height / -sizeMult, 1, 2000);

let scene = new THREE.Scene();
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


  let xVal = -3;
  camera.position.x = 0;
  // camera.position.y = -100;
  camera.position.z = 100;
  camera.position.y = 20;
  // camera.lookAt(scene.position);
  camera.position.x = xVal;

  controls.target = new THREE.Vector3(xVal, 0, 0);


  $('#latticecolorpicker').spectrum({
    color: '#ff37d8',
    preferredFormat: 'hex',
  });

  $('#atomcolorpicker').spectrum({
    color: '#f00',
    preferredFormat: 'hex',
  });

};



let render = function(){
  renderer.render(scene, camera);
};

let drawSpecimen = function(){
};

let animate = function(){
  requestAnimationFrame(animate);
  controls.update();
};



let addAtom = function(x, y, z, colorHex){
  let index = Date.now();
  let tableRow = '<tr class=\'crystalrow\' index=\'' + index + '\'><td>' + x + '</td><td>' + y + '</td><td>' + z + '</td><td style=\'border: 1px black solid; background:' + colorHex + ';\'></td></tr>';
  $('#atomslisttable').append(tableRow);
  addRowOnClick();
  newSpecimen.addAtom(x, y, z, colorHex, index);
};

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
addAtom(1, 1, 1, '#ff0000');
addAtom(0.5, 0.5, 0.5, '#0000ff');
addAtom(0, 0, 0, '#00ff00');


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


newSpecimen.updateMaterials();

let updateCameraInputs = function(){
  $('#cameraposx').val(camera.position.x);
  $('#cameraposy').val(camera.position.y);
  $('#cameraposz').val(camera.position.z);
};