import { Scene } from 'phaser';
import createObjectUtils from "../../Utils/CreateObjectUtils.ts";
import userInterfaceUtils from "../interface/UserInterface.ts";
import numberUtils from "../../Utils/NumberUtils.ts";

export class Shop extends Scene {
    blurOverlay!: Phaser.GameObjects.Rectangle;
    bg!: Phaser.GameObjects.Image;
    maskGraphics!: Phaser.GameObjects.Graphics;
    btnCancel!: Phaser.GameObjects.Image;
    btnBuy!: Phaser.GameObjects.Image;
    titlePurchase!: Phaser.GameObjects.Image;
    titlePurchaseBox!: Phaser.GameObjects.Image;
    titleText!: Phaser.GameObjects.Text;
    ownedText!: Phaser.GameObjects.Text;
    itemInfo!: Phaser.GameObjects.Image;
    descriptionText!: Phaser.GameObjects.Text;
    addIcon!: Phaser.GameObjects.Image;
    minusIcon!: Phaser.GameObjects.Image;
    minIcon!: Phaser.GameObjects.Image;
    maxIcon!: Phaser.GameObjects.Image;
    costChip!: Phaser.GameObjects.Image;
    quantityText!: Phaser.GameObjects.Text;
    quantityBox!: Phaser.GameObjects.Graphics;

