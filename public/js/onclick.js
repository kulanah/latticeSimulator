let selected;

let addRowOnClick = function(){
  $('.crystalrow').on('click', function(){
    if (selected){
      $(selected).css('background', '#ffffff');
    }

    id = $(this).attr('index');
    selected = this;
    $(this).css('background', '#ff0000');
  });
};

$('#atomaddbutton').on('click', function(event){
  event.preventDefault();
  let atom = $('#atominput')[0].value;
  let element = $('#elementinput')[0].value;
  let x = $('#xinput')[0].value;
  let y = $('#yinput')[0].value;
  let z = $('#zinput')[0].value;
  let colorHex = $('#atomcolorpicker').spectrum('get').toHexString();

  index = Date.now();
  addAtom(x, y, z, colorHex);

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


});