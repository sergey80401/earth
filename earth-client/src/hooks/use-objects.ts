import { type MapObject } from "@/types";
import * as THREE from "three"
import { MercatorCoordinate, type LngLatLike } from "maplibre-gl"
import { useMap } from "@/hooks";

export const useObjects = () => {

    function addObjectOnMap(...mapObjects: MapObject[]) {
        const { map } = useMap()

        const modelOrigin: LngLatLike = [73.3924742, 54.9640796]//[0, 0];
        const modelAltitude = 0;
        const modelRotate = [Math.PI / 2, 0, 0];

        const modelAsMercatorCoordinate = MercatorCoordinate.fromLngLat(
            modelOrigin,
            modelAltitude
        );

        // transformation parameters to position, rotate and scale the 3D model onto the map
        const modelTransform = {
            translateX: modelAsMercatorCoordinate.x,
            translateY: modelAsMercatorCoordinate.y,
            translateZ: modelAsMercatorCoordinate.z,
            rotateX: modelRotate[0],
            rotateY: modelRotate[1],
            rotateZ: modelRotate[2],
            /* Since our 3D model is in real world meters, a scale transform needs to be
             * applied since the CustomLayerInterface expects units in MercatorCoordinates.
             */
            scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
        };

        const customLayer: any = {
            id: "3d-model",
            type: "custom",
            renderingMode: "3d",
            camera: new THREE.Camera(),
            scene: new THREE.Scene(),
            renderer: new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                antialias: true,
            }),
            // 10000, 200
            onAdd(map: any, gl: any) {

                const grid = new THREE.GridHelper(500, 100, "gray", "gray")
                grid.material.transparent = true
                // grid.material.opacity = 0.1

                console.log(grid.material)
                this.scene.add(grid);
                mapObjects.forEach(mapObject => this.scene.add(mapObject.mapObj))

                // use the MapLibre GL JS map canvas for three.js
                this.renderer = new THREE.WebGLRenderer({
                    canvas: map.getCanvas(),
                    context: gl,
                    antialias: true,
                });

                this.renderer.autoClear = false;
            },

            render(gl: any, matrix: any) {
                const rotationX = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(1, 0, 0),
                    modelTransform.rotateX
                );
                const rotationY = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(0, 1, 0),
                    modelTransform.rotateY
                );
                const rotationZ = new THREE.Matrix4().makeRotationAxis(
                    new THREE.Vector3(0, 0, 1),
                    modelTransform.rotateZ
                );

                const m = new THREE.Matrix4().fromArray(matrix);
                const l = new THREE.Matrix4()
                    .makeTranslation(
                        modelTransform.translateX,
                        modelTransform.translateY,
                        modelTransform.translateZ
                    )
                    .scale(
                        new THREE.Vector3(
                            modelTransform.scale,
                            -modelTransform.scale,
                            modelTransform.scale
                        )
                    )
                    .multiply(rotationX)
                    .multiply(rotationY)
                    .multiply(rotationZ);

                this.camera.projectionMatrix = m.multiply(l);
                this.renderer.resetState();
                this.renderer.render(this.scene, this.camera);
                // this.map.triggerRepaint();
            },
        };


        map.on("style.load", () => {
            map.addLayer(customLayer);
        });
    }

    return { addObjectOnMap }
}