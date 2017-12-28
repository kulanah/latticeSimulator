class Specimen{
  constructor(shape, x, y, z, count){
    switch(shape){
      case 'square': 
        this.shape = new THREE.BoxGeometry(1, 1, 1);
        this.shape.x = x;
        this.shape.y = y;
        this.shape.z = z;
        break;
    }

    this.material = new THREE.MeshBasicMaterial ({color: 0xff37d8, wireframe: true, transparent: true})
    this.edges = new THREE.EdgesGeometry(this.shape);
    this.line = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({color: 0xff37d8}));


    this.object = new THREE.Mesh(this.shape, this.material);

  }
  
  drawShape(scene){
    scene.add(this.line)
  }

  rotateObject(){
    this.line.rotation.x += 0.004;
    this.line.rotation.y += 0.004;

  }
}