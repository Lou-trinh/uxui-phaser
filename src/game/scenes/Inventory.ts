import { Scene } from 'phaser';
import gameUtils from "../GameUtils.ts";


export class Inventory extends Scene {
    constructor ()
    {
        super('Inventory');
    }

    preload() {
        this.load.setPath('assets');
        this.load.image('back-btn', 'back-btn.png');
        this.load.image('inventory-title', 'inventory-title.png');
        this.load.image('dark-blue-bar', 'dark-blue-bar.png');
        this.load.image('background-item', 'background-item.png');
        this.load.image('icon-dark-bar-11', 'icon-dark-bar-11.png');
        this.load.image('icon-dark-bar-22', 'icon-dark-bar-22.png');
        this.load.image('icon-dark-bar-3', 'icon-dark-bar-3.png');
        this.load.image('icon-dark-bar-4', 'icon-dark-bar-4.png');
        this.load.image('icon-dark-bar-5', 'icon-dark-bar-5.png');
        this.load.image('character-pieces', 'character-pieces.png');
        this.load.image('trunk-pieces', 'trunk-pieces.png');
        this.load.image('rarity', 'rarity.png');
    }

    create() {
        this.createInformationBar();
        this.createInventoryTitle();
        this.createBackButton();
        this.createBackgroundItem();
        this.createDarkBlueBar();
        this.createIconBar();
        this.createItemBox();
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

    createInventoryTitle() {
        gameUtils.createImage(this, 100, 8, 'inventory-title', 0.5);
    }

    createDarkBlueBar() {
        gameUtils.createImage(this, 50, 15, 'dark-blue-bar', 0.5);
        gameUtils.createButton(this, 85, 15 , 'rarity', 0.5);
    }

    createIconBar() {
        const startX = 8; // Vị trí bắt đầu
        const iconWidth = 14; // Chiều rộng mỗi icon

        gameUtils.createButton(this, startX + 0 * iconWidth - 1, 15.5, 'icon-dark-bar-11', 0.5);

        const shopBtn = gameUtils.createButton(this, startX + 1 * iconWidth, 15, 'icon-dark-bar-22', 0.5);
        shopBtn.on('pointerdown', () => {
            this.scene.start('Shop');
        });

        gameUtils.createButton(this, startX + 2 * iconWidth, 15, 'icon-dark-bar-3', 0.5);
        gameUtils.createButton(this, startX + 3 * iconWidth, 15, 'icon-dark-bar-4', 0.5);
        gameUtils.createButton(this, startX + 4 * iconWidth, 15, 'icon-dark-bar-5', 0.5);
    }

    createBackgroundItem() {
        gameUtils.createImage(this, 50, 60, 'background-item', 0.5);
    }

    createItemBox() {
        const startX = 14; // Vị trí bắt đầu X
        const startY = 27; // Vị trí bắt đầu Y
        const itemWidth = 18; // Khoảng cách giữa các item theo X
        const itemHeight = 10; // Khoảng cách giữa các item theo Y
        const columns = 5; // Số cột
        const rows = 5; // Số hàng

        // Tạo item character-pieces đầu tiên
        gameUtils.createButton(this, startX, startY, 'character-pieces', 0.5);

        // Tạo các item trunk-pieces còn lại
        let itemCount = 1; // Bắt đầu từ 1 vì item đầu tiên đã tạo

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                // Bỏ qua item đầu tiên (0,0) vì đã tạo character-pieces
                if (row === 0 && col === 0) continue;

                const x = startX + (col * itemWidth);
                const y = startY + (row * itemHeight);

                gameUtils.createButton(this, x, y, 'trunk-pieces', 0.5);

                itemCount++;
            }
        }
    }

}