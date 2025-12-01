import {Scene} from "phaser";
import PreloadUtils from "../Utils/PreloadUtils.ts";

export class Preload extends Scene{
    constructor ()
    {
        super('Preload');
    }
    
    preload () {
        this.preloadHome();
        this.preloadShop();
        this.preloadPlayers();
        this.preloadReward();
        this.preloadPurchase();
        this.preloadHeroRecruit();
        this.preloadBackBtn();
        this.preloadInventory();
        this.preloadBackground();
        this.preloadCharacter();
        this.preloadPlayersCard();
    }
    
    create() {
        this.scene.start('Home');
    }
    
    preloadPlayers() {
        PreloadUtils.preloadPlayer(
            this,
            'player-0',
            'player-0-ui-atlas',
            'player_0_ui.atlas',
            'player-0-ui',
            'player_0_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-1',
            'player-1-ui-atlas',
            'player_1_ui.atlas',
            'player-1-ui',
            'player_1_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-2',
            'player-2-ui-atlas',
            'player_2_ui.atlas',
            'player-2-ui',
            'player_2_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-3',
            'player-3-ui-atlas',
            'player_3_ui.atlas',
            'player-3-ui',
            'player_3_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-4',
            'player-4-ui-atlas',
            'player_4_ui.atlas',
            'player-4-ui',
            'player_4_ui.json'
        );
        
        PreloadUtils.preloadPlayer(
            this,
            'player-5',
            'player-5-ui-atlas',
            'player_5_ui.atlas',
            'player-5-ui',
            'player_5_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-6',
            'player-6-ui-atlas',
            'player_6_ui.atlas',
            'player-6-ui',
            'player_6_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-7',
            'player-7-ui-atlas',
            'player_7_ui.atlas',
            'player-7-ui',
            'player_7_ui.json'
        );

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
            'player-9',
            'player-9-ui-atlas',
            'player_9_ui.atlas',
            'player-9-ui',
            'player_9_ui.json'
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
            'player-11',
            'player-11-ui-atlas',
            'player_11_ui.atlas',
            'player-11-ui',
            'player_11_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-12',
            'player-12-ui-atlas',
            'player_12_ui.atlas',
            'player-12-ui',
            'player_12_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-13',
            'player-13-ui-atlas',
            'player_13_ui.atlas',
            'player-13-ui',
            'player_13_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-14',
            'player-14-ui-atlas',
            'player_14_ui.atlas',
            'player-14-ui',
            'player_14_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-16',
            'player-16-ui-atlas',
            'player_16_ui.atlas',
            'player-16-ui',
            'player_16_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-20',
            'player-20-ui-atlas',
            'player_20_ui.atlas',
            'player-20-ui',
            'player_20_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-21',
            'player-21-ui-atlas',
            'player_21_ui.atlas',
            'player-21-ui',
            'player_21_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-23',
            'player-23-ui-atlas',
            'player_23_ui.atlas',
            'player-23-ui',
            'player_23_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-24',
            'player-24-ui-atlas',
            'player_24_ui.atlas',
            'player-24-ui',
            'player_24_ui.json'
        );

