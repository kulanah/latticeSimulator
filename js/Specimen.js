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
    let x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, x5, y5, z5, x6, y6, z6, x7, y7, z7;

    let xStart = 0;
    
    for (let y = 0; y < this.countY; ++y){
      for (let x = 0; x < this.countX; ++x){
        x1 = this.lengthY * Math.cos(this.angleB) + xStart;
        y1 = this.lengthY * Math.cos(this.angleA) * Math.sin(this.angleC) + this.lengthY * y;
        z1 = this.lengthY * Math.sin(this.angleB);

        x2 = this.lengthZ * Math.cos(this.angleC) + xStart;
        y2 = this.lengthZ * Math.sin(this.angleC) + this.lengthY * y;
        z2 = 0;

        x3 = Number(Number(this.lengthX) + (this.lengthX * x)) + xStart;
        y3 = 0 + this.lengthY * y;
        z3 = 0;

        console.log(y3);
        x4 = x1 + x2;
        y4 = y1 + y2;
        z4 = z1 + z2;
        
        x5 = Number(x1) + Number(x3);
        y5 = y1 + y3;
        z5 = z1 + z3;

        x6 = Number(x3) + Number(x2);
        y6 = y3 + y2;
        z6 = z3 + z2;

        x7 = Number(x1) + Number(x6);
        y7 = y1 + y6;
        z7 = z1 + z6;

        //create points
        let bottomFrontLeft = new THREE.Vector3(0 + xStart,0 + this.lengthY * y,0);
        let bottomFrontRight = new THREE.Vector3(x3, y3, z3);
        let topFrontRight = new THREE.Vector3(x5, y5, z5);
        let topFrontLeft = new THREE.Vector3(x1, y1, z1);

        let bottomBackLeft = new THREE.Vector3(x2, y2, z2);
        let bottomBackRight = new THREE.Vector3(x6, y6, z6);

        let topBackRight = new THREE.Vector3(x7, y7, z7);
        let topBackLeft = new THREE.Vector3(x4, y4, z4);

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
      xStart = x1;

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