class Specimen{
  constructor(shape, countX, countY, countZ, lengthA, lengthB, lengthC, angleA, angleB, angleC, scene, lineWeight){
    this.latticeColor = 0xff37d8;
    switch(shape){
    case 'square':
      this.shape = new THREE.Geometry();
      this.material = new THREE.LineBasicMaterial({color: this.latticeColor, linewidth: lineWeight});
      
      this.lengthX = Number(lengthA);
      this.lengthY = Number(lengthB);
      this.lengthZ = Number(lengthC);
      break;
    }
    this.countX = countX;
    this.countY = countY;
    this.countZ = countZ;

    //this is all for the rewrite to angles and lengths
    this.angleA = angleA * Math.PI / 180;
    this.angleB = angleB * Math.PI / 180;
    this.angleC = angleC * Math.PI / 180;

    this.createCrystals = this.createCrystals.bind(this);
    this.crystals = new Array;
    this.spheres = new Array;
    this.sphereCoords = new Array;
    this.sphereInstances = new Array;
    this.createCrystals();
    this.lineWeight = lineWeight;
    this.loadCount = 0;
    this.crystalCount = 0;

    this.zero = 0;
    this.mag = 1.0;
  }

  createCrystals(){
    let geometry = new THREE.SphereGeometry(0.25, 8, 8);
    let material;
    this.crystalCount = 0;
    let x1 = [];
    let y1 = [];
    let z1 = [];
    let x2 = [];
    let y2 = [];
    let z2 = [];
    let x3 = [];
    let y3 = [];
    let z3 = [];
    let x4 = [];
    let y4 = [];
    let z4 = [];
    let x5 = [];
    let y5 = [];
    let z5 = [];
    let x6 = [];
    let y6 = [];
    let z6 = [];
    let x7 = [];
    let y7 = [];
    let z7 = [];
    for (let i = -this.countX - 1; i < this.countX; ++i){
      for (let j = -this.countZ - 1; j < this.countZ; ++j){
        for(let k = -this.countY - 1; k < this.countY; ++k){
          //let s1 = Math.sqrt(Math.pow(Math.cos(this.angleA), 2) - 2 * Math.cos(this.angleA) * Math.cos(this.angleB) * Math.cos(this.angleC) + Math.pow(Math.cos(this.angleB), 2));
          //let s2 = Math.pow(Math.cos(this.angleA), 2)- Math.cos(this.angleA) * Math.cos(this.angleB) * Math.cos(this.angleC);
          //let s3 = s2 / s1;
          this.s3 = (Math.cos(this.angleA) - Math.cos(this.angleB) * Math.cos(this.angleC))/(Math.sin(this.angleB) * Math.sin(this.angleC));
          x1[i] = this.lengthY * Math.cos(this.angleB)  * (k + 1);
          y1[k] = this.lengthY * Math.sin(this.angleB) * Math.sqrt(1 - this.s3 * this.s3) * (k + 1);
          z1[j] = this.lengthY * Math.sin(this.angleB) * this.s3 * (k + 1);

          x2[i] = this.lengthZ * Math.cos(this.angleC) * (j + 1);
          z2[j] = this.lengthZ * Math.sin(this.angleC) * (j + 1);
          y2[k] = 0;

          x3[i] = this.lengthX * (i + 1);
          y3[k] = 0;
          z3[j] = 0;

          x4[i] = x1[i] + x2[i];
          y4[k] = y1[k] + y2[k];
          z4[j] = z1[j] + z2[j];

          x5[i] = x1[i] + x3[i];
          y5[k]= y1[k] + y3[k];
          z5[j] = z1[j] + z3[j];

          x6[i] = x3[i] + x2[i];
          y6[k] = y3[k] + y2[k];
          z6[j] = z3[j] + z2[j];

          x7[i] = x1[i] + x6[i];
          y7[k] = y1[k] + y6[k];
          z7[j] = z1[j] + z6[j];

          //create points
          let bottomFrontLeft = new THREE.Vector3(0,0,0);
          let bottomFrontRight = new THREE.Vector3(x3[i], y3[k], z3[j]);
          let topFrontRight = new THREE.Vector3(x5[i], y5[k], z5[j]);
          let topFrontLeft = new THREE.Vector3(x1[i], y1[k], z1[j]);

          let bottomBackLeft = new THREE.Vector3(x2[i], y2[k], z2[j]);
          let bottomBackRight = new THREE.Vector3(x6[i], y6[k], z6[j]);

          let topBackRight = new THREE.Vector3(x7[i], y7[k], z7[j]);
          let topBackLeft = new THREE.Vector3(x4[i], y4[k], z4[j]);

          //creating front facing shape
          this.shape.vertices.push(bottomFrontLeft);
          this.shape.vertices.push(bottomFrontRight);
          this.shape.vertices.push(topFrontRight);
          this.shape.vertices.push(topFrontLeft);
          this.shape.vertices.push(bottomFrontLeft);

          //setting variables for the bottom of the shape

          //creating bottom of shape
          this.shape.vertices.push(bottomBackLeft);
          this.shape.vertices.push(bottomBackRight);
          this.shape.vertices.push(bottomFrontRight);

          // //creating right side of shape
          this.shape.vertices.push(topFrontRight);
          this.shape.vertices.push(topBackRight);
          this.shape.vertices.push(bottomBackRight);

          // //creating top of shape
          this.shape.vertices.push(topBackRight);
          this.shape.vertices.push(topBackLeft);
          this.shape.vertices.push(topFrontLeft);

          // //finishing off left side
          this.shape.vertices.push(topBackLeft);
          this.shape.vertices.push(bottomBackLeft);

          this.line = new THREE.Line(this.shape, this.material);

          //TODO: MOVE THIS OUT OF THIS FUNCTION
          this.crystals.push(this.line);
          scene.add(this.crystals[this.crystalCount]);

          ++this.crystalCount;
          
          // use the direction vector to plot the position of atoms.
          for (let a = 0; a < this.sphereCoords.length; ++a){
            if (i !=  -this.countX - 1 && k != -this.countY - 1 && j != -this.countZ - 1){
              material = new THREE.MeshBasicMaterial({color: this.sphereCoords[a].color, transparent: true});
              let newSphere = new THREE.Mesh(geometry, material);

              let xMult = Number(this.sphereCoords[a].x);
              let yMult = Number(this.sphereCoords[a].y);
              let zMult = Number(this.sphereCoords[a].z);

              let xPos =
              (xMult + Number(i)) * this.lengthX +
              (yMult + Number(k)) * this.lengthY * Math.cos(this.angleB) +
              (zMult + Number(j)) * this.lengthZ * Math.cos(this.angleC);
              
              let yPos =
              (yMult + Number(k)) * this.lengthY * Math.sin(this.angleB) * Math.sqrt(1 - this.s3 * this.s3);

              let zPos =
              (yMult + Number(k)) * this.lengthY * Math.sin(this.angleB) * this.s3 +
              (zMult + Number(j)) * this.lengthZ * Math.sin(this.angleC);

              newSphere.position.x = xPos;
              newSphere.position.y = yPos;
              newSphere.position.z = zPos;

              this.spheres.push(newSphere);
              scene.add(newSphere);
            }
          }
        }
      }
    }
  }

