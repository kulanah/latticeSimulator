class column{
  constructor(){
    this.components = new Array();
    //radius top, radius bottom, height, radial segments, height segments, open ended, theta start, theta length
    this.cMaterial = new THREE.CylinderGeometry(10, 10, 40, 20, 1, true, 1.4, 3.14);
    this.cGeometry = new THREE.MeshPhongMaterial({
      side:  THREE.DoubleSide, 
      wireframe: false, 
      color: 0xaaaaaa
    });
    this.cMesh = new THREE.Mesh(this.cMaterial, this.cGeometry);

    this.init = this.init.bind(this);
  }

  addLens(originSide, height, centerPoint, y, focalLength){
    let newComp = new component(originSide, height, centerPoint, y, focalLength);
    this.components.push(newComp);
  }

  drawLenses(scene, renderer, camera){
    this.components.map((current) => {
      current.drawLens(scene);
    });

    renderer.render(scene, camera);
  }

  drawColumn(){
    scene.add(this.cMesh);

  }


  init(){
    this.drawColumn();
  }

}