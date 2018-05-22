import React from 'react';
import SwatchPicker from './SwatchPicker';
import '../windows.css';

class View extends React.Component{
  render(){
    return(
      <div className='controlsBox' id='viewDiv'>
        <div className='controlsSection'>
          Scale 
          <div className='trioHeaders'>
            <span>X</span>
            <span>Y</span>
            <span>Z</span>
          </div>
          <div className='trioInputs'>
            <input type='number' name='' value='1' max='4' id='xCountNumber'/>
            <input type='number' name='' value='1' max='4' id='yCountNumber'/>
            <input type='number' name='' value='1' max='4' id='zCountNumber'/>
          </div>
        </div>
        <div className='controlsSection'>
          Orientation
          <div className='trioHeaders'>
            <span>U</span>
            <span>V</span>
            <span>W</span>
          </div>
          <div className='trioInputs'>
            <input type='number' name='' value='1' id='uScaleNumber'/>
            <input type='number' name='' value='1' id='vScaleNumber'/>
            <input type='number' name='' value='3' id='wScaleNumber'/>
          </div>
        </div>
        <div className='controlsSection' id='exportDiv'>
          Export
          <button id='exportDatabaseButton' type='submit'>Database</button>
						<button id='exportLocallyButton' type='button'>Locally</button>
						<span id='importHeader'>Import</span>
						<select id='importDatabaseMenu'>
							<option>Silicon</option>
						</select>
						<input type='file' id='importlocallybutton'/>
						<span id='backgroundColor'>Background Color</span>
						<div id='backgroundColorDiv'>
              <SwatchPicker/>
						</div>
					</div>
        </div>
    )
  }
}
export { View };