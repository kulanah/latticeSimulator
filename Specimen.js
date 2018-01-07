class Specimen{
  constructor(shape, countX, countY){
    switch(shape){
      case 'square': 
        this.shape = new THREE.BoxGeometry(10, 10, 10);
        this.width = 10;
        this.height = 10;
        this.depth = 10;
        break;
    }

    this.countX = countX;
    this.countY = countY;

    this.createCrystals = this.createCrystals.bind(this);
    this.crystals = new Array;
    this.spheres = new Array;
    this.createCrystals();
    this.placeCrystals();
  }

  createCrystals(){
    for (let x = 0; x < this.countX; ++x){
      for (let y = 0; y < this.countY; ++y){
        let materials = new THREE.MeshBasicMaterial ({color: 0xff37d8, wireframe: true, transparent: true})
        let edges = new THREE.EdgesGeometry(this.shape);
        let lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xff37d8}));
        this.crystals.push({
          materials: materials,
          edges: edges,
          lines: lines,
          spheres: new Array,
        });
      }
    }
  }

  placeCrystals(){
    let xOffset = 0;
    let count = 0;
    for (let x = 0; x < this.countX; ++x){
      for (let y = 0; y < this.countY; ++y){
        this.crystals[count].lines.translateX(xOffset);
        this.crystals[count].lines.translateY(this.height * y);
        ++count;
      }
      xOffset += 10;
    }

  }
  
  drawShape(scene){
    this.createSpheres();
    this.placeSpheres();
    for (let i = 0; i < this.countX * this.countY; ++i){
      if (this.crystals[i]){
        scene.add(this.crystals[i].lines);
        this.addSpheresToScene(this.crystals[i], scene);
      }
    }
  }

  addSphere(hMult, wMult, dMult){
    this.spheres.push({
      xMult: hMult, 
      yMult: wMult, 
      zMult: dMult,
    });
  }

  createSpheres(){
    for (let i = 0; i < this.crystals.length; ++i){
      for (let j = 0; j < this.spheres.length; ++j){
        this.crystals[i].spheres.push({
          geometry: new THREE.SphereGeometry(0.25, 4, 4),
          material: new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true, transparent: true}),
        });
        this.crystals[i].spheres[j].sphere = new THREE.Mesh(this.crystals[i].spheres[j].geometry, this.crystals[i].spheres[j].material)
      }
    }
  }

  placeSpheres(scene){
    let xOffset = -this.height / 2;
    let yOffset = -this.width / 2;
    let zOffset = -this.depth / 2;
    let count = 0;
    for (let x = 0; x < this.countX; ++x){
      yOffset = -this.width / 2;
      for (let y = 0; y < this.countY; ++y){
        this.placeSpheresInCrystal(count, xOffset, yOffset, zOffset);
        ++count;
        yOffset += this.width;
      }
      xOffset += this.height;
    }
  }

  placeSpheresInCrystal(crystalIndex, xOffset, yOffset, zOffset){
    for (let i = 0; i < this.spheres.length; ++i){
      this.crystals[crystalIndex].spheres[i].sphere.translateX(xOffset + this.height * this.spheres[i].xMult)
      this.crystals[crystalIndex].spheres[i].sphere.translateY(yOffset + this.width * this.spheres[i].yMult)
      this.crystals[crystalIndex].spheres[i].sphere.translateZ(zOffset + this.depth * this.spheres[i].zMult);

      // this.crystals[crystalIndex].spheres[i].sphere.translateX(xOffset + this.spheres[i].hMult * this.height);
      // this.crystals[crystalIndex].spheres[i].sphere.translateY(yOffset + this.spheres[i].wMult * this.width);
      // this.crystals[crystalIndex].spheres[i].sphere.translateZ(this.spheres[i].dMult * this.depth);
    }
  }
  addSpheresToScene(crystal, scene){
    for (let i = 0; i < crystal.spheres.length; ++i){
      scene.add(crystal.spheres[i].sphere);
    }
  }
}