import { Scene } from 'phaser';
import createObjectUtils from "../Utils/CreateObjectUtils.ts";
import userIntefaceUtils from "../Utils/UserInterfaceUtils.ts";
import numberUtils from "../Utils/NumberUtils.ts";

export class Shop extends Scene {
    blurOverlay!: Phaser.GameObjects.Rectangle;
    bg!: Phaser.GameObjects.Image;
    maskGraphics!: Phaser.GameObjects.Graphics;
    btnCancel!: Phaser.GameObjects.Image;
    btnBuy!: Phaser.GameObjects.Image;
    
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
        userIntefaceUtils.createInformationBar(this);
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
        const count: number = 9;
        let numRow = Math.ceil(count / 3);
        
        for (let i = 0; i < numRow; i++) {
            for (let j = 0; j < 3; j++) {
                const saleNumber = numberUtils.getRandomNumberOfRange(0, 2);
                const texture = saleNumber % 2 === 1 ? 'item-sale' : 'item-not-sale';
                
                const x = j * 50;
                const y = i * 26 + 34;
                const itemBtn = createObjectUtils.createButton(this, x, y, texture, 0.5);

                itemBtn.on('pointerdown', () => this.createBackgroundPurchase());
            }
        }
    }

    createBackgroundPurchase() {
        this.setupBlurOverlay();
        this.setupBackground();
        this.setupCancelBtn();
        this.setupBuyBtn();
    }
    
    setupBlurOverlay() {
        this.blurOverlay = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.5
        ).setDepth(10).setInteractive();

        this.blurOverlay.on('pointerdown', () => this.destroyPurchaseUI());
    }

    destroyPurchaseUI() {
        this.blurOverlay?.destroy();
        this.bg?.destroy();
        this.maskGraphics?.destroy();
        this.btnCancel?.destroy();
        this.btnBuy?.destroy();
    }

    setupBackground() {
        this.bg = createObjectUtils.createBackground(this, 'background-purchase')
            .setScale(0.12, 0.22)
            .setDepth(11)
            .setInteractive();

        this.maskGraphics = this.make.graphics();
        this.maskGraphics.fillStyle(0xffffff);
        this.maskGraphics.fillRoundedRect(
            this.bg.x - this.bg.displayWidth / 2,
            this.bg.y - this.bg.displayHeight / 2,
            this.bg.displayWidth,
            this.bg.displayHeight,
            8
        );

        const mask = this.maskGraphics.createGeometryMask();
        this.bg.setMask(mask);
    }

    setupCancelBtn() {
        this.btnCancel = createObjectUtils.createButton(this, 30, 77, 'cancel-button', 0.5)
            .setScale(0.5)
            .setDepth(12);

        this.btnCancel.on('pointerdown', () => this.destroyPurchaseUI());
    }

    setupBuyBtn() {
        this.btnBuy = createObjectUtils.createButton(this, 70, 77, 'buy-button', 0.5)
            .setScale(0.5)
            .setDepth(12);

        this.btnBuy.on('pointerdown', () => this.destroyPurchaseUI());
    }
}