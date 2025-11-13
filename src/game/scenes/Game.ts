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
        this.load.image('blue-bar-small', 'blue-bar-small.png')
        this.load.image('gift', 'gift.png')
        this.load.image('change-character', 'change-character.png')
        this.load.image('price-coin-frame', 'price-coin-frame.png')
        this.load.image('coin-1', 'coin-1.png')
        this.load.image('coin-2', 'coin-2.png')
        this.load.image('subtract', 'subtract.png')
        this.load.image('avata-player', 'avata-player.png')
        this.load.image('vip-level', 'vip-level.png')
        this.load.image('icon-copy', 'icon-copy.png')
        this.load.image('id-frame', 'id-frame.png')
        this.load.image('notice-icon', 'notice-icon.png')
        this.load.image('sound-icon', 'sound-icon.png')
        this.load.image('lib-icon', 'lib-icon.png')
        this.load.image('frame-notice', 'frame-notice.png')
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
        this.createFrameNotice();
        
        EventBus.emit('current-scene-ready', this);
    }
    
    createMiddleButtons () {
        gameUtils.createButton(this, 100, 76, 'battle', 0.5);
        gameUtils.createButton(this, 0, 76, 'hero-recruit', 0.5);
        const shop = gameUtils.createButton(this, 0, 65, 'shop', 0.5);
        const reward = gameUtils.createButton(this, 100, 65, 'reward', 0.5);
        
        shop.on('pointerdown', () => {
            this.scene.start('Shop');
        });

        reward.on('pointerdown', () => {
            this.scene.start('Reward');
        });
    }

    createBottomButtons () {
        gameUtils.createImage(this, 50, 95, 'blue-bar', 0.5);
        gameUtils.createButton(this, 14, 94, 'team', 0.5);
        gameUtils.createButton(this, 38, 94, 'guild', 0.5);
        const inventory = gameUtils.createButton(this, 62, 94, 'inventory', 0.5);
        gameUtils.createButton(this, 86, 94, 'wallet', 0.5);

        inventory.on('pointerdown', () => {
            this.scene.start('Inventory');
        });
    }

    createCharacter () {
        gameUtils.createImage(this, 50, 61, 'character', 0.5);
    }

    createBackground () {
        gameUtils.createBackground(this, 'background');
        
        this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.4
        );
    }
    
    createNoticeBar () {
        gameUtils.createImage(this, 0, 4, 'black-bar', 0.5);
    }

    createInformationBar () {
        gameUtils.createImage(this, 0, 9, 'blue-bar-small', 0.5);
        gameUtils.createImage(this, 61, 9, 'price-coin-frame', 0.5);
        gameUtils.createImage(this, 86, 9, 'price-coin-frame', 0.5);
        gameUtils.createImage(this, 76, 8.5, 'coin-1', 0.5);
        gameUtils.createImage(this, 51, 8.5, 'coin-2', 0.5);
        gameUtils.createImage(this, 95, 9, 'subtract', 0.5);
        gameUtils.createImage(this, 70, 9, 'subtract', 0.5);
        gameUtils.createImage(this, 10, 12.5, 'avata-player', 0.5);
        gameUtils.createImage(this, 25, 9, 'vip-level', 0.5);
        gameUtils.createImage(this, 42, 15, 'icon-copy', 0.5);
        gameUtils.createImage(this, 27, 15, 'id-frame', 0.5);

        // Thêm text Player Name
        const playerNameText = this.add.text(
            this.scale.width * 0.19,
            this.scale.height * 0.125,
            'Player name999',
            {
                fontFamily: 'Arial Narrow, Arial, sans-serif',
                fontSize: '18px',
                color: '#ffffff',
                fontStyle: 'bold'
            }
        );
        playerNameText.setOrigin(0, 0.5);

        // Thêm text ID
        const playerIdText = this.add.text(
            this.scale.width * 0.17,
            this.scale.height * 0.15,
            'ID:1923442345674',
            {
                fontFamily: 'Arial',
                fontSize: '12px',
                color: '#ffffff'
            }
        );
        playerIdText.setOrigin(0, 0.5);

        // Thêm text số coin 1
        const coin1Text = this.add.text(
            this.scale.width * 0.82,
            this.scale.height * 0.090,
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
            this.scale.height * 0.090,
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
    
    createGift () {
        gameUtils.createButton(this, 100, 19, 'gift', 0.5);
    }
    
    createChangeCharacter() {
        gameUtils.createButton(this, 50, 50, 'change-character', 0.5);
    }

    createFrameNotice() {
        const graphics = this.add.graphics();
        const frameX = this.scale.width * 0.75;
        const frameY = this.scale.height * 0.113;
        const frameWidth = this.scale.width * 0.26;
        const frameHeight = this.scale.height * 0.05;

        graphics.fillStyle(0x0B117B, 0.6);
        graphics.fillRoundedRect(frameX, frameY, frameWidth, frameHeight, 8);

        const iconY = 13.8; // Vị trí Y cho các icon
        const startX = 79; // Vị trí bắt đầu
        const spacing = 8; // Khoảng cách giữa các icon

        gameUtils.createButton(this, startX, iconY, 'notice-icon', 0.5);
        gameUtils.createButton(this, startX + spacing, iconY, 'sound-icon', 0.5);
        gameUtils.createButton(this, startX + spacing * 2, iconY, 'lib-icon', 0.5);
    }
}