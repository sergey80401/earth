<script setup lang="ts">
import { ref, onMounted, unref, watch } from "vue";
import { useMap, useMarker, useGeolocation } from "@/hooks";
import myImage from "../assets/vados.png";

const { addMarker } = useMarker()
const { position } = useGeolocation()

onMounted(() => {
  const { map } = useMap();
  
  watch(position, ()=> addMarker([position.value?.longitude, position.value?.latitude], map))
});


</script>

<template>
  <div id="map" style="width: 100%; height: 800px"></div>
  <div>[{{ position?.longitude }}, {{ position?.latitude }}]</div>
</template>

<style scoped></style>
