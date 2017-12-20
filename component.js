class component {
  constructor(originSide, height, centerPoint, xOffset, y, focalLength){
    this.originSide = originSide;
    this.height = height;
    this.centerPoint = centerPoint;
    this.xOffset = xOffset;
    this.y = y;
    this.focalLength = focalLength;
    this.shape = new THREE.Shape();
  };

  createLens(){
    this.shape.moveTo()

  }

}