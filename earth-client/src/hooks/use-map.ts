import { ref } from "vue";
import { Map } from "maplibre-gl";
import alidade_smooth from "../assets/map-styles/alidade_smooth.json";

let map: Map, any = null;

export const useMap = () => {
  if (map == null)
    map = new Map({
      container: "map",
      style: alidade_smooth, // stylesheet location
      center: [73.3924742, 54.9640796], // starting position [lng, lat]
      zoom: 20, // starting zoom
      pitch: 100,
      // minZoom: 15
      // antialias: true
    });

  map.setRenderWorldCopies(false);
  return { map };
};
