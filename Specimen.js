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

    this.object = new THREE.Mesh(this.shape, this.material);

  }
  
  drawShape(scene){
    scene.add(this.object)
  }

  rotateObject(){
    this.object.rotation.x += 0.004;
    this.object.rotation.y += 0.004;

  }
}