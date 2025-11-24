import { Scene } from "phaser";
import createObjectUtils from "./CreateObjectUtils.ts";

export default {
    createInformationBar: function (scene: Scene) {
        createObjectUtils.createImage(scene, 0, 3.25, 'blue-bar-small', 0.5);
        createObjectUtils.createImage(scene, 61, 3.25, 'price-coin-frame', 0.5);
        createObjectUtils.createImage(scene, 86, 3.25, 'price-coin-frame', 0.5);
        createObjectUtils.createImage(scene, 76, 2.55, 'coin-1', 0.5);
        createObjectUtils.createImage(scene, 51, 2.55, 'coin-2', 0.5);
        createObjectUtils.createImage(scene, 95, 3.25, 'subtract', 0.5);
        createObjectUtils.createImage(scene, 70, 3.25, 'subtract', 0.5);

        // Thêm text số coin 1
        const coin1Text: Phaser.GameObjects.Text = scene.add.text(
            scene.scale.width * 0.82,
            scene.scale.height * 0.032,
            '120000',
            {
                fontFamily: 'Arial Narrow, Arial, sans-serif',
                fontSize: '16px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        );
        coin1Text.setOrigin(0, 0.5);

        // Thêm text số coin 2
        const coin2Text: Phaser.GameObjects.Text = scene.add.text(
            scene.scale.width * 0.57,
            scene.scale.height * 0.032,
            '120000',
            {
                fontFamily: 'Arial Narrow, Arial, sans-serif',
                fontSize: '16px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        );
        coin2Text.setOrigin(0, 0.5);
    }
}