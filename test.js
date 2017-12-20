let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.SphereGeometry(1, 9, 9);
let material = new THREE.MeshBasicMaterial({color: 0xff69b4});

let eye1 = new THREE.Shape();

eye1.moveTo(-2, 0, -20);
eye1.lineTo(5, -3, -20);
eye1.lineTo(2, 4, -20);


let eyeGeom = new THREE.ShapeGeometry(eye1);
let eyeMat = new THREE.MeshBasicMaterial({color: 0xffffff});
let eyeMesh = new THREE.Mesh(eyeGeom, eyeMat);


let eyeball1 = new THREE.Mesh(geometry, material);
let eyeball2 = new THREE.Mesh(geometry, material);
eyeball2.position.x = 5;
eyeball2.position.z = -10;
eyeball1.position.z = -10;

// scene.add(eyeMesh);
scene.add(eyeball2);
scene.add(eyeball1);



camera.position.x = 5;
camera.position.z = 10;
camera.position.y = -1;

let animate = function(){
  requestAnimationFrame(animate);
  // cone.rotation.x += 0.01;
  // cone.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();