  addAtom(x, y, z, colorhex, index){
    this.sphereCoords.push({x: x, y: y, z: z, color: colorhex, index: index});
    this.redrawCrystals();
  }

  removeAtom(id){
    this.sphereCoords = this.sphereCoords.filter(item => item.index != id);
    this.redrawCrystals();
  }

  redrawCrystals(){
    for (let i = 0; i < this.crystals.length; ++i){
      scene.remove(this.crystals[i]);
    }
    for (let i = 0; i < this.spheres.length; ++i){
      scene.remove(this.spheres[i]);
    }
    this.spheres = [];
    this.crystals = [];
    this.shape = [];
    this.shape = new THREE.Geometry;
    this.createCrystals();

    // if (this.loadCount < 4){
    //   setTimeout(render, 3000);
    //   ++this.loadCount;
    // } else {
      render();
    // }
  }


  setLatticeWeight(newWeight){
    this.lineWeight = newWeight;
    this.updateMaterials();
  }

  setLatticeColor(rgbVal){
    this.latticeColor = rgbVal;
    this.updateMaterials();
  }

  updateMaterials(){
    delete this.material;
    this.material = new THREE.LineBasicMaterial({color: this.latticeColor, linewidth: this.lineWeight});
    this.redrawCrystals();
  }

  remove(index){
    for (let i = 0; i < this.sphereInstances.length; ++i){
      if (this.sphereInstances[i].name == index){
        scene.remove(this.sphereInstances[i]);
        this.sphereInstances.splice(i, 1);
        --i;
      }
    }
    render();
  }


