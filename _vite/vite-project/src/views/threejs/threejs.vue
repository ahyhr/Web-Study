<template>
  <div ref="threeRef" class="threejs"></div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const threeRef = ref<HTMLElement | null>(null);

onMounted(() => {
  init();
});

function init() {
  let mixer: any;

  const clock = new THREE.Clock();
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(threeRef.value?.offsetWidth!, threeRef.value?.clientHeight!);
  renderer.outputEncoding = THREE.sRGBEncoding;
  threeRef.value?.appendChild(renderer.domElement);

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfe3dd);
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(40, threeRef.value?.offsetWidth! / threeRef.value?.clientHeight!, 1, 100);
  camera.position.set(5, 2, 8);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0.5, 0);
  controls.update();
  controls.enablePan = false;
  controls.enableDamping = true;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/gltf/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load(
    "/LittlestTokyo.glb",
    function (gltf) {
      const model = gltf.scene;
      model.position.set(1, 1, 0);
      model.scale.set(0.01, 0.01, 0.01);
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      mixer.clipAction(gltf.animations[0]).play();

      animate();
    },
    undefined,
    function (e) {
      console.error(e);
    }
  );

  window.onresize = function () {
    camera.aspect = threeRef.value?.offsetWidth! / threeRef.value?.clientHeight!;
    camera.updateProjectionMatrix();
    renderer.setSize(threeRef.value?.offsetWidth!, threeRef.value?.clientHeight!);
  };

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixer.update(delta);
    controls.update();
    renderer.render(scene, camera);
  }
}
</script>

<style lang="scss" scoped>
.threejs {
  width: 100%;
  height: 100%;
}
</style>
