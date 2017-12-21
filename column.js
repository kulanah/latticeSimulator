class column{
  constructor(){
    this.components = new Array();
  }

  addLens(originSide, height, centerPoint, y, focalLength){
    let newComp = new component(originSide, height, centerPoint, y, focalLength);
    this.components.push(newComp);
  }

  drawLenses(scene){
    this.components.map((current) => {
      current.drawLens(scene);
    });
  }
}