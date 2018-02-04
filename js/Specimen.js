class Specimen{
  constructor(shape, countX, countY, lengthA, lengthB, lengthC, angleA, angleB, angleC, scene){
    switch(shape){
      case 'square': 
        this.shape = new THREE.Geometry();
        this.material = new THREE.LineBasicMaterial({color: 0xff37d8});

        this.width = lengthA;
        this.height = lengthB;
        this.depth = lengthC;
        break;
    }

    this.countX = countX;
    this.countY = countY;

    this.scene = scene;

    this.createCrystals = this.createCrystals.bind(this);
    this.crystals = new Array;
    this.spheres = new Array;
    this.sphereInstances = new Array;
    this.createCrystals();
    this.placeCrystals();
    

    //this is all for the rewrite to angles and lengths
    this.angleA = angleA;
    this.angleB = angleB;
    this.angleC = angleC;
  }

  createCrystals(){
    let depthValue = this.depth / Math.cos(this.angleA);
    let widthDifference = this.width - (Math.tan(180 - this.angleA) * this.depth);
    
    this.shape.vertices.push(new THREE.Vector3(0, 0, 0));
    this.shape.vertices.push(new THREE.Vector3(this.width, 0, 0));
    this.shape.vertices.push(new THREE.Vector3(widthDifference, depthValue, 0));
    this.shape.vertices.push(new THREE.Vector3(0 - widthDifference, depthValue, 0));
    this.shape.vertices.push(new THREE.Vector3(0, 0, 0));

    // this.shape.vertices.push(new THREE.Vector3(0, 0, this.depth));
    // this.shape.vertices.push(new THREE.Vector3(0, 0, 0));



    // for (let x = 0; x < this.countX; ++x){
    //   for (let y = 0; y < this.countY; ++y){
    //     let materials = new THREE.MeshBasicMaterial ({color: 0xff37d8, wireframe: true, transparent: true})
    //     let edges = new THREE.EdgesGeometry(this.shape);
    //     let lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xff37d8}));
    //     this.crystals.push({
    //       materials: materials,
    //       edges: edges,
    //       lines: lines,
    //       spheres: new Array,
    //     });
    //   }
    // }
    this.line = new THREE.Line(this.shape, this.material);

    //TODO: MOVE THIS OUT OF THIS FUNCTION
    this.scene.add(this.line); 
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
    for (let i = 0; i < this.countX * this.countY; ++i){
      if (this.crystals[i]){
        scene.add(this.crystals[i].lines);
      }
    }
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