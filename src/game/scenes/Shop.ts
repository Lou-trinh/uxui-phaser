import { Scene } from 'phaser';
import gameUtils from "../GameUtils.ts";


export class Shop extends Scene {
    constructor ()
    {
        super('Shop');
    }
    
    preload() {
        this.load.setPath('assets');
        this.load.image('back-btn', 'back-btn.png');
        this.load.image('shop-title', 'shop-title.png');
        this.load.image('money-bar', 'money-bar.png');
        this.load.image('dark-blue-bar', 'dark-blue-bar.png');
        this.load.image('icon-bar', 'icon-bar.png');
        this.load.image('background-item', 'background-item.png');
        this.load.image('item-sale', 'item-sale.png');
        this.load.image('item-not-sale', 'item-not-sale.png');
    }
    
    create() {
        this.createMoneyBar();
        this.createShopTitle();
        this.createBackButton();
        this.createBackgroundItem();
        this.createDarkBlueBar();
        this.createIconBar();
        this.createItemBox();
    }
    
    createBackButton() {
        const shop = gameUtils.createButton(this, 7, 8, 'back-btn', 0.5);

        shop.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
    
    createMoneyBar() {
        gameUtils.createImage(this, 50, 3, 'money-bar', 0.5);
    }
    
    createShopTitle() {
        gameUtils.createImage(this, 100, 8, 'shop-title', 0.5);
    }
    
    createDarkBlueBar() {
        gameUtils.createImage(this, 50, 15, 'dark-blue-bar', 0.5);
    }
    
    createIconBar() {
        gameUtils.createImage(this, 0, 16, 'icon-bar', 0.5);
    }
    
    createBackgroundItem() {
        gameUtils.createImage(this, 50, 60, 'background-item', 0.5);
    }
    
    createItemBox() {
        gameUtils.createButton(this, 0, 34, 'item-sale', 0.5);
        gameUtils.createButton(this, 100, 34, 'item-sale', 0.5);
        gameUtils.createButton(this, 50, 34, 'item-not-sale', 0.5);
        gameUtils.createButton(this, 0, 60, 'item-sale', 0.5);
        gameUtils.createButton(this, 100, 60, 'item-not-sale', 0.5);
        gameUtils.createButton(this, 50, 60, 'item-sale', 0.5);
        gameUtils.createButton(this, 0, 86, 'item-sale', 0.5);
        gameUtils.createButton(this, 100, 86, 'item-sale', 0.5);
        gameUtils.createButton(this, 50, 86, 'item-not-sale', 0.5);
    }
}