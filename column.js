class column{
  constructor(){
    this.components = new Array();
  }

  addLens(originSide, height, centerPoint, y, focalLength){
    components.push(new component(originSide, height, centerPoint, y, focalLength));
  }

  drawLenses(scene){
    this.components.map((current) => {
      current.drawLens(scene);
    });
  }
}