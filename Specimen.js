class Specimen{
  constructor(shape, count){
    switch(shape){
      case 'square': 
        this.shape = new THREE.BoxGeometry(10, 10, 10);
        this.width = 10;
        this.height = 10;
        this.depth = 10;
        break;
    }

    this.material = new THREE.MeshBasicMaterial ({color: 0xff37d8, wireframe: true, transparent: true})
    this.edges = new THREE.EdgesGeometry(this.shape);
    this.line = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({color: 0xff37d8}));
    this.angle = 0.1;

  }
  
  drawShape(scene){
    scene.add(this.line)
  }

  rotateObject(camera){
    
    camera.position.x = 500 * Match.cos(this.angle);
    camera.position.z = 500 * Match.sin(this.angle);
    this.angle += 0.1;
    // this.line.rotation.x += 0.006;
    // this.line.rotation.y -= 0.004;
  }

  createSpheres(){
    this.spheres = [];
    for (let i = 0; i < 16; ++i){
      this.spheres.push({
        geometry: new THREE.SphereGeometry(0.25, 11, 11),
        material: new THREE.MeshBasicMaterial({color: 0xffff00}),
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