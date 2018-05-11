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

  let colorHex = $('#latticecolorpicker').spectrum("get").toRgbString();

  newSpecimen.setLatticeColor(colorHex);
});

$('#atomnewcolor').on('change', function(event){
  // console.log(closeWhenOffClickDiv);

  let colorHex = $('#atomcolorpicker').spectrum("get").toRgbString();
  // console.log(colorHex);
});


$('#latticeweight').on('input', function(){
  newSpecimen.setLatticeWeight(this.value);
});

$('.camerainput').on('input', function(){
  let u = $('#cameraposx').val();
  let v = $('#cameraposy').val();
  let w = $('#cameraposz').val();
  let newCameraX = newSpecimen.calculateCameraX(u, v, w);
  let newCameraY = newSpecimen.calculateCameraY(u, v, w);
  let newCameraZ = newSpecimen.calculateCameraZ(u, v, w);

  camera.position.set(newCameraX, newCameraY, newCameraZ);

  render();
});

$('#importbutton').on('change', function(event){
  let reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);
});

let onReaderLoad = function(event){
  let obj = JSON.parse(event.target.result);
  clearAtomList();
  loadJSONAtoms(obj);
  $('#importbutton')[0].value = null;
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


let atomNewColorOnchange = function(event){
  let colorHex = $('#atomnewcolor').spectrum('get').toHexString();
  $('#' + cellId).css('background', colorHex);

  newSpecimen.updateAtomColor(cellId, colorHex);
  //update atom in specimen

}