  changeAngleA(newVal){
    this.angleA = newVal * Math.PI / 180;
  }
  changeAngleB(newVal){
    this.angleB = newVal * Math.PI / 180;
  }
  changeAngleC(newVal){
    this.angleC = newVal * Math.PI / 180;
  }

  changeLengthX(newVal){
    this.lengthX = newVal * this.mag;
  }

  changeLengthY(newVal){
    this.lengthY = newVal * this.mag;
  }
  
  changeLengthZ(newVal){
    this.lengthZ = newVal * this.mag;
  }

  changeXCount(newVal){
    this.countX = newVal;
  }

  changeYCount(newVal){
    this.countY = newVal;
  }

  changeZCount(newVal){
    this.countZ = newVal;
  }

  drawSpheres(){
    // let xVal, yVal, zVal;
    // for (let i = 0; i < this.sphereCoords.length; ++i){
    //   xVal = this.sphereCoords[i].x * this.lengthY * Math.cos(this.angleB) + this.zero;
    //   yVal = this.sphereCoords[i].y * this.lengthY * Math.sin(this.angleA) + this.zero;
    //   zVal = this.sphereCoords[i].z * this.lengthY * Math.cos(this.angleA) * Math.sin(this.angleC) + this.zero;

    //   let geometry = new THREE.SphereGeometry(0.25, 4, 4);
    //   let material = new THREE.MeshBasicMaterial({color: this.sphereCoords[i].color, wireframe: true});
    //   let sphere = new THREE.Mesh(geometry, material);

    //   sphere.position.x = xVal;
    //   sphere.position.y = yVal;
    //   sphere.position.z = zVal;

    //   scene.add(sphere);
    // }
  }

  redrawSpheres(){
    for (let i = 0; i < this.crystals.length; ++i){
      for (let x = 0; x < this.countX; ++x){
        for (let y = 0; y < this.countY; ++y){
          let geometry = new THREE.SphereGeometry(0.25, 4, 4);
          let material = new THREE.MeshBasicMaterial({color: this.latticeColor ,wireframe: true, transparent: true});
          let sphere = new THREE.Mesh(geometry, material);

          sphere.translateX((this.spheres[i].x * this.width)+ x * this.width);
          sphere.translateY((this.spheres[i].y * this.height) + y * this.height);
          sphere.translateZ(this.spheres[i].z * this.depth);


          scene.add(sphere);

        }
      }
    }
  }

  createPoles(){
    let xMaterial = new THREE.LineBasicMaterial({color: 0xff0000});
    let xShape = new THREE.Geometry();
    xShape.vertices.push(new THREE.Vector3(-1000, 0, 0));
    xShape.vertices.push(new THREE.Vector3(1000, 0, 0));
    let xPole = new THREE.Line(xShape, xMaterial);

    let yMaterial = new THREE.LineBasicMaterial({color: 0x00ff00});
    let yShape = new THREE.Geometry();
    yShape.vertices.push(new THREE.Vector3(0, -1000, 0));
    yShape.vertices.push(new THREE.Vector3(0, 1000, 0));
    let yPole = new THREE.Line(yShape, yMaterial);

    let zMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
    let zShape = new THREE.Geometry();
    zShape.vertices.push(new THREE.Vector3(0, 0, -1000));
    zShape.vertices.push(new THREE.Vector3(0, 0, 1000));
    let zPole = new THREE.Line(zShape, zMaterial);

    scene.add(xPole);
    scene.add(yPole);
    scene.add(zPole);
  }

  updateMag(magDelta){
    this.mag += magDelta;

    this.lengthX += this.lengthX * magDelta; 
    this.lengthY += this.lengthY * magDelta; 
    this.lengthZ += this.lengthZ * magDelta; 

    this.redrawCrystals();
    this.redrawSpheres();
  }

  calculateCameraX(u, v, w){
    return u * this.lengthX * Math.cos(this.angleB) + v * this.lengthY * Math.cos(this.angleB) + w * this.lengthZ * Math.cos(this.angleC);
  }

  calculateCameraY(u, v, w){
    return v * this.lengthY * Math.sin(this.angleB) * Math.sqrt(1-this.s3 * this.s3);
  }

  calculateCameraZ(u, v, w){
    return v * this.lengthY * Math.sin(this.angleB) * this.s3 + w * this.lengthZ * Math.sin(this.angleC);
  }
}
