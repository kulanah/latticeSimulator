$('#atomaddbutton').on('click', function(){
  let atom = $('#atominput')[0].value;
  let element = $('#elementinput')[0].value;
  let x = $('#xinput')[0].value;
  let y = $('#yinput')[0].value;
  let z = $('#zinput')[0].value;
  let colorHex = $('#colorpicker').spectrum("get").toHexString();
  newAtom = {
    atom: atom,
    element: element,
    x: x,
    y: y, 
    z: z,
    color: colorHex
  };

  index = Date.now();
  let tableRow = "<tr index=\"" + index + "\"><td>" + x + "</td><td>" + y + "</td><td>" + z + "</td><td style=\"background:" + colorHex + ";\"></td></tr>";
  $("#atomslisttable").append(tableRow);
  newSpecimen.addSphere(x, y, z, colorHex, index);

  render();
});