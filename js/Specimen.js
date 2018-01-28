class Specimen{
  constructor(shape, countX, countY, scene){
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
    this.scene = scene;
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
    let xOffset = 5;
    let yOffset =  5;
    let zOffset = 5;
    let count = 0;
    for (let x = 0; x < this.countX; ++x){
      for (let y = 0; y < this.countY; ++y){
        this.crystals[count].lines.translateX(xOffset);
        this.crystals[count].lines.translateY(yOffset + this.height * y);
        this.crystals[count].lines.translateZ(zOffset);
        ++count;
      }
      xOffset += 10;
    }

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
    for (let x = 0; x < this.countX; ++x){
      for (let y = 0; y < this.countY; ++y){
        let geometry = new THREE.SphereGeometry(0.25, 4, 4);
        let material = new THREE.MeshBasicMaterial({color: crystalColor,wireframe: true, transparent: true});    
        let sphere = new THREE.Mesh(geometry, material);

        sphere.translateX((crystalX * this.width)+ x * this.width);
        sphere.translateY((crystalY * this.height) + y * this.height);
        sphere.translateZ(crystalZ * this.depth);
        
        this.scene.add(sphere);
      }
    }
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