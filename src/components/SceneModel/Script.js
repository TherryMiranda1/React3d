import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

//Global variables
let currentRef = null;

//Scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 100 / 100, 0.1, 100);
const camera2 = new THREE.PerspectiveCamera(50, 100 / 100, 0.1, 100);

scene.add(camera);
camera.position.set(5, 0, -1);
camera2.position.set(5, 0, -1);
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

//Load model 3d
const loadingManager = new THREE.LoadingManager(
  () => {
    console.log("todo cargado");
  },
  (itemsUrl, itemsToLoad, itemsLoaded) => {
    console.log(((itemsToLoad / itemsLoaded) * 100).toFixed(0) + "%");
  },
  () => {}
);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco copy/");

const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load(
  "./draco/helmet.gltf",
  (gltf) => {
    while (gltf.scene.children.length) {
      console.log(gltf.scene.children[0]);
      scene.add(gltf.scene.children[0]);
      gltf.scene.children[0].position.set(15,10, -10)
    }
  },
  () => {
    console.log("cargando");
  },
  () => {
    console.log("error");
  }
);

// Ligths
const ligth1 = new THREE.DirectionalLight(0xffffff, 3);
ligth1.position.set(4, 4, 4);
//scene.add(ligth1);

const al1 = new THREE.AmbientLight(0xffffff, 1);
scene.add(al1);

const environmentMap = new THREE.CubeTextureLoader();
const envMap = environmentMap.load([
  "./envmap/px.png",
  "./envmap/nx.png",
  "./envmap/py.png",
  "./envmap/nx.png",
  "./envmap/pz.png",
  "./envmap/nz.png",
]);
scene.environment = envMap;
scene.background = envMap;

//Init and mount the scene
export const initScene = (mountRef) => {
  currentRef = mountRef.current;
  resize();
  currentRef.appendChild(renderer.domElement);
};

//Dismount and clena up the buffer from the scene
export const cleanUpScene = () => {
  scene.dispose();
  currentRef.removeChild(renderer.domElement);
};
