$('#angleA').on('input', function(){
  newSpecimen.changeAngleA($('#angleA')[0].value);
  newSpecimen.redrawCrystals();
});

$('#angleB').on('input', function(){
  newSpecimen.changeAngleB($('#angleB')[0].value);
  newSpecimen.redrawCrystals();

});

$('#angleC').on('input', function(){
  newSpecimen.changeAngleC($('#angleC')[0].value);
  newSpecimen.redrawCrystals();
});

$('#lengthX').on('input', function(){
  newSpecimen.changeLengthX($('#lengthX')[0].value);
  newSpecimen.redrawCrystals();
});

$('#lengthY').on('input', function(){
  newSpecimen.changeLengthY($('#lengthY')[0].value);
  newSpecimen.redrawCrystals();
});

$('#lengthZ').on('input', function(){
  newSpecimen.changeLengthZ($('#lengthZ')[0].value);
  newSpecimen.redrawCrystals();
});


$('#xcountnumber').on('input', function(){
  if ($('#xcountnumber')[0].value < 1){
    $('#xcountnumber')[0].value = 1;
  }
  newSpecimen.changeXCount($('#xcountnumber')[0].value);
  newSpecimen.redrawCrystals();
});

$('#ycountnumber').on('input', function(){
  if ($('#ycountnumber')[0].value < 1){
    $('#ycountnumber')[0].value = 1;
  }
  newSpecimen.changeYCount($('#ycountnumber')[0].value);
  newSpecimen.redrawCrystals();
});

$('#zcountnumber').on('input', function(){
  if ($('#zcountnumber')[0].value < 1){
    $('#zcountnumber')[0].value = 1;
  }
  newSpecimen.changeZCount($('#zcountnumber')[0].value);
  newSpecimen.redrawCrystals();
});


$('#latticecolorpicker').on('change', function(){

  let colorHex = $('#latticecolorpicker').spectrum('get').toRgbString();

  newSpecimen.setLatticeColor(colorHex);
});

$('#latticeweight').on('input', function(){
  newSpecimen.setLatticeWeight(this.value);
});

$('.camerainput').on('input', function(){
  let u = $('#cameraposx').val() * 20;
  let v = $('#cameraposy').val() * 20;
  let w = $('#cameraposz').val() * 20;
  let newCameraX = newSpecimen.calculateCameraX(u, v, w);
  let newCameraY = newSpecimen.calculateCameraY(u, v, w);
  let newCameraZ = newSpecimen.calculateCameraZ(u, v, w);
  
  camera.position.set(newCameraX, newCameraY, newCameraZ);
  
  render();
});

$('#importlocallybutton').on('change', function(event){
  let reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);
});

let onReaderLoad = function(event){
  let obj = JSON.parse(event.target.result);
  clearAtomList();
  loadJSONAtoms(obj.atoms);
  setCrystalParams(obj.crystal);
  $('#importlocallybutton')[0].value = null;
};

let importDatabaseSpecimen = function(){
  clearAtomList();
  /*$('#lengthX').val(obj.x);
  $('#lengthY').val(obj.y);
  $('#lengthZ').val(obj.z);
  $('#angleA').val(obj.a);
  $('#angleB').val(obj.b);
  $('#angleC').val(obj.c);*/
};

let atomOnMouseup = function(e){
  let $container = closeWhenOffClickDiv;
  let className = $(e.target).attr('class');
  let parentElement = '';
  if (className == 'sp-picker-container'){
    parentElement = e.target.parentElement.parentElement;
  } else if (className == 'sp-dragger'){
    parentElement = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  } else if (className == 'sp-slider'){
    parentElement = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  }
  if ($container && ($container[0] !== parentElement)){
    $container.hide();
    closeWhenOffClickDiv = '';
    document.removeEventListener('mouseup', atomOnMouseup);
  } 
};


let atomNewColorOnchange = function(){
  let colorHex = $('#atomnewcolor').spectrum('get').toHexString();
  $('#' + cellId).css('background', colorHex);

  newSpecimen.updateAtomColor(cellId, colorHex);
};

$('#backgroundcolorpicker').on('change', function(){
  let colorHex = $('#backgroundcolorpicker').spectrum('get').toHexString();
  updateBackgroundColor(colorHex);
});