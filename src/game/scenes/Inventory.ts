import { Scene } from 'phaser';
import createObjectUtils from "../Utils/CreateObjectUtils.ts";
import uiUtils from "../Utils/UserInterfaceUtils.ts";


export class Inventory extends Scene {
    constructor ()
    {
        super('Inventory');
    }

    preload() {
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
        const backBtn = createObjectUtils.createButton(this, 7, 8, 'back-btn', 0.5);

        backBtn.on('pointerdown', () => {
            this.scene.start('Home');
        });
    }

    createInformationBar () {
        uiUtils.createInformationBar(this);
    }

    createInventoryTitle() {
        createObjectUtils.createImage(this, 100, 8, 'inventory-title', 0.5);
    }

    createDarkBlueBar() {
        createObjectUtils.createImage(this, 50, 15, 'dark-blue-bar', 0.5);
        createObjectUtils.createButton(this, 85, 15 , 'rarity', 0.5);
    }

    createIconBar() {
        const startX = 8; // Vị trí bắt đầu
        const iconWidth = 14; // Chiều rộng mỗi icon

        createObjectUtils.createButton(this, startX + 0 * iconWidth - 1, 15.5, 'icon-dark-bar-11', 0.5);

        const shopBtn = createObjectUtils.createButton(this, startX + 1 * iconWidth, 15, 'icon-dark-bar-22', 0.5);
        shopBtn.on('pointerdown', () => {
            this.scene.start('Shop');
        });

        createObjectUtils.createButton(this, startX + 2 * iconWidth, 15, 'icon-dark-bar-3', 0.5);
        createObjectUtils.createButton(this, startX + 3 * iconWidth, 15, 'icon-dark-bar-4', 0.5);
        createObjectUtils.createButton(this, startX + 4 * iconWidth, 15, 'icon-dark-bar-5', 0.5);
    }

    createBackgroundItem() {
        createObjectUtils.createImage(this, 50, 60, 'background-item', 0.5);
    }

    createItemBox() {
        const startX = 14; // Vị trí bắt đầu X
        const startY = 27; // Vị trí bắt đầu Y
        const itemWidth = 18; // Khoảng cách giữa các item theo X
        const itemHeight = 10; // Khoảng cách giữa các item theo Y
        const columns = 5; // Số cột
        const rows = 5; // Số hàng

        // Tạo item character-pieces đầu tiên
        createObjectUtils.createButton(this, startX, startY, 'character-pieces', 0.5);

        // Tạo các item trunk-pieces còn lại
        let itemCount = 1; // Bắt đầu từ 1 vì item đầu tiên đã tạo

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                // Bỏ qua item đầu tiên (0,0) vì đã tạo character-pieces
                if (row === 0 && col === 0) continue;

                const x = startX + (col * itemWidth);
                const y = startY + (row * itemHeight);

                createObjectUtils.createButton(this, x, y, 'trunk-pieces', 0.5);

                itemCount++;
            }
        }
    }

}