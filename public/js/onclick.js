let selected;
let elementTarget = $('#elementinput')[0];
console.log(elementTarget);

let addRowOnClick = function(){
  $('.crystalrow').on('click', function(){
    if (selected){
      $(selected).css('background', '#ffffff');
    }
     
    id = $(this).children()[5].id;
    selected = this;
    $(this).css('background', '#aaa');
  });
};

$('#atomaddbutton').on('click', function(event){
  event.preventDefault();
  let atom = $('#atominput')[0].value;
  let element = $('#elementinput').text();
  let x = $('#xinput')[0].value;
  let y = $('#yinput')[0].value;
  let z = $('#zinput')[0].value;
  let colorHex = $('#atomcolorpicker').spectrum('get').toHexString();

  index = Date.now();
  addAtom(x, y, z, colorHex, element);

  addRowOnClick();

  $('#atominput')[0].value = '';
  $('#elementinput').text('');
  $('#xinput')[0].value = '0.0';
  $('#yinput')[0].value = '0.0';
  $('#zinput')[0].value = '0.0';
});


$('#atomremovebutton').on('click', function(){
  if (selected){
    selected.remove();
    selected = null;
    newSpecimen.removeAtom(id);
    render();
  }

  resetCounts();
});


$('#controlsboxhide').on('click', function(){
  $('#controlsbox').hide();

  $('#controlsboxexpand').show();
});

$('#controlsboxexpand').on('click', function(){
  $('#controlsbox').show();

  $('#controlsboxexpand').hide();
});


$('#elementinput').on('click', function(){
  $('#periodictable').show();
  elementTarget = $('#elementinput')[0];
});

$('#atomclearbutton').on('click', function(){
  clearAtomList();
});

$('#exportbutton').on('click', function(){
  exportAtoms();
});

$('.element').on('click',  function(){
  elementTarget.innerText = this.id;
  $('#periodictable').hide();
  elementTarget = $('#elementinput');
});