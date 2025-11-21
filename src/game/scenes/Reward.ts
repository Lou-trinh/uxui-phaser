import { Scene } from 'phaser';
import createObjectUtils from "../Utils/CreateObjectUtils.ts";
import userInterfaceUtils from "../Utils/UserInterfaceUtils.ts";

export class Reward extends Scene {
    constructor ()
    {
        super('Reward');
    }

    preload() {
    }

    create() {
        this.createInformationBar();
        this.createShopTitle();
        this.createBackButton();
        this.createContentFrame();
        this.createFrameAchievement();
    }

    createBackButton() {
        const backBtn = createObjectUtils.createButton(this, 7, 8, 'back-btn', 0.5);

        backBtn.on('pointerdown', () => {
            this.scene.start('Home');
        });
    }

    createInformationBar() {
        userInterfaceUtils.createInformationBar(this);
    }

    createShopTitle() {
        createObjectUtils.createImage(this, 100, 8, 'shop-title', 0.5);
    }

    createContentFrame() {
        const graphics = this.add.graphics();

        const frameY = this.scale.height * 0.11;
        const frameHeight = this.scale.height * 0.05;

        graphics.fillStyle(0x111E52, 1);
        graphics.fillRect(0, frameY, this.scale.width, frameHeight);

        const tabY = 13.5;
        const spacing = 16;

        createObjectUtils.createImage(this, 8, tabY, 'mission', 0.5);
        createObjectUtils.createImage(this, 10 + spacing, tabY + 0.6, 'achievement', 0.5);
        createObjectUtils.createImage(this, 12 + spacing * 2, tabY, 'airdrop', 0.5);
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

            createObjectUtils.createImage(this, 50, y, 'frame-achievement', 0.5);

            this.createText(0.08, yPercent - 0.065, 'Follow Youtube', '18px', '#000000');
            this.createText(0.08, yPercent - 0.04, 'Lorem ipsum dolor sit amet consectetur. Massa sit\naliquet rhoncus turpis et at quam euismod.', '12px', '#666666');

            const itemY = y + 3.5;
            createObjectUtils.createImage(this, 13, itemY, 'items', 0.5);
            createObjectUtils.createImage(this, 23, itemY, 'items', 0.5);
            this.createText(0.155, itemY / 100, 'x 5', '14px', '#000000', 0.5);
            this.createText(0.255, itemY / 100, 'x 5', '14px', '#000000', 0.5);

            createObjectUtils.createImage(this, 65, y, 'broken-line', 0.5);
            createObjectUtils.createImage(this, 80, y - 2.5, 'go-button', 0.5);
            createObjectUtils.createImage(this, 80, y + 2.5, 'claim-button', 0.5);
        }
    }
}