import { Engine, HavokPlugin, Vector3 } from "@babylonjs/core";
import * as havok from "@babylonjs/havok";
// import { Inspector } from "@babylonjs/inspector";
import { ASSETS } from "./game_state/assets/state";
import { AGAME } from "./game_state/main/state";
import { GameState } from "./game_state/game_state";
import { UISTATE } from "./game_state/ui/state";
import { getScreenAspect, loadAssets } from "./utils/clear_utils";
import { loadBuildModel, loadDamageEnemyModel, loadEnemyModel } from "./utils/loaderGlbFiles";
import { cameraSettings } from "./utils/utility";
import { createEnemyMaterial } from "./objects/enemy/enemy";

async function initCore() {
    const physics = await havok.default();
    AGAME.HVK = new HavokPlugin(true, physics);
    AGAME.Canvas = document.querySelector('#app');
    AGAME.Engine = new Engine(AGAME.Canvas, true, { xrCompatible: false }, true);
    AGAME.Gravity = new Vector3(0, -9.81, 0);
    UISTATE.Canvas = AGAME.Canvas;
    UISTATE.Engine = AGAME.Engine;
}

window.addEventListener('load', async () => {
    AGAME.ScreenAspect = getScreenAspect();
    loadAssets(ASSETS.sprites);

    initCore().then(async () => {
        const { sceneOne } = await import("./scenes/scene_one");
        sceneOne(AGAME.Gravity, AGAME.HVK);
        cameraSettings(AGAME.ScreenAspect);
        loadEnemyModel(AGAME.Scene);
        loadDamageEnemyModel(AGAME.Scene);
        loadBuildModel(AGAME.Scene);
        createEnemyMaterial(AGAME.Scene);
        //-------------------------------------->
        setTimeout(() => {
            GameState.levelRun(0);
        }, 1000);


        AGAME.Engine.runRenderLoop(() => {
            AGAME.Scene.render();
        });
    });
});
window.addEventListener('resize', () => {
    AGAME.ScreenAspect = getScreenAspect();
    if (AGAME.Engine) {
        AGAME.Engine.resize();
        UISTATE.Engine.resize();
    }
    if (GameState.camera()) {
        cameraSettings(AGAME.ScreenAspect);
    }
});
window.addEventListener("keydown", (ev) => {
    if (ev.key === 'i' && ev.altKey) {
        // if (Inspector.IsVisible) {
        //     Inspector.Hide();
        // } else {
        //     Inspector.Show(AGAME.Scene, { embedMode: true, });
        // }
    }
});