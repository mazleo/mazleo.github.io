// Initialize containers
var container = document.getElementById('retro-night');

$(window).on('resize', function() {
  $('canvas').css('width', container.offsetWidth);
  $('canvas').css('height', container.offsetHeight);
});
var scene = new THREE.Scene();
var spotlight = new THREE.SpotLight(0xffffff);
spotlight.position.set(0, 400, -1000);
spotlight.intensity = 3;
spotlight.castShadow = false;
scene.add(spotlight);

var camera = new THREE.PerspectiveCamera(30, container.offsetWidth / container.offsetHeight, 0.1, 1500);
//camera.lookAt(new THREE.Vector3(0, 0, -100));
camera.position.set(100, 50, 500);
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

var geometry = new THREE.PlaneGeometry(container.offsetWidth * 4, container.offsetHeight * 100, 300, 500);

      for (var i = 0; i < geometry.vertices.length; i++) {
        if (i % 2 === 0 || i % 5 === 0 || i % 7 === 0) {
          var num = Math.floor(Math.random() * 70) + 10;
          geometry.vertices[i].z = Math.random() * num;
        }
      }

var material = new THREE.MeshLambertMaterial({
  color: 0x000000
});

var wireMaterial = new THREE.MeshLambertMaterial({
  color: 0x0477F4,
  // color: 0xffffff,
  wireframe: true,
  wireframeLinewidth: 1
});

var terrain = new THREE.Mesh(geometry, material);
var wire = new THREE.Mesh(geometry, wireMaterial);

terrain.rotation.x = -Math.PI / 2;
terrain.position.y = -100;
wire.rotation.x = -Math.PI / 2;
wire.position.y = -100;

//camera.position.z = 700;
//camera.rotation.y = .01;
scene.add(terrain, wire);

function animate() {
  requestAnimationFrame(animate);
  if (camera.position.z < -11000) {
    camera.position.z = 500;
    spotlight.position.z = -1000;
  }
  camera.position.z -= 1;
  spotlight.position.z -= 1;
  renderer.render(scene, camera);
}

animate();