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
    }

    create ()
    {
        gameUtils.createBackground(this, 'background')

        gameUtils.createButton(this, 50, 65, 'character', 0.5);
        gameUtils.createButton(this, 100, 90, 'battle', 0.5);
        gameUtils.createButton(this, 0, 90, 'hero-recruit', 0.5);
        gameUtils.createButton(this, 0, 74, 'shop', 0.5);
        gameUtils.createButton(this, 100, 74, 'reward', 0.5);
        
        EventBus.emit('current-scene-ready', this);
    }
}