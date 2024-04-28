import type { Ref, ref } from "vue";
import { Marker, type LngLatLike } from "maplibre-gl";

export const useMarker = () => {
  const addMarker = (lngLat: LngLatLike, map: any): Marker => {
    const marker = new Marker()
      .setLngLat(lngLat)
      .addTo(map.value);

    return marker;
  };

  return {
    addMarker,
  };
};
