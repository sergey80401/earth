import { type Object3D } from "three";
import { type LngLatLike, type LngLat } from "maplibre-gl"

export type MapObject = {
    mapObj: Object3D<any>,
    mapPositon: LngLatLike
}

