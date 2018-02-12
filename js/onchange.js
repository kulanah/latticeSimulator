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