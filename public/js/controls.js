let startX = 0;
let startY = 0;

let setStartX = function(){
  startX = event.clientX;
};

let setStartY = function(){
  startY = event.clientY;
};

let crystalRotateHorizontal = function(event){
  let delta = handleDrag(event)[0];
  rotateX(delta / 500);
  setStartX();
};

let crystalRotateVertical = function(event){
  let delta = handleDrag(event)[1];
  rotateY(delta / 500);
  setStartY();
};

let cancelCrystalRotate = function(event){
  $('body')[0].removeEventListener('mousemove', crystalRotateHorizontal);
  $('body')[0].removeEventListener('mousemove', crystalRotateVertical);

};

let handleDrag = function(event){
  let returns = [event.clientX - startX, event.clientY - startY];
  return returns;
};

$('#threeCanvas').on('mousedown', function(event){
  if (event.ctrlKey){
    setStartX();
    $('body')[0].addEventListener('mousemove', crystalRotateHorizontal);
    $('body')[0].addEventListener('mouseup', cancelCrystalRotate);
  } else if (event.altKey){
    setStartY();
    $('body')[0].addEventListener('mousemove', crystalRotateVertical);
    $('body')[0].addEventListener('mouseup', cancelCrystalRotate);
  }
});