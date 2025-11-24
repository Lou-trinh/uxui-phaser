import {Scene} from "phaser";
import PreloadUtils from "../Utils/PreloadUtils.ts";

export class Preload extends Scene{
    constructor ()
    {
        super('Preload');
    }
    
    preload () {
        this.preloadCommon();
        this.preloadHome();
        this.preloadShop();
        this.preloadPlayers();
        this.preloadReward();
        this.preloadPurchase();
        this.preloadHeroRecruit();
        this.preloadBackBtn();
        this.preloadInventory();
    }
    
    create() {
        this.scene.start('Home');
    }
    
    preloadCommon() {
        this.load.setPath('assets');
        this.load.image('background', 'home.png');
        this.load.image('frame-star', 'frame-star.png');
        this.load.image('sell', 'sell.png');
        this.load.image('sound-icon', 'sound-icon.png');
        this.load.image('star', 'star.png');
        this.load.image('subtract', 'subtract.png');
        this.load.image('team', 'team.png');
        this.load.image('trunk-pieces', 'trunk-pieces.png');
        this.load.image('up-grade', 'up-grade.png');
        this.load.image('vip-level', 'vip-level.png');
        this.load.image('wallet', 'wallet.png');
        this.load.setPath('');
    }
    
    preloadPlayers() {
        PreloadUtils.preloadPlayer(
            this,
            'player-8',
            'player-8-ui-atlas',
            'player_8_ui.atlas',
            'player-8-ui',
            'player_8_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-10',
            'player-10-ui-atlas',
            'player_10_ui.atlas',
            'player-10-ui',
            'player_10_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-20',
            'player-20-ui-atlas',
            'player_20_ui.atlas',
            'player-20-ui',
            'player_20_ui.json'
        );
    }

    preloadShop() {
        this.load.setPath('assets/shop');
        this.load.image('buy-button', 'buy-button.png');
        this.load.image('cancel-button', 'cancel-button.png');
        this.load.image('background-purchase', 'background-purchase.png');
        this.load.image('background-item', 'background-item.png');
        this.load.image('item-not-sale', 'item-not-sale.png');
        this.load.image('item-sale', 'item-sale.png');
        this.load.image('dark-blue-bar', 'dark-blue-bar.png');
        this.load.image('icon-dark-bar-1', 'icon-dark-bar-1.png');
        this.load.image('icon-dark-bar-11', 'icon-dark-bar-11.png');
        this.load.image('icon-dark-bar-2', 'icon-dark-bar-2.png');
        this.load.image('icon-dark-bar-22', 'icon-dark-bar-22.png');
        this.load.image('icon-dark-bar-3', 'icon-dark-bar-3.png');
        this.load.image('icon-dark-bar-4', 'icon-dark-bar-4.png');
        this.load.image('icon-dark-bar-5', 'icon-dark-bar-5.png');
        this.load.image('shop-title', 'shop-title.png');
        this.load.setPath('');
    }
    
    preloadHome() {
        this.load.setPath('assets/home');
        
        //middle buttons
        this.load.image('battle', 'battle.png');
        this.load.image('hero-recruit', 'hero-recruit.png');
        this.load.image('shop', 'shop.png');
        this.load.image('reward', 'reward.png');
        this.load.image('change-left-btn', 'change-left-btn.png');
        this.load.image('change-right-btn', 'change-right-btn.png');

        //Bottom buttons
        this.load.image('blue-bar', 'blue-bar.png');
        this.load.image('guild', 'guild.png');
        this.load.image('inventory', 'inventory.png');

        //Top bar
        this.load.image('avatar-player', 'avatar-player.png');
        this.load.image('black-bar', 'black-bar.png');
        this.load.image('blue-bar-small', 'blue-bar-small.png');
        this.load.image('coin-1', 'coin-1.png');
        this.load.image('coin-2', 'coin-2.png');
        this.load.image('icon-copy', 'icon-copy.png');
        this.load.image('id-frame', 'id-frame.png');
        this.load.image('price-coin-frame', 'price-coin-frame.png');
        
        //Notice bar
        this.load.image('gift', 'gift.png');
        this.load.image('lib-icon', 'lib-icon.png');
        this.load.image('notice-icon', 'notice-icon.png');
        
        this.load.setPath('');
        
    }
    
    preloadBackBtn() {
        this.load.setPath('assets/backBtn');
        this.load.image('back-btn', 'back-btn.png');
        this.load.setPath('');
    }
    
    preloadReward() {
        this.load.setPath('assets/reward');
        this.load.image('achievement', 'achievement.png');
        this.load.image('airdrop', 'airdrop.png');
        this.load.image('broken-line', 'broken-line.png');
        this.load.image('claim-button', 'claim-button.png');
        this.load.image('frame-achievement', 'frame-achievement.png');
        this.load.image('go-button', 'go-button.png');
        this.load.image('items', 'items.png');
        this.load.image('mission', 'mission.png');
        this.load.setPath('');
    }
    
    preloadPurchase() {
        this.load.setPath('assets/purchase');
        this.load.image('add', 'add.png');
        this.load.image('minus', 'minus.png');
        this.load.image('cost-chip', 'cost-chip.png');
        this.load.image('item-character-box', 'item-character-box.png');
        this.load.image('item-info', 'item-info.png');
        this.load.image('item-purchase', 'item-purchase.png');
        this.load.image('max', 'max.png');
        this.load.image('min', 'min.png');
        this.load.setPath('');
    }
    
    preloadHeroRecruit() {
        this.load.setPath('assets/hero-recruit');
        this.load.image('akane', 'akane.png');
        this.load.image('character-showcase-title', 'character-showcase-title.png');
        this.load.image('circle1', 'circle1.png');
        this.load.image('circle2', 'circle2.png');
        this.load.image('circle3', 'circle3.png');
        this.load.image('equip', 'equip.png');
        this.load.image('extract', 'extract.png');
        this.load.image('gunner', 'gunner.png');
        this.load.image('icon-gun', 'icon-gun.png');
        this.load.image('level-10', 'level-10.png');
        this.load.image('level-character', 'level-character.png');
        this.load.image('level-up', 'level-up.png');
        this.load.image('mint', 'mint.png');
        this.load.image('name-character-frame', 'name-character-frame.png');
        this.load.setPath('');
    }
    
    preloadInventory() {
        this.load.setPath('assets/inventory');
        this.load.image('character-pieces', 'character-pieces.png');
        this.load.image('inventory-title', 'inventory-title.png');
        this.load.image('rarity', 'rarity.png');
        this.load.setPath('');
    }
}