import {Scene} from "phaser";
import createObjectUtils from "../../Utils/CreateObjectUtils.ts";

export class Earth1 extends Scene {

    constructor() {
        super('Earth1');
    }

    create() {
        this.createBackground();
        this.createBackButton();
        this.createWall();
        this.createStageName();
    }

    createBackButton() {
        const shopBtn = createObjectUtils.createButton(this, 7, 4, 'back-btn', 0.5);
        shopBtn.on('pointerdown', () => this.scene.start('Campaign'));
    }

    createStageName() {
        createObjectUtils.createImage(this, 10, 9, 'earth', 0.5);

        // Add "Stage 1" text
        this.add.text(18, 120, 'Stage 1', {
            fontFamily: 'Russo One',
            fontSize: '23px',
            fontStyle: 'bold',
            color: '#ffffff'
        }).setOrigin(0, 0.5);
    }

    createBackground() {
        createObjectUtils.createBackground(this, 'map-1-bg');
    }

    createWall() {
        createObjectUtils.createImage(this, 23, 80, 'wall-map-1', 0.5);
    }
}