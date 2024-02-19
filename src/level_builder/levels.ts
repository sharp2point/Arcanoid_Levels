import { Vector3 } from "@babylonjs/core";

export const LevelMaps = {
    0: [
        [0, 0, 0],
        [0, 111045, 0],
        [0, 0, 0],
    ],
};
export const EnemyPositionMap = {
    0: [
        {
            type: 110,
            height: 1,
            angle: 0,
            position: new Vector3(-5, 0.8, 8)
        },
        {
            type: 125,
            height: 2,
            angle: 0,
            position: new Vector3(0, 0.8, 2)
        },
        {
            type: 150,
            height: 3,
            angle: 0,
            position: new Vector3(5, 0.8, 8)
        },
    ]
}
export const BuildsMap = {
    0: [
        {
            type: 200,
            position: new Vector3(-5, 0, 8),
        },
        {
            type: 200,
            position: new Vector3(0, 0, 2),
        },
        {
            type: 200,
            position: new Vector3(5, 0, 8),
        }
    ],
}