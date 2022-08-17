import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";

//Global variables
let currentRef = null;





//Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25, 100 / 100, 0.1, 100);
scene.add(camera);
camera.position.set(5, 5, 5);
camera.lookAt(new THREE.Vector3());

const renderer = new THREE.WebGLRenderer();
renderer.setSize(100, 100);

//OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

//Resize canvas
const resize = () => {
  renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
  camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", resize);

//Animate the scene
const animate = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();

//cube

const material = new THREE.MeshBasicMaterial({ wireframe: true });
let geometry = new THREE.BoxBufferGeometry(1, 1, 1);

let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// gui

const gui = new dat.GUI();
const cubo = gui.addFolder("Cubo");

const positions = cubo.addFolder("Positions");

positions.add(cube.position, "x").min(-10).max(10).step(0.5).name("pos X");
positions.add(cube.position, "y").min(-10).max(10).step(0.5).name("pos Y");
positions.add(cube.position, "z").min(-10).max(10).step(0.5).name("pos Z");

const cubeAux = { scale: 1, color: 0xffffff };

const scale = cubo.addFolder("Scale");
scale
  .add(cubeAux, "scale", { Small: 1, medium: 3, big: 7 })
  .name("scale")
  .onChange(() => {
    cube.scale.set(cubeAux.scale, cubeAux.scale, cubeAux.scale);
  });

const color = cubo.addFolder("Color");

color.addColor(cubeAux, "color").onChange(() => {
  cube.material.color.set(cubeAux.color);
});

const cubeAuxPro = {
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
  subX: 1,
  subY: 1,
  subZ: 1,
};

const cubeFolder = cubo.addFolder("Cube Tweaks");
cubeFolder
  .add(cubeAuxPro, "scaleX")
  .min(1)
  .max(3)
  .onChange(() => {
    cube.scale.x = cubeAuxPro.scaleX;
  });
cubeFolder
  .add(cubeAuxPro, "scaleY")
  .min(1)
  .max(3)
  .onChange(() => {
    cube.scale.y = cubeAuxPro.scaleY;
  });
cubeFolder
  .add(cubeAuxPro, "scaleY")
  .min(1)
  .max(3)
  .onChange(() => {
    cube.scale.z = cubeAuxPro.scaleY;
  });

// Subdivisiones
cubeFolder
  .add(cubeAuxPro, "subX")
  .min(1)
  .max(100)
  .step(1)
  .onChange(() => {
    scene.remove(cube);
    geometry = new THREE.BoxBufferGeometry(
      cubeAuxPro.scaleX,
      cubeAuxPro.scaleY,
      cubeAuxPro.scaleZ,
      cubeAuxPro.subX,
      cubeAuxPro.subY,
      cubeAuxPro.subZ
    );
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  });

  cubeFolder
  .add(cubeAuxPro, "subY")
  .min(1)
  .max(100)
  .step(1)
  .onChange(() => {
    scene.remove(cube);
    geometry = new THREE.BoxBufferGeometry(
      cubeAuxPro.scaleX,
      cubeAuxPro.scaleY,
      cubeAuxPro.scaleZ,
      cubeAuxPro.subX,
      cubeAuxPro.subY,
      cubeAuxPro.subZ
    );
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  });

  cubeFolder
  .add(cubeAuxPro, "subZ")
  .min(1)
  .max(100)
  .step(1)
  .onChange(() => {
    scene.remove(cube);
    geometry = new THREE.BoxBufferGeometry(
      cubeAuxPro.scaleX,
      cubeAuxPro.scaleY,
      cubeAuxPro.scaleZ,
      cubeAuxPro.subX,
      cubeAuxPro.subY,
      cubeAuxPro.subZ
    );
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  });

//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
  scene.dispose();
  // gui.destroy();
  currentRef.removeChild(renderer.domElement);
};
