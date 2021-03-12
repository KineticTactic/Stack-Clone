import * as THREE from "https://unpkg.com/three/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three/examples/jsm/controls/OrbitControls.js";
import BoxManager from "./BoxManager.js";

const scene = new THREE.Scene();

const aspect = window.innerWidth / window.innerHeight;
const orthoSize = 3;
const camera = new THREE.OrthographicCamera(
    -aspect * orthoSize,
    aspect * orthoSize,
    orthoSize,
    -orthoSize,
    0.1,
    1000
);
console.log(-aspect * orthoSize, aspect * orthoSize);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// ----------------------------------
// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 10, 3);
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
scene.add(pointLightHelper);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

const boxManager = new BoxManager(scene);
boxManager.addBox();

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    boxManager.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        boxManager.plop();
        camera.position.set(camera.position.x, camera.position.y + 0.5, camera.position.z);
        light.position.set(light.position.x, light.position.y + 0.5, light.position.z);
    }
});
