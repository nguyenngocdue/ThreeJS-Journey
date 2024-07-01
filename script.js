import * as THREE from 'three'

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
mesh.position.x = 0.7
mesh.position.y = 0.6
mesh.rotation.z = 1;



// size
const sizes = {
    width: 800,
    height: 600
}


// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);


// canvas
const canvas = document.querySelector('canvas.webgl');
// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Axes Helpers
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);


function animate() {
    // console.log(mesh.position.distanceTo(camera.position))
    // console.log(mesh.position.normalize())
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

animate(); // Start the animation loop
// Slider controls
const xSlider = document.getElementById('x-slider');
const ySlider = document.getElementById('y-slider');
const zSlider = document.getElementById('z-slider');

xSlider.addEventListener('input', function () {
    mesh.position.x = parseFloat(xSlider.value);
});

ySlider.addEventListener('input', function () {
    mesh.position.y = parseFloat(ySlider.value);
});

zSlider.addEventListener('input', function () {
    mesh.rotation.z = parseFloat(zSlider.value);
});


