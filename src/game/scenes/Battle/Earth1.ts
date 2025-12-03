import { Scene } from "phaser";
import createObjectUtils from "../../Utils/CreateObjectUtils.ts";
import { SpineGameObject } from "@esotericsoftware/spine-phaser-v3";

export class Earth1 extends Scene {
    private weaponButtons: Map<string, { normal: Phaser.GameObjects.Image, selected: Phaser.GameObjects.Image }> = new Map();

    arrCharacter: SpineGameObject[] = [];
    arrEnemies: SpineGameObject[] = [];

    private currentWeapon: string = 'gunner';

    constructor() {
        super('Earth1');
    }
    
    init() {
        this.arrCharacter = [];
        this.arrEnemies = [];
        this.currentWeapon = 'gunner';
    }

    shutdownSpine() {
        this.arrCharacter.forEach(s => s.destroy());
        this.arrEnemies.forEach(s => s.destroy());
    }

    shutdown() {
        this.shutdownSpine();
    }

    destroy() {
        this.shutdownSpine();
    }

    create() {
        this.createBackground();
        this.createBackButton();
        this.createEnemy();
        this.createWall();
        this.createStageName();
        this.createCharacter();
        this.createShootBtn();
        this.createShootZone();

        this.updateCharacterVisibility();
    }

    createBackButton() {
        const shopBtn = createObjectUtils.createButton(this, 7, 4, 'back-btn', 0.5);
        shopBtn.on('pointerdown', () => {
            this.scene.stop('Earth1');
            this.scene.start('Campaign');
        });
    }

    createStageName() {
        createObjectUtils.createImage(this, 10, 9, 'earth', 0.5);

        this.add.text(18, 120, 'Stage 1', {
            fontFamily: 'Russo One',
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#ffffff'
        }).setOrigin(0, 0.5);
    }

    createBackground() {
        createObjectUtils.createBackground(this, 'map-1-bg');
    }

    createWall() {
        createObjectUtils.createImage(this, 23, 75, 'wall-map-1', 0.5);
    }

    createShootBtn() {
        const weapons = [
            { name: 'gunner', x: 63, y: 93, default: true },
            { name: 'sniper', x: 72, y: 83, default: false },
            { name: 'rocket', x: 90, y: 78, default: false }
        ];

        weapons.forEach(weapon => {
            const normalBtn = createObjectUtils.createButton(this, weapon.x, weapon.y, `selector-btn-${weapon.name}`, 0.5);
            const selectedBtn = createObjectUtils.createButton(this, weapon.x, weapon.y, `selector-btn-${weapon.name}-selected`, 0.5);

            selectedBtn.setVisible(weapon.default);

            this.weaponButtons.set(weapon.name, { normal: normalBtn, selected: selectedBtn });

            normalBtn.on("pointerdown", () => this.selectWeapon(weapon.name));
            selectedBtn.on("pointerdown", () => this.selectWeapon(weapon.name));
        });

        createObjectUtils.createButton(this, 88, 92, 'selector_item_btn', 0.5);
        createObjectUtils.createButton(this, 88, 64, 'selector_item_btn', 0.5);
    }

    selectWeapon(weaponType: string) {
        this.weaponButtons.forEach(btn => btn.selected.setVisible(false));
        this.weaponButtons.get(weaponType)?.selected.setVisible(true);

        this.currentWeapon = weaponType;

        this.updateCharacterVisibility();
    }

    createEnemy() {
        const enemy = createObjectUtils.createSpine(
            this,
            'enemy-0-ui',
            'enemy-0-ui-atlas',
            50,
            50,
            0.5,
            'default',
            'idle'
        );

        this.arrEnemies.push(enemy);
    }

    createCharacter() {
        const char1 = createObjectUtils.createSpine(this, 'player-10-gameplay', 'player-10-gameplay-atlas', 32, 75, 0.5, 'default', 'idle');
        const char2 = createObjectUtils.createSpine(this, 'player-11-gameplay', 'player-11-gameplay-atlas', 31, 73, 0.5, 'default', 'idle');
        const char3 = createObjectUtils.createSpine(this, 'player-13-gameplay', 'player-13-gameplay-atlas', 42, 75, 0.5, 'default', 'idle');

        this.arrCharacter.push(char1, char2, char3);
    }

    updateCharacterVisibility() {
        this.arrCharacter.forEach(c => {
            c.setVisible(false);
            c.active = false;
        });

        let index = 0;
        if (this.currentWeapon === 'sniper') index = 1;
        if (this.currentWeapon === 'rocket') index = 2;

        const char = this.arrCharacter[index];
        char.setVisible(true);
        char.active = true;
        
        char.animationState.setAnimation(0, 'idle', true);
    }

    createShootZone() {
        const cam = this.cameras.main;

        const zoneTop = 100 - 50;
        const zoneBottom = cam.height * 0.65 - 20;

        const zoneHeight = zoneBottom - zoneTop;
        const zoneCenterY = zoneTop + zoneHeight / 2;

        const shootZone = this.add.zone(cam.width / 2, zoneCenterY, cam.width, zoneHeight)
            .setOrigin(0.5)
            .setInteractive();

        shootZone.on("pointerdown", () => {
            let index = 0;
            if (this.currentWeapon === 'sniper') index = 1;
            if (this.currentWeapon === 'rocket') index = 2;

            const char = this.arrCharacter[index];

            char.animationState.setAnimation(0, 'shoot', false);
            char.animationState.addAnimation(0, 'idle', true, 0);
        });
    }
}
