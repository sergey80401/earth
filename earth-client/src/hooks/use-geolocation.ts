import { ref, watch } from "vue";
import { type LngLatLike } from "maplibre-gl";

export const useGeolocation = () => {
    const position = ref<GeolocationCoordinates>();
    
    const getCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition(
            (currentPosition) => position.value = currentPosition.coords,
            (err) => console.log(err)
        )
    }
    watch(position, () => {
        getCurrentPosition()
    })

    getCurrentPosition()
    return {
        position
    }
} 