    // Scroll properties
    scrollContainer!: Phaser.GameObjects.Container;
    scrollMask!: Phaser.GameObjects.Graphics;
    isDragging: boolean = false;
    dragStartY: number = 0;
    scrollY: number = 0;
    minScrollY: number = 0;
    maxScrollY: number = 0;

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
        this.createScrollableItemBox();
    }

    createBackButton() {
        const shopBtn = createObjectUtils.createButton(this, 7, 8, 'back-btn', 0.5);

        shopBtn.on('pointerdown', () => {
            this.scene.start('Home');
        });
    }

    createInformationBar() {
        userInterfaceUtils.createInformationBar(this);
    }

    createShopTitle() {
        createObjectUtils.createImage(this, 100, 8, 'shop-title', 0.5);
    }

    createDarkBlueBar() {
        createObjectUtils.createImage(this, 50, 15, 'dark-blue-bar', 0.5);
    }

    createIconBar() {
        const startX = 8;
        const iconWidth = 14;

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

    createScrollableItemBox() {
        // this.scrollContainer = this.add.container(0, 0);
        //
        // const count: number = 11;
        // let numRow = Math.ceil(count / 3);
        //
        // for (let i = 0; i < numRow; i++) {
        //     for (let j = 0; j < 3; j++) {    
        //         const index = i * 3 + j;
        //         if (index >= count) break;
        //
        //         const saleNumber = numberUtils.getRandomNumberOfRange(0, 2);
        //         const texture = saleNumber % 2 === 1 ? 'item-sale' : 'item-not-sale';
        //
        //         const x = this.cameras.main.width * (j * 0.33 + 0.167);
        //         const y = i * (this.cameras.main.height * 0.26) + (this.cameras.main.height * 0.34);
        //
        //         const itemBtn = createObjectUtils.createButton(this, 0, 0, texture, 0.5);
        //         itemBtn.setPosition(x, y);
        //
        //         itemBtn.on('pointerdown', () => {
        //             if (!this.isDragging) {
        //                 this.createBackgroundPurchase();
        //             }
        //         });
        //
        //         this.scrollContainer.add(itemBtn);
        //     }
        // }
        //
        // const containerHeight = numRow * (this.cameras.main.height * 0.26);
        // const visibleHeight = this.cameras.main.height * 0.6;
        // this.maxScrollY = Math.max(0, containerHeight - visibleHeight);
        //
        // this.setupScrollMask();
        //
        // this.setupScrollEvents();
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

    setupScrollMask() {
        const camera = this.cameras.main;
        const maskStartY = camera.height * 0.2;
        const maskHeight = camera.height * 0.85;

        this.scrollMask = this.make.graphics();
        this.scrollMask.fillStyle(0xffffff);
        this.scrollMask.fillRect(0, maskStartY, camera.width, maskHeight);

        const mask = this.scrollMask.createGeometryMask();
        this.scrollContainer.setMask(mask);
    }

    setupScrollEvents() {
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.isDragging = false;
            this.dragStartY = pointer.y;
        });

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (pointer.isDown) {
                const deltaY = pointer.y - this.dragStartY;

                if (Math.abs(deltaY) > 5) {
                    this.isDragging = true;
                }

                if (this.isDragging) {
                    this.scrollY -= deltaY;
                    this.scrollY = Phaser.Math.Clamp(this.scrollY, this.minScrollY, this.maxScrollY);
                    this.scrollContainer.y = -this.scrollY;
                    this.dragStartY = pointer.y;
                }
            }
        });

        this.input.on('pointerup', () => {
            setTimeout(() => {
                this.isDragging = false;
            }, 100);
        });

        this.input.on('wheel', (_pointer: Phaser.Input.Pointer, _gameObjects: any[], _deltaX: number, deltaY: number) => {
            this.scrollY += deltaY * 0.5;
            this.scrollY = Phaser.Math.Clamp(this.scrollY, this.minScrollY, this.maxScrollY);
            this.scrollContainer.y = -this.scrollY;
        });
    }

    createBackgroundPurchase() {
        this.setupBlurOverlay();
        this.setupBackground();
        this.setupTitleItemPurchase();
        this.setupItemCharacterBox();
        this.setupItemInfo();
        this.setupQuantityControls();
        this.setupCostChip();
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
        this.titlePurchase?.destroy();
        this.titlePurchaseBox?.destroy();
        this.titleText?.destroy();
        this.ownedText?.destroy();
        this.itemInfo?.destroy();
        this.descriptionText?.destroy();
        this.addIcon?.destroy();
        this.minusIcon?.destroy();
        this.minIcon?.destroy();
        this.maxIcon?.destroy();
        this.quantityText?.destroy();
        this.costChip?.destroy();
        this.quantityBox?.destroy();
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

    setupTitleItemPurchase() {
        this.titlePurchase = createObjectUtils.createImage(this, 50, 23, 'item-purchase', 0.5)
            .setScale(0.5)
            .setDepth(12);
    }

    setupItemCharacterBox() {
        this.titlePurchaseBox = createObjectUtils.createImage(this, 50, 38, 'item-character-box', 0.5)
            .setScale(0.5)
            .setDepth(12);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.titleText = this.add.text(centerX, centerY - 200, 'Character C Box', {
            fontFamily: 'Arial',
            fontSize: '18px',
            color: '#2c2c2c',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(13);

        this.ownedText = this.add.text(centerX, centerY - 30, 'Owned : 2', {
            fontFamily: 'Arial',
            fontSize: '13px',
            color: '#666666'
        }).setOrigin(0.5).setDepth(13);
    }

    setupItemInfo() {
        this.itemInfo = createObjectUtils.createImage(this, 50, 50, 'item-info', 0.5)
            .setScale(0.5)
            .setDepth(12);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.descriptionText = this.add.text(centerX, centerY + 55,
            'Lorem ipsum dolor sit amet consectetur. At tortor vitae nec nibh eu\nimperdiet. Lobortis sit maecenas enim enim lobortis maecenas diam\ninteger. Varius vitae urna integer velit donec sapien. Sit nulla leo vel nisi\nvolutpat scelerisque.',
            {
                fontFamily: 'Arial',
                fontSize: '10px',
                color: '#666666',
                align: 'center',
                lineSpacing: 2,
                wordWrap: { width: 350 }
            }
        ).setOrigin(0.5).setDepth(13);
    }

    setupQuantityControls() {
        this.setupMinIcon();
        this.setupMinusIcon();
        this.setupQuantityText();
        this.setupAddIcon();
        this.setupMaxIcon();
        this.setupFrameQuantityControls();
    }

    setupQuantityText() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.quantityText = this.add.text(centerX, centerY + 125, '1/2', {
            fontFamily: 'Arial',
            fontSize: '16px',
            color: '#333333',
            fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(13);
    }

    setupFrameQuantityControls() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY + 125;

        this.quantityBox = this.add.graphics();
        this.quantityBox.fillStyle(0xffffff, 1);
        this.quantityBox.lineStyle(1, 0xe0e0e0, 1);
        this.quantityBox.fillRoundedRect(centerX - 90, centerY - 17, 180, 34, 6);
        this.quantityBox.strokeRoundedRect(centerX - 90, centerY - 17, 180, 34, 6);
        this.quantityBox.setDepth(11.5);
    }

    setupAddIcon() {
        this.addIcon = createObjectUtils.createButton(this, 63, 63, 'add', 0.5)
            .setScale(0.5)
            .setDepth(12);
    }

    setupMinusIcon() {
        this.minusIcon = createObjectUtils.createButton(this, 37, 63, 'minus', 0.5)
            .setScale(0.5)
            .setDepth(12);
    }

    setupMinIcon() {
        this.minIcon = createObjectUtils.createButton(this, 27, 63, 'min', 0.5)
            .setScale(0.5)
            .setDepth(12);
    }

    setupMaxIcon() {
        this.maxIcon = createObjectUtils.createButton(this, 73, 63, 'max', 0.5)
            .setScale(0.5)
            .setDepth(12);
    }

    setupCostChip() {
        this.costChip = createObjectUtils.createImage(this, 50, 69, 'cost-chip', 0.5)
            .setScale(0.5)
            .setDepth(12);
    }
}