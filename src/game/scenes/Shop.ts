import { Scene } from 'phaser';
import createObjectUtils from "../Utils/CreateObjectUtils.ts";
import uiUtils from "../Utils/UIUtils.ts";


export class Shop extends Scene {
    constructor ()
    {
        super('Shop');
    }
    
    preload() {
    }
    
    create() {
        this.createInformationBar();
        this.createShopTitle();
        this.createBackButton();
        this.createBackgroundItem();
        this.createDarkBlueBar();
        this.createIconBar();
        this.createItemBox();
    }
    
    createBackButton() {
        const shopBtn = createObjectUtils.createButton(this, 7, 8, 'back-btn', 0.5);

        shopBtn.on('pointerdown', () => {
            this.scene.start('Home');
        });
    }

    createInformationBar() {
        uiUtils.createInformationBar(this);
    }
    
    createShopTitle() {
        createObjectUtils.createImage(this, 100, 8, 'shop-title', 0.5);
    }
    
    createDarkBlueBar() {
        createObjectUtils.createImage(this, 50, 15, 'dark-blue-bar', 0.5);
    }

    createIconBar() {
        const startX = 8; // Vị trí bắt đầu
        const iconWidth = 14; // Chiều rộng mỗi icon

        const inventoryBtn = createObjectUtils.createButton(this, startX, 15, 'icon-dark-bar-1', 0.5);
        inventoryBtn.on('pointerdown', () => {
            this.scene.start('Inventory');
        });

        createObjectUtils.createButton(this, startX + iconWidth, 15.5, 'icon-dark-bar-2', 0.5);
        createObjectUtils.createButton(this, startX + 2 * iconWidth, 15, 'icon-dark-bar-3', 0.5);
        createObjectUtils.createButton(this, startX + 3 * iconWidth, 15, 'icon-dark-bar-4', 0.5);
        createObjectUtils.createButton(this, startX + 4 * iconWidth, 15, 'icon-dark-bar-5', 0.5);
    }
    
    createBackgroundItem() {
        createObjectUtils.createImage(this, 50, 60, 'background-item', 0.5);
    }

    createItemBox() {
        const positions = [
            [0, 34], [50, 34], [100, 34],
            [0, 60], [50, 60], [100, 60],
            [0, 86], [50, 86], [100, 86],
        ];

        positions.forEach(([x, y], i) => {
            const texture = i % 2 === 0 ? 'item-sale' : 'item-not-sale';
            const itemBtn = createObjectUtils.createButton(this, x, y, texture, 0.5);

            itemBtn.on('pointerdown', () => this.createBackgroundPurchase());
        });
    }

    createBackgroundPurchase() {
        const blurOverlay = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.5
        ).setDepth(10).setInteractive();

        const bg = createObjectUtils.createBackground(this, 'background-purchase')
            .setScale(0.12, 0.22)
            .setDepth(11)
            .setInteractive();

        const maskGraphics = this.make.graphics();
        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRoundedRect(
            bg.x - bg.displayWidth / 2,
            bg.y - bg.displayHeight / 2,
            bg.displayWidth,
            bg.displayHeight,
            8
        );

        const mask = maskGraphics.createGeometryMask();
        bg.setMask(mask);
        
        const btnCancel = createObjectUtils.createButton(this, 30, 77, 'cancel-button', 0.5)
            .setScale(0.5, 0.5)
            .setDepth(12)
        
        const btnBuy = createObjectUtils.createButton(this, 70, 77, 'buy-button', 0.5)
            .setScale(0.5, 0.5)
            .setDepth(12)
        
        const arrComponent = [
            blurOverlay,
            bg,
            maskGraphics,
            btnCancel,
            btnBuy
        ];

        btnCancel.on('pointerdown', () => {
            this.destroyButtonComponents(arrComponent);
        });

        blurOverlay.on('pointerdown', () => {
            this.destroyButtonComponents(arrComponent)
        });
    }

    destroyButtonComponents(arrComponent: Phaser.GameObjects.GameObject[]) {
        arrComponent.forEach(function (component) {
            component.destroy();
        });
    }
}