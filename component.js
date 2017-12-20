class component {
  constructor(originSide, height, centerPoint, y, focalLength, width){
    this.originSide = originSide;
    this.height = height;
    this.centerPoint = centerPoint;
    this.y = y;
    this.focalLength = focalLength;
    this.width = width;

    this.shape = new THREE.Shape();

    if (this.originSide === 'left'){
      this.xOffSet = 0;
    } else {
      this.xOffSet = centerPoint + width;
    }
  };


  createLens(){
    if(this.originSide === 'left'){

    } else {

    }

    this.shape.moveTo()
  }
}