let addRowOnClick = function(){
  $('.crystalrow').on('click', function(){
    if (selected){
      $(selected).css('background', '#ffffff')
    }

    id = $(this).attr('index');
    selected = this;
    $(this).css('background', '#ff0000');
  });
};

$('#atomaddbutton').on('click', function(){
  let atom = $('#atominput')[0].value;
  let element = $('#elementinput')[0].value;
  let x = $('#xinput')[0].value;
  let y = $('#yinput')[0].value;
  let z = $('#zinput')[0].value;
  let colorHex = $('#colorpicker').spectrum("get").toHexString();

  index = Date.now();
  let tableRow = "<tr class=\"crystalrow\" index=\"" + index + "\"><td>" + x + "</td><td>" + y + "</td><td>" + z + "</td><td style=\"background:" + colorHex + ";\"></td></tr>";
  $("#atomslisttable").append(tableRow);
  addRowOnClick();
  newSpecimen.addSphere(x, y, z, colorHex, index);

  render();

  $('#atominput')[0].value = '';
  $('#elementinput')[0].value = '';
  $('#xinput')[0].value = '';
  $('#yinput')[0].value = '';
  $('#zinput')[0].value = '';
});


$('#atomremovebutton').on('click', function(){
  if (selected){
    selected.remove();
    selected = null;
    newSpecimen.remove(id);
    render();
  }
});
