/*
 * A minimal app that views a glTF file.
 */

import {Viewer} from "../../../xeokit-sdk/src/viewer/Viewer.js";
import {GLTFModelsPlugin} from "../../../xeokit-sdk/src/viewer/plugins/GLTFModelsPlugin/GLTFModelsPlugin.js";
import {AxisGizmoPlugin} from "../../../xeokit-sdk/src/viewer/plugins/AxisGizmoPlugin/AxisGizmoPlugin.js";

const viewer = new Viewer({
    canvasId: "myCanvas"
});

const gltfModels = new GLTFModelsPlugin(viewer);

new AxisGizmoPlugin(viewer, {size: [250, 250]});

const model = gltfModels.load({
    id: "myModel",
    src: "./../../models/gltf/schependomlaan/schependomlaan.gltf",
    edges: true
});

const scene = viewer.scene;
const camera = scene.camera;

camera.orbitPitch(20);

model.on("loaded", () => {
    viewer.cameraFlight.flyTo(model);
    scene.on("tick", () => {
        camera.orbitYaw(0.4);
    })
});
