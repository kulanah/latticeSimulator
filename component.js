class component {
  constructor(originSide, height, centerPoint, y, focalLength){
    this.originSide = originSide;
    this.height = height;
    this.centerPoint = centerPoint;
    this.y = y;
    this.focalLength = focalLength;


    this.created = false;
    this.shape = new THREE.Shape();

    if (this.originSide === 'left'){
      this.xOffSet = 0;
      this.oppSide = centerPoint * 2;
    } else {
      this.oppSide = 0;
      this.xOffSet = centerPoint * 2;
    }

    this.material = new THREE.MeshBasicMaterial({color: 0xff37d8})
  };


  createLens(){
    //TODO: create lens stuff
    this.shape.moveTo(this.xOffset, this.y);
    this.shape.lineTo(this.centerPoint, this.focalLength);
    this.shape.lineTo(this.oppSide, this.focalLength * 2);
    this.shape.lineTo(this.oppSide, this.focalLength * 4);
    this.shape.lineTo(this.xOffset, this.y);
    this.shape.lineTo(this.xOffset, this.focalLength * 2);
    this.shape.lineTo(this.centerPoint, this.focalLength * 3);
    this.shape.lineTo(this.oppSide, this.focalLength * 4);

    this.geometry = new THREE.ShapeGeometry(this.shape);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  drawLens(scene){
    if (!this.created){
      this.createLens();
    } 
    scene.add(this.mesh);
  }
}