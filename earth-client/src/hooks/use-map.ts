import { ref } from "vue";
import { Map } from "maplibre-gl";

export const useMap = () => {
  const map = ref<any>(
    new Map({
      container: "map",
      style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json", // stylesheet location
      center: [73.365262, 54.990763], // starting position [lng, lat]
      zoom: 18, // starting zoom
      pitch: 100,
    })
  );

  map.value.setRenderWorldCopies(false);

  return { map };
};

  