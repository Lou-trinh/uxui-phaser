import {Scene} from "phaser";

export class FramePurchase extends Scene {
    constructor() {
        super('FramePurchase');
    }

    preload() {
    }

    create() {
        this.createBackgroundPurchase();
    }

    createBackgroundPurchase() {
        // this.add.rectangle(
        //     this.cameras.main.centerX,
        //     this.cameras.main.centerY,
        //     this.cameras.main.width,
        //     this.cameras.main.height,
        //     0x000000,
        //     0.5
        // ).setDepth(10);
        //
        // const bg = createObjectUtils.createBackground(this, 'background-purchase')
        //     .setScale(0.12, 0.25)
        //     .setDepth(11);
        //
        // const maskGraphics = this.make.graphics();
        // maskGraphics.fillStyle(0xffffff);
        // maskGraphics.fillRoundedRect(
        //     bg.x - bg.displayWidth / 2,
        //     bg.y - bg.displayHeight / 2,
        //     bg.displayWidth,
        //     bg.displayHeight,
        //     20 
        // );
        //
        // const mask = maskGraphics.createGeometryMask();
        // bg.setMask(mask);
    }
}