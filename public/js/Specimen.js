class Specimen{
  constructor(shape, countX, countY, countZ, lengthA, lengthB, lengthC, angleA, angleB, angleC, scene, lineWeight){
    this.latticeColor = 0xff37d8;
    switch(shape){
    case 'square':
      this.shape = new THREE.Geometry();
      this.material = new THREE.LineBasicMaterial({color: this.latticeColor, linewidth: lineWeight});

      this.lengthX = lengthA;
      this.lengthY = lengthB;
      this.lengthZ = lengthC;
      break;
    }

    this.countX = countX;
    this.countY = countY;
    this.countZ = countZ;


    //this is all for the rewrite to angles and lengths
    this.angleA = angleA * Math.PI / 180;
    this.angleB = angleB * Math.PI / 180;
    this.angleC = angleC * Math.PI / 180;

    this.scene = scene;

    this.createCrystals = this.createCrystals.bind(this);
    this.crystals = new Array;
    this.spheres = new Array;
    this.sphereCoords = new Array;
    this.sphereInstances = new Array;
    this.createCrystals();
    this.lineWeight = lineWeight;
    this.loadCount = 0;

    this.zero = 0;
  }

  createCrystals(){
    let geometry = new THREE.SphereGeometry(0.25, 8, 8);
    let sphere;
    let material;
    let crystalCount = 0;
    let xStart = 0;
    let x0 = 0;
    let y0 = 0;
    let z0 = 0;
    let x1 = new Array;
    let y1 = new Array;
    let z1 = new Array;
    let x2 = new Array;
    let y2 = new Array;
    let z2 = new Array;
    let x3 = new Array;
    let y3 = new Array;
    let z3 = new Array;
    let x4 = new Array;
    let y4 = new Array;
    let z4 = new Array;
    let x5 = new Array;
    let y5 = new Array;
    let z5 = new Array;
    let x6 = new Array;
    let y6 = new Array;
    let z6 = new Array;
    let x7 = new Array;
    let y7 = new Array;
    let z7 = new Array;
    for (let i = -this.countX - 1; i < this.countX; ++i){
      for (let j = -this.countZ - 1; j < this.countZ; ++j){
        for(let k = -this.countY - 1; k < this.countY; ++k){
          x1[i] = this.lengthY * Math.cos(this.angleB) * (k + 1);
          y1[k] = this.lengthY * Math.sin(this.angleA) * (k + 1);
          z1[j] = this.lengthY * Math.cos(this.angleA) * Math.sin(this.angleC) * (k + 1);

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
          this.scene.add(this.crystals[crystalCount]);

          ++crystalCount;

          for (let i = 0; i < this.sphereCoords.length; ++i){
            material = new THREE.MeshBasicMaterial({color: this.sphereCoords[i].color, transparent: true});
            let newSphere = new THREE.Mesh(geometry, material);

            let xMult = this.sphereCoords[i].x;
            let yMult = this.sphereCoords[i].y;
            let zMult = this.sphereCoords[i].z;

            let xPos = 
            xMult * this.lengthX +
            yMult * this.lengthY * Math.cos(this.angleB) + 
            zMult * this.lengthZ * Math.cos(this.angleC) + 
            (i - 1) * this.lengthX + 
            (k - 1) * this.lengthY * Math.cos(this.angleB) + 
            (j - 1) * this.lengthZ * Math.cos(this.angleC);

            let yPos = 
            yMult * this.lengthY * Math.sin(this.angleA) + 
            (k - 1) * this.lengthY * Math.sin(this.angleA);

            let zPos = 
            zMult * this.lengthY * Math.cos(this.angleA) * Math.sin(this.angleC) + 
            zMult * this.lengthZ * Math.sin(this.angleC) + 
            (j - 1) * this.lengthZ * Math.sin(this.angleC);

            newSphere.position.x = xPos;
            newSphere.position.y = yPos;
            newSphere.position.z = zPos;

            this.spheres.push(newSphere);
            scene.add(newSphere);
          }
          /*
          xi = 
          Xi.val * this.lengthX + 
          Yi.val * this.lengthY * cosBeta + 
          Zi.val * this.lengthZ * cosGamma + 
          (i - 1) * this.lengthX + 
          (k - 1) * this.lengthY * cosBeta + 
          (j - 1) * this.lengthZ * cosGamma

          yi = 
          Yi.val * this.lengthY * sinAlpha + 
          (k - 1) * this.lengthY * sinAlpha

          zi = 
          Zi.val * this.lengthY * cosAlpha * sinGamma + 
          Zi.val * this.lengthZ * sinGamma + 
          (j - 1) * this.lengthZ * sinGamma


          */


          /*
          let sphere0 = new THREE.Mesh(geometry, material);
          sphere0.position.x = x0;
          sphere0.position.y = y0;
          sphere0.position.z = z0;
          this.scene.add(sphere0);
          let sphere1 = new THREE.Mesh(geometry, material);
          sphere1.position.x = x1[i];
          sphere1.position.y = y1[k];
          sphere1.position.z = z1[j];
          this.scene.add(sphere1);
          let sphere2 = new THREE.Mesh(geometry, material);
          sphere2.position.x = x2[i];
          sphere2.position.y = y2[k];
          sphere2.position.z = z2[j];
          this.scene.add(sphere2);
          let sphere3 = new THREE.Mesh(geometry, material);
          sphere3.position.x = x3[i];
          sphere3.position.y = y3[k];
          sphere3.position.z = z3[j];
          this.scene.add(sphere3);
          let sphere4 = new THREE.Mesh(geometry, material);
          sphere4.position.x = x4[i];
          sphere4.position.y = y4[k];
          sphere4.position.z = z4[j];
          this.scene.add(sphere4);
          let sphere5 = new THREE.Mesh(geometry, material);
          sphere5.position.x = x5[i];
          sphere5.position.y = y5[k];
          sphere5.position.z = z5[j];
          this.scene.add(sphere5);
          let sphere6 = new THREE.Mesh(geometry, material);
          sphere6.position.x = x6[i];
          sphere6.position.y = y6[k];
          sphere6.position.z = z6[j];
          this.scene.add(sphere6);
          let sphere7 = new THREE.Mesh(geometry, material);
          sphere7.position.x = x7[i];
          sphere7.position.y = y7[k];
          sphere7.position.z = z7[j];
          this.scene.add(sphere7);

          this.spheres.push(sphere0);
          this.spheres.push(sphere1);
          this.spheres.push(sphere2);
          this.spheres.push(sphere3);
          this.spheres.push(sphere4);
          this.spheres.push(sphere5);
          this.spheres.push(sphere6);
          this.spheres.push(sphere7);
          */

        }
      }
      xStart = x1 [i];

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
      this.scene.remove(this.crystals[i]);
    }
    for (let i = 0; i < this.spheres.length; ++i){
      this.scene.remove(this.spheres[i]);
    }
    this.spheres = [];
    this.crystals = [];
    this.shape = [];
    this.shape = new THREE.Geometry;
    this.createCrystals();

    if (this.loadCount < 4){
      setTimeout(render, 1000);
      ++this.loadCount;
    } else {
      render();
    }
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
    this.lengthX = newVal;
  }
  changeLengthY(newVal){
    this.lengthY = newVal;
  }
  changeLengthZ(newVal){
    this.lengthZ = newVal;
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
  
    //   this.scene.add(sphere);
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


          this.scene.add(sphere);

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

    this.scene.add(xPole);
    this.scene.add(yPole);
    this.scene.add(zPole);
  }

}
