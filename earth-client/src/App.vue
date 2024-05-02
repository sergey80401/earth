<script setup lang="ts">
import Map from '@/components/Map.vue'

const setMarker = () => alert(document.getElementsByTagName("input")[0].value);


</script>

<template>
  <header>
    hello
  </header>
  <Map></Map>
  <main>
    world
    <div id="set_marker">
    <form name="map_marker">
      <lable for="coordinates">Введите координаты: </lable>
      <input type="text" placeholder="Координаты точки">
      <button @click="setMarker">Применить на карте</button>
    </form>
  </div>
 
  </main>
</template>

<style scoped>

</style>
