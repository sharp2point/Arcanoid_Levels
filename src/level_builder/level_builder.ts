import { GameState } from "@/game_state/game_state";
import { HemisphericLight, Mesh, TransformNode, Vector3 } from "@babylonjs/core";
import { BuildsMap, EnemyPositionMap, LevelMaps } from "./levels";
import { addShadowToEnemy, enemy } from "@/objects/enemy/enemy";
import { animationComposeBlock, animationGLBBlock } from "@/objects/block/static_block";

// 311045 --> count_height: 3,type: 110,angle: 45

export function createMap(light: HemisphericLight) {
    const enemy_map = LevelMaps[GameState.state.level];
    GameState.state.gameObjects.enemyNodes = new TransformNode("enemies-node", GameState.scene());
    const gap = GameState.state.sizes.enemy;
    const enemies = new Array<Mesh>();
    const deltaX = enemy_map[0].length / 2 + 0.75;
    const deltaZ = -18;

    for (let i = 0; i < enemy_map.length; i++) {
        for (let j = 0; j < enemy_map[i].length; j++) {
            const name = `enemy-bloc-${j + 9 * i}`;
            const position = new Vector3(j * gap,
                GameState.state.sizes.enemy / 2, i * gap).add(new Vector3(-(deltaX), 0, GameState.gameBox().height / 2 + deltaZ)
                );
            if (!enemy_map[i][j]) {
                continue;
            }
            const data = parseCellMap(enemy_map[i][j])
            let count = data.count
            let deltaY = 0
            while (count) {
                const new_position = position.add(new Vector3(0, deltaY, 0));
                let emesh = enemySelector(name, { enemy_type: data.type, position: new_position, angle: data.angle });
                if (emesh) {
                    addShadowToEnemy(GameState.state.gameObjects.shadow, name);
                    enemies.push(emesh);
                }
                deltaY += 1.3;
                count--;
            }
        }
    }
    light.includedOnlyMeshes = enemies;
    //--- Builds ----------------------------------------
    const builds_map = BuildsMap[GameState.state.level];
    builds_map.forEach((build) => {
        switch (build.type) {
            case 200: {
                animationGLBBlock(`static-enemy-bloc-200`, { type: 200, position: build.position }, GameState.EnemyNode());
                break;
            }
        }
    });
    //--- Enemy Position ----------------------------------
    const enemy_pos_map = EnemyPositionMap[GameState.state.level];
    enemy_pos_map.forEach((e) => {
        enemy(`enemy-bloc-${e.type}`, { type: e.type, position: e.position, angle: e.angle }, GameState.EnemyNode());
    })
};
//-----------------------------------------------------------------------
function parseCellMap(item: number) {
    const full = `${item}`.padStart(4, '0').padEnd(6, '0');
    const count = full[0]; // колличество элементов в высоту
    const type = full.slice(1, 4); // тип элемента
    const angle = full.slice(4, 6); // угол поворота в градусах
    return {
        count: parseInt(count),
        type: parseInt(type),
        angle: parseInt(angle)
    }
}
function enemySelector(name: string, options: { enemy_type: number, position: Vector3, angle: number }): Mesh {
    switch (options.enemy_type) {
        case 110:
        case 125:
        case 150: {
            return enemy(name, { type: options.enemy_type, position: options.position, angle: options.angle }, GameState.EnemyNode());
        }
        default: {
            return null;
        }
    }
}