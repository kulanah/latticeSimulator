let sizeMult = 40;
let width = window.innerWidth;
let height = window.innerHeight;
let camera = new THREE.OrthographicCamera(width / -sizeMult, width / sizeMult,  height / sizeMult, height / -sizeMult, 1, 2000);
let mag = 1;
let cellId = 0;

let scene = new THREE.Scene();
// let camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1500);
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

  $('#atomnewcolor').spectrum({
    color: '#0f0',
    preferredFormat: 'hex',
    flat: true,
  });
  
  createUserDefinedCrystals();
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

let openAtomColorPicker = function(event, id){
  let div = $('#atomnewcolordiv');

  setupAtomColorLiveChange(id);

  if (div.css('display') == 'none'){
    closeWhenOffClickDiv = div;
    div.show();
    div.css('top', event.clientY);
    div.css('left', event.clientX + 10);
  }

  document.addEventListener('mouseup', (atomOnMouseup));
};

let loadJSONAtoms = function(object){
  for (let i = 0; i < object.length; ++i){
    addAtom(object[i].x, object[i].y, object[i].z, object[i].color, object[i].element);
  }
  addRowOnClick();
};


let exportAtoms = function(){
  let fileName = promptForFileName();
};

let promptForFileName = function(){
  let framingDiv = 
    '<div ' + 
      'id="filenameprompt" ' + 
      'style="background:rgba(255,255,255,0.5); height:100%;width:100%;' + 
      'position:absolute;top:0;left:0;z-index:2">';

  let divEnd = '</div>';

  let inputBoxStyle = 
    'background:#EBE8D7;' + 
    'border:solid 1px #A9A9A9;' + 
    'border-radius:5px;' + 
    'position:absolute;' + 
    'top:45%;' + 
    'left:45%;' + 
    'width:10%;'+ 
    'height:10%;' + 
    'padding:1%'; 


  let inputBox = 
    '<div style="' + inputBoxStyle + '">' + 
      '<form>' + 
        '<div>' + 
          '<label for="atomconfigfilename">Filename: </label>'  +
          '<input type="text" id="atomconfigfilename">' + 
        '</div>' +
        '<div style="margin-top:5%;">' + 
          '<button id="filenamesubmit" type="submit">Save File</button>' + 
        '</div>' + 
      '</form>' + 
    '</div>';


  let newWindow = framingDiv + inputBox + divEnd;

  console.log(newWindow);
  $("body").append(newWindow);

  $('#filenamesubmit').on('click', submitFileName);
};

let submitFileName = function(event){
  event.preventDefault();
  let filename = $('#atomconfigfilename')[0].value + '.json';

  let object = createDownloadJson();
  downloadAtomsFile(object, filename);

  $('#filenameprompt').hide();
};

let createDownloadJson = function(){
  let exportObj = [];

  let table = $('#atomslisttable').children().children();
  for (let i = 1; i < table.length; ++i){
    let row = table[i].children;
    exportObj[i - 1] = {
      element: row[1].innerText,
      x: row[2].innerText,
      y: row[3].innerText,
      z: row[4].innerText,
      color: convertRGBToHex(row[5].style.backgroundColor),
    };
  }

  let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  return dataStr;
};


let downloadAtomsFile = function(object, filename){
  let dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute('href', object);
  dlAnchorElem.setAttribute('download', filename); 
  dlAnchorElem.click();
};

let setupAtomColorLiveChange = function (id){
  cellId = id;
  // document.getElementById('atomnewcolor').addEventListener('change', atomNewColorOnchange;
  $('#atomnewcolor').on('change', atomNewColorOnchange);
  $('#atomnewcolor').spectrum('set', $('#' + id).css('background'));
};

let addAtom = function(x, y, z, colorHex, element){
  let index = Date.now();
  let tableRow = 
    '<tr class=\'crystalrow\'>' + 
      '<td>' + $('#atomslisttable tr').length + '</td>' + 
      '<td>' + element + '</td>' + 
      '<td>' + x + '</td>' + 
      '<td>' + y + '</td>' + 
      '<td>' + z + '</td>' + 
      // '<td><input class=\'atomcolor\' type=\'color\'/></td></tr>';
      '<td ' + 
        'class=\'atomcolor\'' +  
        'id=\'' + index + '\'' +  
        'onClick="openAtomColorPicker(event, ' + index + ')"' + 
        'style=\'border: 1px black solid; background:' + colorHex + ';\'>' + 
      '</td>' + 
    '</tr>';

   
  
  $('#atomslisttable').append(tableRow);
  newSpecimen.addAtom(x, y, z, colorHex, index);
};


let clearAtomList = function(){
  //Get list of atoms from table rows.  Specifically need IDs.
  let rows = $('#atomslisttable').children().children(); //children.children goes from table to TR

  //call remove atom on the given row
  for (let i = 1; i < rows.length; ++i){
    rows[i].click();
    $('#atomremovebutton').click();
  }
};


let convertRGBToHex = function(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x) {
    return ('0' + parseInt(x).toString(16)).slice(-2);
  }
  return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


let createUserDefinedCrystals = function(){
  addAtom(1, 1, 1, '#00ff00', 'Si');
  addAtom(1, 1, 0, '#00ff00', 'Si');
  addAtom(1, 0, 1, '#00ff00', 'Si');
  addAtom(1, 0, 0, '#00ff00', 'Si');
  addAtom(0, 1, 1, '#00ff00', 'Si');
  addAtom(0, 1, 0, '#00ff00', 'Si');
  addAtom(0, 0, 1, '#00ff00', 'Si');
  addAtom(0, 0, 0, '#00ff00', 'Si');
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


init();
drawSpecimen();
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

let resetCounts = function(){
  let table = $('#atomslisttable');
  let children = table.children()[0].children;
  for (let i = 1; i < children.length; ++i){
    // children[i]
    children[i].children[0].innerText = i;
    // console.log(i);
  }
  // }
}


$('.hidden').hide();

let closeWhenOffClickDiv;


newSpecimen.updateMaterials();
addRowOnClick();