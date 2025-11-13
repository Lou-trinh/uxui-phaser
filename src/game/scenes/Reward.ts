import { Scene } from 'phaser';
import gameUtils from "../GameUtils.ts";


export class Reward extends Scene {
    constructor ()
    {
        super('Reward');
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('back-btn', 'back-btn.png');
        this.load.image('shop-title', 'reward-title.png');
        this.load.image('background-item', 'background-item.png');
        this.load.image('mission', 'mission.png');
        this.load.image('achievement', 'achievement.png');
        this.load.image('airdrop', 'airdrop.png');
        this.load.image('go-button', 'go-button.png');
        this.load.image('claim-button', 'claim-button.png');
        this.load.image('broken-line', 'broken-line.png');
        this.load.image('frame-achievement', 'frame-achievement.png');
        this.load.image('items', 'items.png');
    }

    create() {
        this.createInformationBar();
        this.createShopTitle();
        this.createBackButton();
        this.createContentFrame();
        this.createFrameAchievement();
    }

    createBackButton() {
        const backBtn = gameUtils.createButton(this, 7, 8, 'back-btn', 0.5);

        backBtn.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }

    createInformationBar () {
        gameUtils.createImage(this, 0, 3.25, 'blue-bar-small', 0.5);
        gameUtils.createImage(this, 61, 3.25, 'price-coin-frame', 0.5);
        gameUtils.createImage(this, 86, 3.25, 'price-coin-frame', 0.5);
        gameUtils.createImage(this, 76, 2.55, 'coin-1', 0.5);
        gameUtils.createImage(this, 51, 2.55, 'coin-2', 0.5);
        gameUtils.createImage(this, 95, 3.25, 'subtract', 0.5);
        gameUtils.createImage(this, 70, 3.25, 'subtract', 0.5);

        // Thêm text số coin 1
        const coin1Text = this.add.text(
            this.scale.width * 0.82,
            this.scale.height * 0.032,
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
            this.scale.height * 0.032,
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

    createShopTitle() {
        gameUtils.createImage(this, 100, 8, 'shop-title', 0.5);
    }

    createContentFrame() {
        const graphics = this.add.graphics();

        const frameY = this.scale.height * 0.11;
        const frameHeight = this.scale.height * 0.05;

        graphics.fillStyle(0x111E52, 1);
        graphics.fillRect(0, frameY, this.scale.width, frameHeight);

        const tabY = 13.5;
        const spacing = 16;

        gameUtils.createImage(this, 8, tabY, 'mission', 0.5);
        gameUtils.createImage(this, 10 + spacing, tabY + 0.6, 'achievement', 0.5);
        gameUtils.createImage(this, 12 + spacing * 2, tabY, 'airdrop', 0.5);
    }

    createText(x: number, y: number, text: string, size: string, color: string, origin: number = 0) {
        const txt = this.add.text(this.scale.width * x, this.scale.height * y, text, {
            fontFamily: 'Arial, sans-serif',
            fontSize: size,
            color: color,
            fontStyle: size === '18px' ? 'bold' : 'normal'
        });
        txt.setOrigin(origin, origin === 0.5 ? 0.5 : 0);
        return txt;
    }

    createFrameAchievement() {
        const startY = 26;
        const spacing = 17;

        for (let i = 0; i < 4; i++) {
            const y = startY + (i * spacing);
            const yPercent = y / 100;

            gameUtils.createImage(this, 50, y, 'frame-achievement', 0.5);

            this.createText(0.08, yPercent - 0.065, 'Follow Youtube', '18px', '#000000');
            this.createText(0.08, yPercent - 0.04, 'Lorem ipsum dolor sit amet consectetur. Massa sit\naliquet rhoncus turpis et at quam euismod.', '12px', '#666666');

            const itemY = y + 3.5;
            gameUtils.createImage(this, 13, itemY, 'items', 0.5);
            gameUtils.createImage(this, 23, itemY, 'items', 0.5);
            this.createText(0.155, itemY / 100, 'x 5', '14px', '#000000', 0.5);
            this.createText(0.255, itemY / 100, 'x 5', '14px', '#000000', 0.5);

            gameUtils.createImage(this, 65, y, 'broken-line', 0.5);
            gameUtils.createImage(this, 80, y - 2.5, 'go-button', 0.5);
            gameUtils.createImage(this, 80, y + 2.5, 'claim-button', 0.5);
        }
    }
}

export class ItemPurchase {
}