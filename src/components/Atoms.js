import React from 'react';
import '../windows.css';

class Atoms extends React.Component{
  render(){
    return(
      <div className='controlsBox' id='atomsDiv'>
        <div className='controlsSection'>
          <div>Add New Atom</div>
          <div id='addAtomDiv'>
            <span>
              <p>Element</p>
              <div className='atomAddItem' id='elementInput'>H</div>
            </span>
            <span className='atomAddItem'>
              <p>X</p>
              <input type='number' value='0' step='0.1' id='xinput'/>
            </span>
            <span className='atomAddItem'>
              <p>Y</p>
              <input type='number' value='0' step='0.1' id='yinput'/>
            </span>
            <span className='atomAddItem'>
              <p>Z</p>
              <input type='number' value='0' step='0.1' id='zinput'/>
            </span>
            <span className='atomAddItem'>
              <p>Color</p>
              <input type='text' className='colorpicker' id='atomcolorpicker' />
            </span>
          </div>
        </div>
        <div className='controlsSection' id='atomFormButtons'>
          <input type='button' value='Add'/>
          <input type='button' value='Remove'/>
          <input type='button' value='Clear'/>
        </div>
        <div className='controlsSection' id='atomsList'>
          <table id='atomslisttable'>
            <tr class='listheader'>
              <td>Number</td>
              <td>Element</td>
              <td>X</td>
              <td>Y</td>
              <td>Z</td>
              <td>Color</td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}
export { Atoms };