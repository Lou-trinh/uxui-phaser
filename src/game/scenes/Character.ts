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
        this.createFrameFigure();
        this.createTitleCharacter();

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
    
    createTitleCharacter() {
        createObjectUtils.createImage(this, 81, 15, 'character-title', 0.5);
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

    createFrameFigure() {
        const x = 18;
        const y = 38;

        createObjectUtils.createImage(this, x, y, 'frame-figure', 0.5);
        createObjectUtils.createImage(this, x, y, 'fiona_ui_card', 0.5);
        createObjectUtils.createImage(this, x, y + 6.9, 'panels-blue', 0.5);
        createObjectUtils.createImage(this, x + 8.8, y + 6.3, 'icon-sniper-blue', 0.5);
        createObjectUtils.createImage(this, x, y + 9, 'bottom-frame-blue-1', 0.5);

        [3.5, 6.5, 9.5, 12.5].forEach(offset => {
            createObjectUtils.createImage(this, x + offset, y + 8.5, 'yellow-star', 0.5);
        });

        createObjectUtils.createImage(this, x - 10.5, y + 7.2, 'level', 0.5);
        createObjectUtils.createImage(this, x, y + 9.48, 'bottom-frame-blue', 0.5);
        createObjectUtils.createImage(this, x, y + 11.5, 'name-fiona', 0.5);
    }
}