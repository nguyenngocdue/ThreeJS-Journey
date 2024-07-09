import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import * as dat from 'lil-gui';
import gsap from 'gsap';


/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0,
}
window.addEventListener('mousemove', (event) => {
    cursor.x = -(event.clientX / sizes.width - 0.5);
    cursor.y = event.clientY / sizes.height - 0.5;
})


// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// const geometry = new THREE.SphereGeometry(1, 12, 12);


// using BufferGeometry
const geometry = new THREE.BufferGeometry();

const positionsArray = new Float32Array([
    0, 0, 0, // Vertex 1
    1, 0, 0, // Vertex 2
    1, 1, 0, // Vertex 3
    0, 1, 0, // Vertex 4
    0, 0, 1, // Vertex 5
    1, 0, 1, // Vertex 6
    1, 1, 1, // Vertex 7
    0, 1, 1  // Vertex 8
]);

const indices = [
    0, 1, 2, 0, 2, 3, // Front face
    1, 5, 6, 1, 6, 2, // Right face
    5, 4, 7, 5, 7, 6, // Back face
    4, 0, 3, 4, 3, 7, // Left face
    3, 2, 6, 3, 6, 7, // Top face
    4, 5, 1, 4, 1, 0  // Bottom face
];

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute('position', positionsAttribute);
geometry.setIndex(indices);


// GUI
/**
 * Debug
 */
// const gui = new GUI();
const gui = new dat.GUI();
const debugObject = {};
debugObject.color = '3a6ea6';



gui.addColor(debugObject, 'color').onChange((value) => {
    material.color.set(debugObject.color);
});

// Create Mesh with Material
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true });
const boxMesh = new THREE.Mesh(geometry, material);


gui.add(boxMesh.position, 'y').min(-3).max(3).step(0.01).name('elevation');
gui.add(boxMesh, 'visible')
gui.add(material, 'wireframe')

debugObject.spin = () => {
    gsap.to(boxMesh.rotation, { duration: 1, y: boxMesh.rotation.y + Math.PI * 2 })
}
gui.add(debugObject, 'spin')




// Add to Scene
scene.add(boxMesh);

//mesh.position.x = 2
// mesh.position.y = 0
// mesh.rotation.z = 0;





// size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 1000);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1 * aspectRatio, -1 * aspectRatio, 0.1, 1000);
// camera.position.z = 5;
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(boxMesh.position);
scene.add(camera);


// canvas
const canvas = document.querySelector('canvas.webgl');
// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

// Animate
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // // Update objects
    // mesh.rotation.y = elapsedTime

    // // Update camera
    // // camera.position.x = cursor.x * 10;
    // // camera.position.y = cursor.y * 10;
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position);

    // Update objects

    // Update controls
    controls.update();

    // // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    // window.requestAnimationFrame(tick);

    // // Render
    // renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}
tick()




// Axes Helpers
// const axesHelper = new THREE.AxesHelper(2);
// mesh.scale.x = 0
// mesh.scale.y = 0
// mesh.scale.z = 0
// scene.add(axesHelper);


function animate() {
    // console.log(mesh.position.distanceTo(camera.position))
    // console.log(mesh.position.normalize())
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// animate(); // Start the animation loop
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


// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.z = Math.PI * 0.25


// resize
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

})

// double click
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullScreenElement
    if (!fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        };
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
})