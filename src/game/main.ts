import { AUTO, Game, Types } from 'phaser';
import { SpinePlugin } from "@esotericsoftware/spine-phaser-v3";

import * as Scenes from "./scenes";

const config: Types.Core.GameConfig = {
    type: AUTO,
    width: 540,
    height: 960,
    parent: 'game-container',
    plugins: {
        scene: [
            { key: "spine.SpinePlugin", plugin: SpinePlugin, mapping: "spine" }
        ]
    },
    backgroundColor: '#040517',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        Scenes.Preload, 
        ...Object.values(Scenes)
            .filter(s => s !== Scenes.Preload)
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;