<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMap, useMarker } from "@/hooks";
import setMarker from '@/App.vue';

const {addMarker} = useMarker() 

onMounted(() => {
  const { map } = useMap();

  const marker1 = addMarker([73.365262, 54.990763], map)
  const marker2 = addMarker([73.365362, 54.990863], map)
  const marker3 = addMarker([73.365462, 54.990963], map)
});
</script>

<template>
  <div id="map" style="width: 100%; height: 800px"></div>
</template>

<style scoped></style>
