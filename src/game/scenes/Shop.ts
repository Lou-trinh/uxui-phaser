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

            itemBtn.on('pointerdown', () => this.createItemPurchase());
        });
    }
    
    createItemPurchase() {
        this.add.image(0, 0, 'background-purchase').setOrigin(0.5);
    }
}