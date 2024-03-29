import { ASSETS } from "@/game_state/assets/state";
import { GameState } from "@/game_state/game_state";
import { UISTATE } from "@/game_state/ui/state";
import { Vector3, Mesh, SceneLoader, Scene, InstantiatedEntries, AssetContainer } from "@babylonjs/core";
import "@babylonjs/loaders";

let loadPromise = async (rootPath: string, fileName: string, scene: Scene) => {
  return new Promise((res, rej) => {
    SceneLoader.LoadAssetContainer(rootPath, fileName, scene, function (container) {
      res(container);
    });
  });
}
let mergeMeshes = (model: InstantiatedEntries) => {
  const mesh = Mesh.MergeMeshes(model.rootNodes[0].getChildMeshes(), true, false, null, null, true);
  mesh.scaling = new Vector3(1, 1, 1);
  mesh.position = new Vector3(0, 0, 0);
  return mesh;
}
async function loadToAssetContainer(rootPath: string, fileName: string, scene: Scene) {
  const container = await loadPromise(rootPath, fileName, scene);
  return container;
}

async function loadModel(rootPath: string, fileName: string, scene: Scene) {
  const container = await loadToAssetContainer(rootPath, fileName, scene);
  return container;
}
function instateMesh(nameMesh: string, assetContainer: AssetContainer) {
  const instanceModel = assetContainer.instantiateModelsToScene(() => nameMesh, true)
  const mesh = mergeMeshes(instanceModel);
  return mesh;
}
//---------------------------------------------------------------------->
export function loadEnemyModel(scene: Scene) {
  loadModel(`public/models/`, `cristal_one.glb`, scene).then((container) => {
    ASSETS.containers3D.set("cristal", container as AssetContainer);
  })
}
export function loadDamageEnemyModel(scene: Scene) {
  loadModel(`public/models/`, `damage.glb`, scene).then((container) => {
    ASSETS.containers3D.set("enemy_damage", container as AssetContainer);
  })
}
export function loadBuildModel(scene: Scene) {
  loadModel(`public/models/buildings/`, `sixBorder.glb`, scene).then((container) => {
    ASSETS.containers3D.set("build_six", container as AssetContainer);
  })
}
export { loadToAssetContainer, mergeMeshes, loadModel, instateMesh };