import { Scene } from "phaser";
import createObjectUtils from "../../Utils/CreateObjectUtils.ts";
import {Type} from "./Enums/Type.ts";

export class Earth1 extends Scene {
    backButton: Phaser.GameObjects.Image;
    arrCharacter: Record<string, any>;
    arrCharacterBtn: Record<string, any>;

    constructor() {
        super('Earth1');
    }

    create() {
        this.createBackground();
        this.createBackButton();
        this.createWall();
        this.createStageName();
        this.createButton();
        this.createCharacter();
        this.characterSelect('gunner');
    }

    createBackground() {
        createObjectUtils.createBackground(this, 'map-1-bg');
    }

    createBackButton() {
        this.backButton = createObjectUtils.createButton(this, 7, 4, 'back-btn', 0.5);
        this.backButton.on('pointerdown', () => {
            this.scene.stop('Earth1');
            this.scene.start('Campaign');
        });
    }

    createStageName() {
        createObjectUtils.createImage(this, 10, 9, 'earth', 0.5);
        this.add.text(18, 120, 'Stage 1', {
            fontFamily: 'Russo One',
            fontSize: '25px',
            fontStyle: 'bold',
            color: '#ffffff'
        })
            .setOrigin(0, 0.5);
    }

    createWall() {
        createObjectUtils.createImage(this, 23, 75, 'wall-map-1', 0.5);
    }

    createCharacter () {
        this.arrCharacter = {};
        
        this.arrCharacter[Type.GUNNER] = createObjectUtils.createSpine(
            this,
            'player-10-gameplay',
            'player-10-gameplay-atlas',
            32,
            75,
            0.5,
            'default',
            'idle'
        );

        this.arrCharacter[Type.SNIPER] = createObjectUtils.createSpine(
            this,
            'player-11-gameplay',
            'player-11-gameplay-atlas',
            32,
            73,
            0.5,
            'default',
            'idle'
        );

        this.arrCharacter[Type.ROCKET] = createObjectUtils.createSpine(
            this,
            'player-13-gameplay',
            'player-13-gameplay-atlas',
            32,
            75,
            0.5,
            'default',
            'idle'
        );
        
        console.log(this.arrCharacter);
    }

    createButton() {
        this.arrCharacterBtn = {};
        this.createGunnerBtn();
        this.createSniperBtn();
        this.createRocketBtn();
        this.createItemCreaseDameBtn();
        this.createItemArmorBtn();
    }

    characterSelect(type: string = 'gunner') {
        for (const value of Object.values(Type)) {
            this.arrCharacterBtn[value].setInteractive();
            this.arrCharacter[value].setVisible(false);
            
            if (value == type) {
                this.arrCharacterBtn[value].disableInteractive();
                this.arrCharacter[value].setVisible(true);
            }
        }
    }

    createGunnerBtn() {
        this.arrCharacterBtn[Type.GUNNER] = createObjectUtils.createButton(this, 63, 93, 'selector-btn-gunner', 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.characterSelect('gunner');
            });
    }

    createSniperBtn() {
        this.arrCharacterBtn[Type.SNIPER] = createObjectUtils.createButton(this, 72, 83, 'selector-btn-sniper', 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.characterSelect('sniper');
            });
    }

    createRocketBtn() {
        this.arrCharacterBtn[Type.ROCKET] = createObjectUtils.createButton(this, 90, 78, 'selector-btn-rocket', 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.characterSelect('rocket');
            });
    }

    createItemCreaseDameBtn() {
        createObjectUtils.createButton(this, 88, 65, 'selector_item_btn', 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('Crease Dame');
            });
    }

    createItemArmorBtn() {
        createObjectUtils.createButton(this, 88, 92, 'selector_item_btn', 0.5)
            .setInteractive()
            .on('pointerdown', () => {
                console.log('Create Armor');
            });
    }
}