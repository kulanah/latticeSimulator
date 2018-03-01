//To load this use the command line "http-server ." in the root directory
//this needs to be run inorder to serve the blender file
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1500);
let mesh = null;

let init = function(){
  camera.position.set(0, 3.5, 5);
  camera.lookAt(scene.position);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = 'threeCanvas';
  document.body.appendChild(renderer.domElement);

  controls = new THREE.TrackballControls(camera, document.getElementById('threeCanvas'));
  controls.addEventListener('change', render);
}

render = function(){
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

let initMesh = function() {
    var loader = new THREE.JSONLoader();
    loader.load('http://127.0.0.1:8080/json/marmelab.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        mesh.translation = THREE.GeometryUtils.center(geometry);
        scene.add(mesh);
    });
}

let initMesh = function(){
  let loader = new THREE.JSONLoader();
  loader.load("http://127.0.0.1:8080", function(geometry){
    mesh = new THREE.Mesh(geometry);
    scene.add(mesh);
  });

}

init();
render();
