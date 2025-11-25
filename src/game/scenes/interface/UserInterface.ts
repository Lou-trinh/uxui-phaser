import { Scene } from "phaser";
import createObjectUtils from "../../Utils/CreateObjectUtils.ts";
import gameDataUtils from "../../Utils/GameDataUtils.ts";

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
    },

    createInformationBar2: function (scene: Scene) {
        createObjectUtils.createImage(scene, 0, 4, 'blue-bar-small', 0.5);
        createObjectUtils.createImage(scene, 61, 4, 'price-coin-frame', 0.5);
        createObjectUtils.createImage(scene, 86, 4, 'price-coin-frame', 0.5);
        createObjectUtils.createImage(scene, 76, 3.5, 'coin-1', 0.5);
        createObjectUtils.createImage(scene, 51, 3.5, 'coin-2', 0.5);
        createObjectUtils.createImage(scene, 95, 4, 'subtract', 0.5);
        createObjectUtils.createImage(scene, 70, 4, 'subtract', 0.5);
        createObjectUtils.createImage(scene, 10, 7.5, 'avatar-player', 0.5);
        createObjectUtils.createImage(scene, 25, 4, 'vip-level', 0.5);
        createObjectUtils.createImage(scene, 42, 10, 'icon-copy', 0.5);
        createObjectUtils.createImage(scene, 27, 10, 'id-frame', 0.5);

        // Thêm text Player Name
        const playerNameText = scene.add.text(
            scene.scale.width * 0.19,
            scene.scale.height * 0.074,
            gameDataUtils.getUsername(),
            {
                fontFamily: 'Arial Narrow, Arial, sans-serif',
                fontSize: '18px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        );
        playerNameText.setOrigin(0, 0.5);

        // Thêm text ID
        const playerIdText = scene.add.text(
            scene.scale.width * 0.17,
            scene.scale.height * 0.1,
            'ID:1923442345674',
            {
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#ffffff'
            }
        );
        playerIdText.setOrigin(0, 0.5);

        // Thêm text số coin 1
        const coin1Text = scene.add.text(
            scene.scale.width * 0.82,
            scene.scale.height * 0.040,
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
        const coin2Text = scene.add.text(
            scene.scale.width * 0.57,
            scene.scale.height * 0.040,
            '120000',
            {
                fontFamily: 'Arial Narrow, Arial, sans-serif',
                fontSize: '16px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        );
        coin2Text.setOrigin(0, 0.5);
    },

    createFrameNotice: function (scene: Scene): void {
        const graphics = scene.add.graphics();
        const frameX = scene.scale.width * 0.75;
        const frameY = scene.scale.height * 0.065;
        const frameWidth = scene.scale.width * 0.26;
        const frameHeight = scene.scale.height * 0.05;

        graphics.fillStyle(0x0B117B, 0.6);
        graphics.fillRoundedRect(frameX, frameY, frameWidth, frameHeight, 8);

        const iconY = 9; // Vị trí Y cho các icon
        const startX = 79; // Vị trí bắt đầu
        const spacing = 8; // Khoảng cách giữa các icon

        createObjectUtils.createButton(scene, startX, iconY, 'notice-icon', 0.5);
        createObjectUtils.createButton(scene, startX + spacing, iconY, 'sound-icon', 0.5);
        createObjectUtils.createButton(scene, startX + spacing * 2, iconY, 'lib-icon', 0.5);
    }
}