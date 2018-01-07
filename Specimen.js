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

    this.createCrystals = this.createCrystals.bind(this);
    this.crystals = new Array;
    this.createCrystals(countX, countY);
  }

  createCrystals(countX, countY){
    for (let x = 0; x < countX; ++x){

      let materials = new THREE.MeshBasicMaterial ({color: 0xff37d8, wireframe: true, transparent: true})
      let edges = new THREE.EdgesGeometry(this.shape);
      let lines = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0xff37d8}));
      this.crystals[x] = {
        materials: materials,
        edges: edges,
        lines: lines,
      };
      
      if(x > 0){
        this.crystals[x].lines.translateX(this.width * x);

      }

    }
  }
  
  drawShape(scene){
    scene.add(this.crystals[0].lines);
  }

  createSpheres(){
    this.spheres = [];
    for (let i = 0; i < 16; ++i){
      this.spheres.push({
        geometry: new THREE.SphereGeometry(0.25, 4, 4),
        material: new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true, transparent: true}),
      });
      this.spheres[i].sphere = new THREE.Mesh(this.spheres[i].geometry, this.spheres[i].material)
    }
  }

  placeSpheres(){
    for (let i = 0; i < 16; i += 4){
      this.spheres[i].sphere.translateX(this.width / i * 2);
      this.spheres[i].sphere.translateY(this.height / i * 2);
      this.spheres[i].sphere.translateZ(this.depth / i * 2);
      scene.add(this.spheres[i].sphere);

      this.spheres[i + 1].sphere.translateX(-this.width / i * 2);
      this.spheres[i + 1].sphere.translateY(this.height / i * 2);
      this.spheres[i + 1].sphere.translateZ(-this.depth / i * 2);
      scene.add(this.spheres[i + 1].sphere);

      this.spheres[i + 2].sphere.translateX(-this.width / i * 2);
      this.spheres[i + 2].sphere.translateY(this.height / i * 2);
      this.spheres[i + 2].sphere.translateZ(this.depth / i * 2);
      scene.add(this.spheres[i + 2].sphere);

      this.spheres[i + 3].sphere.translateX(this.width / i * 2);
      this.spheres[i + 3].sphere.translateY(this.height / i * 2);
      this.spheres[i + 3].sphere.translateZ(-this.depth / i * 2);
      scene.add(this.spheres[i + 3].sphere);

    }

  }
}