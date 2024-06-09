<script setup lang="ts">
import { ref, onMounted, unref, watch } from "vue";
import * as THREE from "three";
import { useMap, useMarker, useGeolocation, useObjects } from "@/hooks";
import { LngLat } from "maplibre-gl";
import { type MapObject } from "@/types";
const { addMarker } = useMarker();
const { position } = useGeolocation();
const { addObjectOnMap } = useObjects();

const a = ref("");

onMounted(() => {
  const { map } = useMap();

  const geometry1 = new THREE.BoxGeometry(1, 1, 1);
  const red = new THREE.MeshBasicMaterial({ color: "red" });
  const cube1 = new THREE.Mesh(geometry1, red);

  var obj1 = { mapObj: cube1, mapPositon: [73.3924742, 54.9640796] };

  cube1.position.set(100, 0, 100);
  const geometry2 = new THREE.BoxGeometry(3, 3, 1);
  const green = new THREE.MeshBasicMaterial({ color: "green" });
  const cube2 = new THREE.Mesh(geometry2, green);

  var obj2 = { mapObj: cube2, mapPositon: [73.3924742, 54.9640796] };

  addObjectOnMap(obj1, obj2);
  // addObjectOnMap(obj2)
  // addObjectOnMap(cube2)

  watch(position, () => {
    console.log(position.value);
    addMarker([position.value?.longitude, position.value?.latitude], map);
  });

  map.on("mousemove", (e) => {
    a.value = `${JSON.stringify(e.point)} // ${JSON.stringify(
      e.lngLat.wrap()
    )}`;
  });
});
</script>

<template>
  <div id="map" style="width: 100%; height: 1100px"></div>
  <div>{{ a }}</div>
</template>

<style scoped></style>
