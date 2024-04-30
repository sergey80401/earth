import { ref } from "vue";
import { Map } from "maplibre-gl";
import alidade_smooth from "../assets/map-styles/alidade_smooth.json";
const map = ref<any>(null);

export const useMap = () => {
  if (map.value == null)
    map.value = new Map({
      container: "map",
      style: alidade_smooth, // stylesheet location
      center: [73.3924742, 54.9640796], // starting position [lng, lat]
      zoom: 18, // starting zoom
      pitch: 100,
      // antialias: true
    });

  map.value.setRenderWorldCopies(false);

  return { map };
};
