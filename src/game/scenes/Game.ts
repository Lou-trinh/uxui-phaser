import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import gameUtils from "../GameUtils.ts";

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');
        this.load.image('background', 'home.png');
        this.load.image('battle', 'battle.png');
        this.load.image('hero-recruit', 'hero-recruit.png');
        this.load.image('reward', 'reward.png');
        this.load.image('shop', 'shop.png');
        this.load.image('team', 'team.png');
        this.load.image('guild', 'guild.png');
        this.load.image('inventory', 'inventory.png');
        this.load.image('wallet', 'wallet.png');
        this.load.image('character', 'character.png')
        this.load.image('blue-bar', 'blue-bar.png')
        this.load.image('black-bar', 'black-bar.png')
        this.load.image('information-bar', 'information-bar.png')
        this.load.image('gift', 'gift.png')
        this.load.image('change-character', 'change-character.png')
    }

    create ()
    {
        this.createBackground();
        this.createCharacter();
        this.createMiddleButtons();
        this.createBottomButtons();
        this.createNoticeBar();
        this.createInformationBar();
        this.createGift();
        this.createChangeCharacter();
        
        EventBus.emit('current-scene-ready', this);
    }
    
    createMiddleButtons () {
        gameUtils.createButton(this, 100, 76, 'battle', 0.5);
        gameUtils.createButton(this, 0, 76, 'hero-recruit', 0.5);
        const shop = gameUtils.createButton(this, 0, 65, 'shop', 0.5);
        gameUtils.createButton(this, 100, 65, 'reward', 0.5);
        
        shop.on('pointerdown', () => {
            this.scene.start('Shop');
        });
    }

    createBottomButtons () {
        gameUtils.createImage(this, 50, 95, 'blue-bar', 0.5);
        gameUtils.createButton(this, 14, 94, 'team', 0.5);
        gameUtils.createButton(this, 38, 94, 'guild', 0.5);
        const inventory = gameUtils.createButton(this, 62, 94, 'inventory', 0.5);
        gameUtils.createButton(this, 86, 94, 'wallet', 0.5);

        inventory.on('pointerdown', () => {
            this.scene.start('/');
        });
    }

    createCharacter () {
        gameUtils.createImage(this, 50, 61, 'character', 0.5);
    }

    createBackground () {
        gameUtils.createBackground(this, 'background');
    }
    
    createNoticeBar () {
        gameUtils.createImage(this, 0, 4, 'black-bar', 0.5);
    }
    
    createInformationBar () {
        gameUtils.createImage(this, 0, 12, 'information-bar', 0.5);
    }
    
    createGift () {
        gameUtils.createImage(this, 100, 19, 'gift', 0.5);
    }
    
    createChangeCharacter() {
        gameUtils.createButton(this, 50, 50, 'change-character', 0.5);
    }
}