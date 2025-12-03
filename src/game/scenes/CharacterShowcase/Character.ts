import { Scene } from 'phaser';
import { EventBus } from '../../EventBus.ts';
import createObjectUtils from "../../Utils/CreateObjectUtils.ts";
import userInterface from "../interface/UserInterface.ts";

export class Character extends Scene {
    constructor() {
        super('Character');
    }

    create() {
        this.createBackground();
        this.createInformationBar2();
        this.createFrameNotice();
        this.createBackButton();
        this.createFrameLevel();
        this.createFrameFigureRow1();
        this.createFrameFigureRow2();
        this.createFrameFigureRow3();
        this.createTitleCharacter();

        EventBus.emit('current-scene-ready', this);
    }

    createBackground() {
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

    createFrameFigure(x: number, y: number, character: 'fiona' | 'henry' | 'akane' | 'elizabeth' | 'alexandra') {
        const config = {
            fiona: {panel: 'blue', icon: 'gunner'},
            henry: {panel: 'gray', icon: 'sniper'},
            akane: {panel: 'red', icon: 'rifle'},
            elizabeth: {panel: 'violet', icon: 'sniper'},
            alexandra: {panel: 'violet', icon: 'gunner'},
        };

        const {panel, icon} = config[character];
        const img = (asset: string, offsetY = 0, offsetX = 0, scale = 0.5) =>
            createObjectUtils.createImage(this, x + offsetX, y + offsetY, asset, scale);

        img('frame-figure');
        img(`${character}_ui_card`);
        img(`panels-${panel}`, 6.9);
        img(`icon-${icon}-${panel}`, 5.8, 8.8, 0.35);
        img(`bottom-frame-${panel}-1`, 9);
        [3.5, 6.5, 9.5, 12.5].forEach(offset => img('yellow-star', 8.5, offset));
        img('level', 7.2, -10.5);
        img(`bottom-frame-${panel}`, 9.48);
        img(`name-${character}`, 11.5);
    }

    createFrameFigureRow(y: number, chars: Array<'fiona' | 'henry' | 'akane' | 'elizabeth' | 'alexandra'>) {
        [18, 50, 82].forEach((x, i) => this.createFrameFigure(x, y, chars[i]));
    }

    createFrameFigureRow1() { this.createFrameFigureRow(38, ['fiona', 'alexandra', 'akane']); }
    createFrameFigureRow2() { this.createFrameFigureRow(63, ['akane', 'elizabeth', 'henry']); }
    createFrameFigureRow3() { this.createFrameFigureRow(86, ['henry', 'alexandra', 'fiona']); }
}