        PreloadUtils.preloadPlayer(
            this,
            'player-28',
            'player-28-ui-atlas',
            'player_28_ui.atlas',
            'player-28-ui',
            'player_28_ui.json'
        );
    }

    preloadPlayersCard() {
        const cardNames: Record<number, string> = {
            0: 'anna_ui_card',
            1: 'davidsc_ui_card',
            2: 'david_2_ui_card',
            3: 'marcussc_ui_card',
            4: 'julia_ui_card',
            5: 'henry_ui_card',
            6: 'fiona_ui_card',
            7: 'alexandra_ui_card',
            8: 'elizabeth_ui_card',
            9: 'victoria_ui_card',
            10: 'akane_ui_card',
            11: 'alice_ui_card',
            12: 'victoriasa_ui_card',
            13: 'caitlyn_ui_card',
            14: 'henrysc_ui_card',
            16: 'annasb_ui_card',
            20: 'juliasb_ui_card',
            21: 'fionasb_ui_card',
            23: 'elizabethsa_ui_card',
            24: 'alexandrasa_ui_card',
            28: 'marcussc_ui_card'
        };

        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 20, 21, 23, 24, 28]
            .forEach(id => {
                PreloadUtils.preloadPlayer(
                    this,
                    `player-${id}`,
                    `player-${id}-ui-atlas`,
                    `player_${id}_ui.atlas`,
                    `player-${id}-ui`,
                    `player_${id}_ui.json`
                );

                // Chỉ load card nếu có trong danh sách
                if (cardNames[id]) {
                    this.load.setPath(`assets/players/player-${id}`);
                    this.load.image(cardNames[id], `${cardNames[id]}.png`);
                    this.load.setPath('');
                }
            });
    }
    
    preloadBackground() {
        this.load.setPath('assets/backgrounds');
        this.load.image('background', 'home.png');
        this.load.setPath('');
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
        this.load.image('team', 'team.png');
        this.load.image('wallet', 'wallet.png');

        //Top bar
        this.load.image('avatar-player', 'avatar-player.png');
        this.load.image('black-bar', 'black-bar.png');
        this.load.image('blue-bar-small', 'blue-bar-small.png');
        this.load.image('coin-1', 'coin-1.png');
        this.load.image('coin-2', 'coin-2.png');
        this.load.image('icon-copy', 'icon-copy.png');
        this.load.image('id-frame', 'id-frame.png');
        this.load.image('price-coin-frame', 'price-coin-frame.png');
        this.load.image('subtract', 'subtract.png');
        
        //Notice bar
        this.load.image('gift', 'gift.png');
        this.load.image('lib-icon', 'lib-icon.png');
        this.load.image('notice-icon', 'notice-icon.png');
        this.load.image('sound-icon', 'sound-icon.png');
        
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
        this.load.image('reward-title', 'reward-title.png');
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
        this.load.image('sell', 'sell.png');
        this.load.image('star', 'star.png');
        this.load.image('up-grade', 'up-grade.png');
        this.load.image('vip-level', 'vip-level.png');
        this.load.image('frame-star', 'frame-star.png');
        this.load.setPath('');
    }
    
    preloadInventory() {
        this.load.setPath('assets/inventory');
        this.load.image('character-pieces', 'character-pieces.png');
        this.load.image('inventory-title', 'inventory-title.png');
        this.load.image('rarity', 'rarity.png');
        this.load.image('trunk-pieces', 'trunk-pieces.png');
        this.load.setPath('');
    }
    
    preloadCharacter() {
        this.load.setPath('assets/character');
        this.load.image('level-a', 'level-a.png');
        this.load.image('level-b', 'level-b.png');
        this.load.image('level-c', 'level-c.png');
        this.load.image('level-s', 'level-s.png');
        this.load.image('level-ss', 'level-ss.png');
        this.load.image('icon-show', 'icon-show.png');
        this.load.image('star-1', 'star-1.png');
        this.load.image('star-2', 'star-2.png');
        this.load.image('star-3', 'star-3.png');
        this.load.image('star-4', 'star-4.png');
        this.load.image('background-character', 'background-character.png');
        this.load.image('frame-figure', 'frame-figure.png');
        this.load.image('character-title', 'character-title.png');
        this.load.image('level', 'level.png');
        this.load.image('bottom-frame-gray', 'bottom-frame-gray.png');
        this.load.image('bottom-frame-blue', 'bottom-frame-blue.png');
        this.load.image('bottom-frame-red', 'bottom-frame-red.png');
        this.load.image('bottom-frame-violet', 'bottom-frame-violet.png');
        this.load.image('bottom-frame-blue-1', 'bottom-frame-blue-1.png');
        this.load.image('bottom-frame-gray-1', 'bottom-frame-gray-1.png');
        this.load.image('bottom-frame-red-1', 'bottom-frame-red-1.png');
        this.load.image('bottom-frame-violet-1', 'bottom-frame-violet-1.png');
        this.load.image('panels-gray', 'panels-gray.png');
        this.load.image('panels-yellow', 'panels-yellow.png');
        this.load.image('panels-red', 'panels-red.png');
        this.load.image('panels-blue', 'panels-blue.png');
        this.load.image('panels-violet', 'panels-violet.png');
        this.load.image('icon-gunner-blue', 'icon-gunner-blue.png');
        this.load.image('icon-sniper-gray', 'icon-sniper-gray.png');
        this.load.image('icon-sniper-yellow', 'icon-sniper-yellow.png');
        this.load.image('icon-sniper-violet', 'icon-sniper-violet.png');
        this.load.image('icon-gunner-violet', 'icon-gunner-violet.png');
        this.load.image('icon-rifle-red', 'icon-rifle-red.png');
        this.load.image('yellow-star', 'yellow-star.png');
        this.load.image('name-fiona', 'name-fiona.png');
        this.load.image('name-henry', 'name-henry.png');
        this.load.image('name-akane', 'name-akane.png');
        this.load.image('name-elizabeth', 'name-elizabeth.png');
        this.load.image('name-alexandra', 'name-alexandra.png');
        this.load.setPath('');
    }
}