import type { Ref, ref } from "vue";
import { LngLatLike, Marker } from "maplibre-gl";

export const useMarker = () => {
  const addMarker = (lngLat: LngLatLike, map: Ref): Marker => {
    const marker = new Marker()
      .setLngLat(lngLat)
      .addTo(map.value);

    return marker;
  };

  return {
    addMarker,
  };
};
