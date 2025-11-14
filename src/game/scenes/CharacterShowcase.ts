import {Scene} from "phaser";
import gameUtils from "../GameUtils";
import gameData from "../GameData";

export class CharacterShowcase extends Scene {
    constructor() {
        super('CharacterShowcase');
    }
    
    preload() {
    }
    
    create() {
        this.createBackground();
        this.createInformationBar();
        this.createFrameNotice();
        this.createShopTitle();
        this.createBackButton();
        this.createNameCharacterFrame();
    }

    createBackground () {
        gameUtils.createImage(this, 50, 50, 'background', 0.5);
    }

    createInformationBar() {
        gameUtils.createImage(this, 0, 4, 'blue-bar-small', 0.5);
        gameUtils.createImage(this, 61, 4, 'price-coin-frame', 0.5);
        gameUtils.createImage(this, 86, 4, 'price-coin-frame', 0.5);
        gameUtils.createImage(this, 76, 3.5, 'coin-1', 0.5);
        gameUtils.createImage(this, 51, 3.5, 'coin-2', 0.5);
        gameUtils.createImage(this, 95, 4, 'subtract', 0.5);
        gameUtils.createImage(this, 70, 4, 'subtract', 0.5);
        gameUtils.createImage(this, 10, 7.5, 'avatar-player', 0.5);
        gameUtils.createImage(this, 25, 4, 'vip-level', 0.5);
        gameUtils.createImage(this, 42, 10, 'icon-copy', 0.5);
        gameUtils.createImage(this, 27, 10, 'id-frame', 0.5);

        // Thêm text Player Name
        const playerNameText = this.add.text(
            this.scale.width * 0.19,
            this.scale.height * 0.074,
            gameData.getUsername(),
            {
                fontFamily: 'Arial Narrow, Arial, sans-serif',
                fontSize: '18px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        );
        playerNameText.setOrigin(0, 0.5);

        // Thêm text ID
        const playerIdText = this.add.text(
            this.scale.width * 0.17,
            this.scale.height * 0.1,
            'ID:1923442345674',
            {
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#ffffff'
            }
        );
        playerIdText.setOrigin(0, 0.5);

        // Thêm text số coin 1
        const coin1Text = this.add.text(
            this.scale.width * 0.82,
            this.scale.height * 0.040,
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
        const coin2Text = this.add.text(
            this.scale.width * 0.57,
            this.scale.height * 0.040,
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

    createFrameNotice() {
        const graphics = this.add.graphics();
        const frameX = this.scale.width * 0.75;
        const frameY = this.scale.height * 0.065;
        const frameWidth = this.scale.width * 0.26;
        const frameHeight = this.scale.height * 0.05;

        graphics.fillStyle(0x0B117B, 0.6);
        graphics.fillRoundedRect(frameX, frameY, frameWidth, frameHeight, 8);

        const iconY = 9; // Vị trí Y cho các icon
        const startX = 79; // Vị trí bắt đầu
        const spacing = 8; // Khoảng cách giữa các icon

        gameUtils.createButton(this, startX, iconY, 'notice-icon', 0.5);
        gameUtils.createButton(this, startX + spacing, iconY, 'sound-icon', 0.5);
        gameUtils.createButton(this, startX + spacing * 2, iconY, 'lib-icon', 0.5);
    }

    createShopTitle() {
        gameUtils.createImage(this, 100, 15, 'character-showcase-title', 0.5);
    }

    createBackButton() {
        const shopBtn = gameUtils.createButton(this, 7, 15, 'back-btn', 0.5);

        shopBtn.on('pointerdown', () => {
            this.scene.start('Home');
        });
    }
    
    createNameCharacterFrame() {
        gameUtils.createImage(this, 7, 24, 'name-character-frame', 0.5);
    }
}