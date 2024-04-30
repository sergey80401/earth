<script setup lang="ts">
import { ref, onMounted, unref, watch } from "vue";
import * as THREE from "three";
import { useMap, useMarker, useGeolocation } from "@/hooks";

const { addMarker } = useMarker();
const { position } = useGeolocation();

onMounted(() => {
  const { map } = useMap();

  const modelOrigin =[0, 0];
  const modelAltitude = 0;
  const modelRotate = [Math.PI / 2, 0, 0];

  const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
  );

  watch(position, ()=> addMarker([position.value?.longitude, position.value?.latitude], map))

  // transformation parameters to position, rotate and scale the 3D model onto the map
  const modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since our 3D model is in real world meters, a scale transform needs to be
     * applied since the CustomLayerInterface expects units in MercatorCoordinates.
     */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
  };

  const customLayer = {
    id: "3d-model",
    type: "custom",
    renderingMode: "3d",
// 10000, 200
    onAdd(map, gl) {
      this.camera = new THREE.Camera();
      this.scene = new THREE.Scene();

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({
          opacity: 0.5,
          color: "white",
          side: THREE.DoubleSide,
          transparent: true,
        })
      ).rotateX(-Math.PI / 2);
      plane.receiveShadow = true;

      const grid = new THREE.GridHelper(40000000, 100000, "red", "red");

      const group = new THREE.Group();
      group.add(plane, grid);

      this.scene.add(group);

      this.map = map;

      // use the MapLibre GL JS map canvas for three.js
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
      });

      this.renderer.autoClear = false;
    },

    render(gl, matrix) {
      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        modelTransform.rotateX
      );
      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        modelTransform.rotateY
      );
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        modelTransform.rotateZ
      );

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(
          modelTransform.translateX,
          modelTransform.translateY,
          modelTransform.translateZ
        )
        .scale(
          new THREE.Vector3(
            modelTransform.scale,
            -modelTransform.scale,
            modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);

      this.camera.projectionMatrix = m.multiply(l);
      this.renderer.resetState();
      this.renderer.render(this.scene, this.camera);
      // this.map.triggerRepaint();
    },
  };

  map.value.on("style.load", () => {
    map.value.addLayer(customLayer);
  });
});
</script>

<template>
  <div id="map" style="width: 100%; height: 1100px"></div>
  <div>[{{ position?.longitude }}, {{ position?.latitude }}]</div>
</template>

<style scoped></style>
