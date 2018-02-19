class Specimen{
  constructor(shape, countX, countY, countZ, lengthA, lengthB, lengthC, angleA, angleB, angleC, scene){
    switch(shape){
      case 'square':
        this.shape = new THREE.Geometry();
        this.material = new THREE.LineBasicMaterial({color: 0xff37d8});

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
    this.sphereInstances = new Array;
    this.createCrystals();
    this.placeCrystals();
    this.createPoles();

  }

  createCrystals(){
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
    for (let i = 0; i < this.countX; ++i){
      for (let j = 0; j < this.countY; ++j){
        for(let k = 0; k < this.countZ; ++k){
          x1[i] = this.lengthY * Math.cos(this.angleB) * (k+1);
          y1[j] = this.lengthY * Math.cos(this.angleA) * Math.sin(this.angleC) * (k+1);
          z1[k] = this.lengthY * Math.sin(this.angleB) * (k+1);

          x2[i] = this.lengthZ * Math.cos(this.angleC) * (j+1);
          y2[j] = this.lengthZ * Math.sin(this.angleC) * (j+1);
          z2[k] = 0;

          x3[i] = this.lengthX * (i+1);
          y3[j] = 0;
          z3[k] = 0;

          //console.log(y3[j]);

          x4[i] = x1[i] + x2[i];
          y4[j] = y1[j] + y2[j];
          z4[k] = z1[k] + z2[k];

          x5[i] = x1[i] + x3[i];
          y5[j]= y1[j] + y3[j];
          z5[k] = z1[k] + z3[k];

          x6[i] = x3[i] + x2[i];
          y6[j] = y3[j] + y2[j];
          z6[j] = z3[j] + z2[j];

          x7[i] = x1[i] + x6[i];
          y7[j] = y1[j] + y6[j];
          z7[k] = z1[k] + z6[k];

          //create points
          let bottomFrontLeft = new THREE.Vector3(0,0,0);
          let bottomFrontRight = new THREE.Vector3(x3[i], y3[j], z3[k]);
          let topFrontRight = new THREE.Vector3(x5[i], y5[j], z5[k]);
          let topFrontLeft = new THREE.Vector3(x1[i], y1[j], z1[k]);

          let bottomBackLeft = new THREE.Vector3(x2[i], y2[j], z2[k]);
          let bottomBackRight = new THREE.Vector3(x6[i], y6[j], z6[k]);

          let topBackRight = new THREE.Vector3(x7[i], y7[j], z7[k]);
          let topBackLeft = new THREE.Vector3(x4[i], y4[j], z4[k]);


          //Drawing spheres at square points


          // let sgeometry = new THREE.SphereGeometry(2, 4, 4);
          // let smaterial = new THREE.MeshBasicMaterial({color: 0xffffff,wireframe: true, transparent: true});
          // let sphere1= new THREE.Mesh(sgeometry, smaterial);

          // let sgeometry2 = new THREE.SphereGeometry(2, 4, 4);
          // let smaterial2 = new THREE.MeshBasicMaterial({color: 0xffffff,wireframe: true, transparent: true});
          // let sphere2= new THREE.Mesh(sgeometry2, smaterial2);



          // sphere1.translateX(x1[i]);
          // sphere1.translateY(y1[j]);
          // sphere1.translateZ(z1[k]);
          // sphere2.translateX(x2[i]);
          // sphere2.translateY(y2[j]);
          // sphere2.translateZ(z2[k]);

          /*
          sphere.translateX(x3[i]);
          sphere.translateY(y3[j]);
          sphere.translateZ(z3[k]);

          sphere.translateX(x4[i]);
          sphere.translateY(y4[j]);
          sphere.translateZ(z4[k]);
          sphere.translateX(x5[i]);
          sphere.translateY(y5[j]);
          sphere.translateZ(z5[k]);
          sphere.translateX(x6[i]);
          sphere.translateY(y6[j]);
          sphere.translateZ(z6[k]);
          sphere.translateX(x7[i]);
          sphere.translateY(y7[j]);
          sphere.translateZ(z7[k]);

          */
          this.scene.add(sphere1);
          this.scene.add(sphere2);



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
        }
      }
      xStart = x1 [i];
    }
  }

  redrawCrystals(){
    for (let i = 0; i < this.crystals.length; ++i){
      this.scene.remove(this.crystals[i]);
    }
    this.crystals = [];
    this.shape = [];
    this.shape = new THREE.Geometry;
    this.createCrystals();
    //delete old crystals
    //call draw crystal function with new vars
    render();
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

  placeCrystals(){
    // let xOffset = 5;
    // let yOffset =  5;
    // let zOffset = 5;
    // let count = 0;
    // for (let x = 0; x < this.countX; ++x){
    //   for (let y = 0; y < this.countY; ++y){
    //     this.crystals[count].lines.translateX(xOffset);
    //     this.crystals[count].lines.translateY(yOffset + this.height * y);
    //     this.crystals[count].lines.translateZ(zOffset);
    //     ++count;
    //   }
    //   xOffset += 10;
    // }
  }

  drawShape(scene){
    // for (let i = 0; i < this.countX * this.countY; ++i){
    //   if (this.crystals[i]){
    //     scene.add(this.crystals[i].lines);
    //   }
    // }
  }

  addSphere(crystalX, crystalY, crystalZ, crystalColor, index){
    this.spheres.push({x: crystalX, y: crystalY, z: crystalZ, color: crystalColor, index: index});
    let instances = new Array;
    for (let x = 0; x < this.countX; ++x){
      for (let y = 0; y < this.countY; ++y){
        let geometry = new THREE.SphereGeometry(0.25, 4, 4);
        let material = new THREE.MeshBasicMaterial({color: crystalColor,wireframe: true, transparent: true});
        let sphere = new THREE.Mesh(geometry, material);
        sphere.name = index;

        sphere.translateX((crystalX * this.width)+ x * this.width);
        sphere.translateY((crystalY * this.height) + y * this.height);
        sphere.translateZ(crystalZ * this.depth);

        this.scene.add(sphere);
        this.sphereInstances.push(sphere);
      }
    }
    console.log(this.sphereInstances);
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
    this.countX = newVal
  }

  changeYCount(newVal){
    this.countY = newVal
  }

  changeZCount(newVal){
    this.countZ = newVal
  }
  redrawSpheres(){
    for (let i = 0; i < this.crystals.length; ++i){
      for (let x = 0; x < this.countX; ++x){
        for (let y = 0; y < this.countY; ++y){
          let geometry = new THREE.SphereGeometry(0.25, 4, 4);
          let material = new THREE.MeshBasicMaterial({color: crystalColor,wireframe: true, transparent: true});
          let sphere = new THREE.Mesh(geometry, material);

          sphere.translateX((this.spheres[i].x * this.width)+ x * this.width);
          sphere.translateY((this.spheres[i].y * this.height) + y * this.height);
          sphere.translateZ(this.spheres[i].z * this.depth);

          this.scene.add(sphere);

        }
      }
    }
  }
}
