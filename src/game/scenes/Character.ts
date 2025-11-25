import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import createObjectUtils from "../Utils/CreateObjectUtils.ts";
import userInterface from "./interface/UserInterface.ts";

export class Character extends Scene
{
    constructor ()
    {
        super('Character');
    }

    create ()
    {
        this.createBackground();
        this.createInformationBar2();
        this.createFrameNotice();
        this.createBackButton();
        this.createFrameLevel();

        EventBus.emit('current-scene-ready', this);
    }

    createBackground () {
        createObjectUtils.createBackground(this, 'background-character');

        this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.4
        );
    }

    createBackButton() {
        const shopBtn = createObjectUtils.createButton(this, 7, 15, 'back-btn', 0.5);

        shopBtn.on('pointerdown', () => {
            this.scene.start('CharacterShowcase');
        });
    }

    createInformationBar2() {
       userInterface.createInformationBar2(this);
    }

    createFrameNotice() {
       userInterface.createFrameNotice(this);
    }

    createFrameLevel() {
        const graphics = this.add.graphics();
        const width = Number(this.sys.game.config.width);

     
        graphics.lineStyle(2, 0xffffff, 1);
        graphics.lineBetween(0, 180, width, 180);
        
        graphics.lineBetween(0, 240, width, 240);
        
        createObjectUtils.createButton(this, 0, 22, 'icon-show', 0.5);
        createObjectUtils.createButton(this, 10, 22, 'level-c', 0.5);
        createObjectUtils.createButton(this, 17, 22, 'level-b', 0.5);
        createObjectUtils.createButton(this, 24, 22, 'level-a', 0.5);
        createObjectUtils.createButton(this, 31, 22, 'level-s', 0.5);
        createObjectUtils.createButton(this, 40, 22, 'level-ss', 0.5);
        createObjectUtils.createButton(this, 53, 22, 'star-1', 0.5);
        createObjectUtils.createButton(this, 63, 22, 'star-2', 0.5);
        createObjectUtils.createButton(this, 75, 22, 'star-3', 0.5);
        createObjectUtils.createButton(this, 90, 22, 'star-4', 0.5);
    }
}