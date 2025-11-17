import { Scene } from 'phaser';
import createObjectUtils from "../Utils/createObjectUtils.ts";


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
        createObjectUtils.createImage(this, 0, 3.25, 'blue-bar-small', 0.5);
        createObjectUtils.createImage(this, 61, 3.25, 'price-coin-frame', 0.5);
        createObjectUtils.createImage(this, 86, 3.25, 'price-coin-frame', 0.5);
        createObjectUtils.createImage(this, 76, 2.55, 'coin-1', 0.5);
        createObjectUtils.createImage(this, 51, 2.55, 'coin-2', 0.5);
        createObjectUtils.createImage(this, 95, 3.25, 'subtract', 0.5);
        createObjectUtils.createImage(this, 70, 3.25, 'subtract', 0.5);

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
        createObjectUtils.createImage(this, 100, 8, 'shop-title', 0.5);
    }
    
    createDarkBlueBar() {
        createObjectUtils.createImage(this, 50, 15, 'dark-blue-bar', 0.5);
    }

    createIconBar() {
        const startX = 8; // Vị trí bắt đầu
        const iconWidth = 14; // Chiều rộng mỗi icon

        const inventoryBtn = createObjectUtils.createButton(this, startX + 0 * iconWidth, 15, 'icon-dark-bar-1', 0.5);
        inventoryBtn.on('pointerdown', () => {
            this.scene.start('Inventory');
        });

        createObjectUtils.createButton(this, startX + 1 * iconWidth, 15.5, 'icon-dark-bar-2', 0.5);
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