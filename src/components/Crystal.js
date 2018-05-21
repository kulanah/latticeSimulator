import React from 'react';
import '../windows.css';

class Crystal extends React.Component{

  render(){
    return(
      <div className='controlsBox' id='crystalDiv'>
        <div className='controlsSection' id='specimenName'>
          <p>Specimen Name</p>
          <input type='text' name='Name' id='specimenName' className='inputName'/>
        </div>
        <div className='controlsSection' id='bravias'>
          <span>Bravias Lattice</span>
          <div>
            <select name='CrystalStructure' id='latticeSelector'>
							<option defaultValue='Primitive Cubic'>Primitive Cubic</option>
							<option defaultValue='bcc'>bcc</option>
							<option defaultValue='fcc'>fcc</option>
							<option defaultValue='Tetragonal'>Tetragonal</option>
							<option defaultValue='Body centered Tetragonal'>Body centered Tetragonal</option>
							<option defaultValue='Orthohombic'>Orthohombic</option>
							<option defaultValue='Body Centered Orthohombic'>Body Centered Orthohombic</option>
							<option defaultValue='Face Centered Orthohombic'>Face Centered Orthohombic</option>
							<option defaultValue='End Centered Orthohombic'>End Centered Orthohombic</option>
							<option defaultValue='Hexagonal'>Hexagonal</option>
							<option defaultValue='Rhombohedral'>Rhombohedral</option>
							<option defaultValue='Monoclinic'>Monoclinic</option>
							<option defaultValue='End Centered Monoclinic'>End Centered Monoclinic</option>
							<option defaultValue='Triclinic'>Triclinic</option>
            </select>
          </div>
        </div>
        <div id='units'>
          <span className='unitsInput' id='aInput'>
            <p>A</p>
            <input type='number' defaultValue='5.431' name='LatticeA' id='aInputBox'/>
          </span>
          <span className='unitsInput' id='bInput'>
            <p>B</p>
            <input type='number' defaultValue='5.431' name='LatticeB' id='bInputBox'/>
          </span>
          <span className='unitsInput' id='cInput'>
            <p>C</p>
            <input type='number' defaultValue='5.431' name='LatticeC' id='cInputBox'/>
          </span>
          <span className='unitsInput' id='alphaInput'>
            <p>Alpha</p>
            <input type='number' defaultValue='90' min='-180' max='180' name='LatticeAlpha' id='alphaInputBox'/>
          </span>
          <span className='unitsInput' id='betaInput'>
            <p>Beta</p>
            <input type='number' defaultValue='90' min='-180' max='180' name='LatticeBeta' id='betaInputBox'/>
          </span>
          <span className='unitsInput' id='gammaInput'>
            <p>Gamma</p>
            <input type='number' defaultValue='90' min='-180' max='180' name='LatticeGamma' id='gammaInputBox'/>
          </span>
        </div>
      </div>
    )
  }
}

export { Crystal };