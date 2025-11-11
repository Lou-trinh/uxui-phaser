import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, Types } from 'phaser';
import { SpinePlugin } from "@esotericsoftware/spine-phaser-v3";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
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
    backgroundColor: '#ffffff',
    scene: [
        MainGame
    ]
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
}

export default StartGame;
