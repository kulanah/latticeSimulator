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