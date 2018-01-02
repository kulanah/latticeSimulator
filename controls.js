let startX = 0;

let setStartX = function(){
  startX = event.clientX;
}

let mousemovetemplate = function(event){
  let delta = handleDrag(event);
  rotate(delta / 500);
};

let mouseuptemplate = function(event){
  $('body')[0].removeEventListener('mousemove', mousemovetemplate);

};

let handleDrag = function(event){
  return event.clientX - startX;
};

$('#threeCanvas').on('mousedown', function(event){
  setStartX();

  $('body')[0].addEventListener('mousemove', mousemovetemplate);
  $('body')[0].addEventListener('mouseup', mouseuptemplate);

});