import { Scene } from "phaser";
import createObjectUtils from "../../Utils/CreateObjectUtils.ts";
import userInterfaceUtils from "../interface/UserInterface.ts";

export class Battle extends Scene {
    constructor() {
        super('Battle');
    }

    create() {
        this.createBackground();
        this.createInformationBar();
        this.createFrameNotice();
        this.createShopTitle();
        this.createBackButton();
        this.createFrameCampaign();
        this.createFrameBoss();
        this.createFrameMultiplayer();
    }

    createBackground () {
        createObjectUtils.createBackground(this, 'battle-bg',);

        this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.4
        );
    }

    createInformationBar() {
        userInterfaceUtils.createInformationBar2(this);
    }

    createFrameNotice() {
        userInterfaceUtils.createFrameNotice(this);
    }

    createShopTitle() {
        createObjectUtils.createImage(this, 80, 15, 'battle-title', 0.5);
    }

    createBackButton() {
        const shopBtn = createObjectUtils.createButton(this, 7, 15, 'back-btn', 0.5);

        shopBtn.on('pointerdown', () => {
            this.scene.start('Home');
        });
    }

    createFrameCampaign() {
        this.createGameModeFrame({
            bgY: 30,
            titleY: 0.235,
            title: 'Campaign',
            descY: 0.275,
            desc: 'Face off against AI robot armies to\ncomplete missions and unlock new\nchapters.',
            buttons: [{ image: 'play-button', x: 84, y: 35 }],
            onPlayClick: () => {
                this.scene.start('Campaign');
            }
        });
    }

    createFrameBoss() {
        this.createGameModeFrame({
            bgY: 48,
            titleY: 0.415,
            title: 'Multiplayer Boss',
            descY: 0.455,
            desc: 'Boss fight together',
            buttons: [
                { image: 'create-button', x: 84, y: 53 },
                { image: 'join-button', x: 59, y: 53 },
                { image: 'rooms-button', x: 34, y: 53 }
            ]
        });
    }

    createFrameMultiplayer() {
        this.createGameModeFrame({
            bgY: 66,
            titleY: 0.595,
            title: 'Boss',
            descY: 0.635,
            desc: 'Participate in raids on giant Boss bases to\ndefeat them and collect rare items.',
            buttons: [{ image: 'play-button', x: 84, y: 71 }],
            onPlayClick: () => {
                this.scene.start('BossMode');
            }
        });
    }

    createGameModeFrame(config: {
        bgY: number,
        titleY: number,
        title: string,
        descY: number,
        desc: string,
        buttons: Array<{ image: string, x: number, y: number }>,
        onPlayClick?: () => void 
    }) {
        const bg = config.title === 'Campaign' ? 'campaign-bg' : 'boss-bg';
        createObjectUtils.createImage(this, 50, config.bgY, bg, 0.5);

        this.add.text(
            this.scale.width * 0.07,
            this.scale.height * config.titleY,
            config.title,
            { fontFamily: 'Arial', fontSize: '28px', fontStyle: 'bold', color: '#ffffff' }
        );

        this.add.text(
            this.scale.width * 0.07,
            this.scale.height * config.descY,
            config.desc,
            { fontFamily: 'Arial', fontSize: '14px', color: '#ffffff', lineSpacing: 2 }
        );
        
        config.buttons.forEach(btn => {
            const button = createObjectUtils.createButton(this, btn.x, btn.y, btn.image, 0.5);
            
            if (btn.image === 'play-button' && config.onPlayClick) {
                button.on('pointerdown', () => {
                    config.onPlayClick!();
                });
            }
        });
    }
}