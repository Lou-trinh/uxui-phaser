import { Scene } from "phaser";
import createObjectUtils from "../../Utils/CreateObjectUtils.ts";
import { SpineGameObject } from "@esotericsoftware/spine-phaser-v3";

interface EnemyData {
    spine: SpineGameObject;
    healthBar: Phaser.GameObjects.Graphics | null;
    healthBarBg: Phaser.GameObjects.Graphics | null;
    maxHealth: number;
    currentHealth: number;
    x: number;
    y: number;
    isAttacking: boolean;
}

export class Earth1 extends Scene {
    weaponButtons = new Map<string, { normal: Phaser.GameObjects.Image, selected: Phaser.GameObjects.Image }>();
    arrCharacter: SpineGameObject[] = [];
    enemies: EnemyData[] = [];
    currentWeapon = 'gunner';
    crosshair: Phaser.GameObjects.Image | null = null;
    gameEnded = false;
    backButton: Phaser.GameObjects.Image | null = null;
    globalWarningIcon: Phaser.GameObjects.Image | null = null;
    groupAttackTimer: Phaser.Time.TimerEvent | null = null;

    timer = { remaining: 60, text: null as Phaser.GameObjects.Text | null, event: null as Phaser.Time.TimerEvent | null };

    readonly WEAPON_DAMAGE = { gunner: 10, sniper: 25, rocket: 40 };
    readonly ENEMY_HITBOX = { width: 150, height: 330 };
    readonly WEAPON_INDEX = { gunner: 0, sniper: 1, rocket: 2 };

    constructor() { super('Earth1'); }

    init() {
        this.arrCharacter = [];
        this.enemies = [];
        this.currentWeapon = 'gunner';
        this.crosshair = null;
        this.gameEnded = false;
        this.backButton = null;
        this.globalWarningIcon = null;
        this.groupAttackTimer = null;
        this.timer = { remaining: 60, text: null, event: null };
    }

    create() {
        this.createBackground();
        this.createBackButton();
        this.createEnemiesWithDrop();
        this.createWall();
        this.createStageName();
        this.createCharacter();
        this.createWeaponButtons();
        this.createShootZone();
        this.createTimer();
        this.updateCharacterVisibility();
    }

    shutdown() {
        this.cleanup();
    }

    cleanup() {
        this.arrCharacter.forEach(s => s.destroy());
        this.enemies.forEach(e => {
            e.spine.destroy();
            e.healthBar?.destroy();
            e.healthBarBg?.destroy();
        });
        this.crosshair?.destroy();
        this.globalWarningIcon?.destroy();
        this.timer.text?.destroy();
        this.crosshair = this.timer.text = this.globalWarningIcon = null;
        this.stopTimers();
    }

    stopTimers() {
        this.groupAttackTimer?.remove();
        this.groupAttackTimer = null;
        this.timer.event?.remove();
        this.timer.event = null;
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
            color: '#ffffff' })
            .setOrigin(0, 0.5);
    }

    createWall() { createObjectUtils.createImage(this, 23, 75, 'wall-map-1', 0.5); }

    createWeaponButtons() {
        [
            { name: 'gunner', x: 63, y: 93, default: true },
            { name: 'sniper', x: 72, y: 83, default: false },
            { name: 'rocket', x: 90, y: 78, default: false }
        ].forEach(w => {
            const normal = createObjectUtils.createButton(this, w.x, w.y, `selector-btn-${w.name}`, 0.5);
            const selected = createObjectUtils.createButton(this, w.x, w.y, `selector-btn-${w.name}-selected`, 0.5);
            selected.setVisible(w.default);
            this.weaponButtons.set(w.name, { normal, selected });
            [normal, selected].forEach(btn => btn.on("pointerdown", () => this.selectWeapon(w.name)));
        });
        [92, 64].forEach(y => createObjectUtils.createButton(this, 88, y, 'selector_item_btn', 0.5));
    }

    selectWeapon(weaponType: string) {
        this.weaponButtons.forEach(btn => btn.selected.setVisible(false));
        this.weaponButtons.get(weaponType)?.selected.setVisible(true);
        this.currentWeapon = weaponType;
        this.updateCharacterVisibility();
    }

    createEnemiesWithDrop() {
        const enemyConfigs = [
            { x: 25, y: 50, delay: 0,    key: 'enemy-0-ui', atlas: 'enemy-0-ui-atlas', maxHealth: 100 },
            { x: 75, y: 50, delay: 200,  key: 'enemy-0-ui', atlas: 'enemy-0-ui-atlas', maxHealth: 100 },
            { x: 50, y: 50, delay: 100,  key: 'enemy-1-ui', atlas: 'enemy-1-ui-atlas', maxHealth: 400 }
        ];

        enemyConfigs.forEach((config) => {
            const finalY = (this.cameras.main.height * config.y) / 100;
            const finalX = (this.cameras.main.width * config.x) / 100;

            const spine = createObjectUtils.createSpine(
                this,
                config.key,
                config.atlas,
                config.x,
                (-200 / this.cameras.main.height) * 100,
                0.5,
                'default',
                'idle'
            );

            const enemyData: EnemyData = {
                spine,
                healthBar: null,
                healthBarBg: null,
                maxHealth: config.maxHealth,   
                currentHealth: config.maxHealth,
                x: finalX,
                y: finalY,
                isAttacking: false
            };

            this.enemies.push(enemyData);

            this.time.delayedCall(config.delay, () => {
                this.tweens.add({
                    targets: spine,
                    y: finalY,
                    duration: 1000,
                    ease: 'Bounce.easeOut',
                    onComplete: () => {
                        this.createEnemyHealthBar(enemyData);
                    }
                });
            });
        });

        this.time.delayedCall(1500, () => {
            this.startGroupAttackTimer();
        });
    }



    createCharacter() {
        [
            { key: 'player-10-gameplay', x: 32, y: 75 },
            { key: 'player-11-gameplay', x: 31, y: 73 },
            { key: 'player-13-gameplay', x: 42, y: 75 }
        ].forEach(c => this.arrCharacter
            .push(createObjectUtils.createSpine(
                this,
                c.key,
                `${c.key}-atlas`,
                c.x,
                c.y,
                0.5,
                'default',
                'idle')
            ));
    }

    updateCharacterVisibility() {
        const activeIndex = this.WEAPON_INDEX[this.currentWeapon as keyof typeof this.WEAPON_INDEX];
        this.arrCharacter.forEach((char, i) => {
            const isActive = i === activeIndex;
            char.setVisible(isActive);
            char.active = isActive;
            if (isActive) char.animationState.setAnimation(0, 'idle', true);
        });
    }

    createEnemyHealthBar(enemy: EnemyData) {
        const [w, h, x, y] = [80, 8, enemy.x, enemy.y - 180];
        enemy.healthBarBg = this.add.graphics();
        enemy.healthBarBg
            .fillStyle(0x000000, 0.5)
            .fillRect(x - w/2 - 1, y - 1, w + 2, h + 2)
            .fillStyle(0x8B0000, 1)
            .fillRect(x - w/2, y, w, h);
        enemy.healthBar = this.add.graphics();
        this.updateEnemyHealthBar(enemy);
    }

    updateEnemyHealthBar(enemy: EnemyData) {
        if (!enemy.healthBar) return;
        const [w, h, x, y] = [80, 8, enemy.x, enemy.y - 180];
        const healthPercent = enemy.currentHealth / enemy.maxHealth;
        const color = healthPercent <= 0.3 ? 0xff0000 : healthPercent <= 0.6 ? 0xffa500 : 0x00ff00;
        enemy.healthBar.clear()
            .fillStyle(color, 1)
            .fillRect(x - w/2, y, w * healthPercent, h);
    }

    showCrosshair(x: number, y: number) {
        this.crosshair?.destroy();
        this.crosshair = this.add.image(x, y, `player-crosshair-${this.currentWeapon}`)
            .setOrigin(0.5)
            .setScale(0.3);
        this.tweens.add({ targets: this.crosshair, alpha: 0, scale: 0.35, duration: 500, ease: 'Power2',
            onComplete: () => {
                this.crosshair?.destroy();
                this.crosshair = null;
            }
        });
    }

    checkHitEnemy(x: number, y: number): EnemyData | null {
        const { width: w, height: h } = this.ENEMY_HITBOX;
        for (const enemy of this.enemies) {
            if (enemy.currentHealth > 0 && x >= enemy.x - w/2 && x <= enemy.x + w/2 && y >= enemy.y - h/2 && y <= enemy.y + h/2) {
                return enemy;
            }
        }
        return null;
    }

    damageEnemy(enemy: EnemyData, damage: number) {
        enemy.currentHealth = Math.max(0, enemy.currentHealth - damage);
        this.updateEnemyHealthBar(enemy);
        enemy.currentHealth <= 0 ? this.handleEnemyDeath(enemy) : this.handleEnemyHit(enemy);
    }

    handleEnemyDeath(enemy: EnemyData) {
        enemy.spine.animationState.setAnimation(0, 'die', false);
        enemy.healthBar?.setVisible(false);
        enemy.healthBarBg?.setVisible(false);

        const listener = {
            complete: (entry: any) => {
                if (entry?.animation?.name === 'die') {
                    this.fadeOutEnemy(enemy);
                    enemy.spine.animationState.removeListener(listener);
                }
            }
        };
        enemy.spine.animationState.addListener(listener);

        // Kiểm tra sau khi animation fade out hoàn thành
        this.time.delayedCall(1500, () => this.checkAllEnemiesDead());
    }

    fadeOutEnemy(enemy: EnemyData) {
        this.tweens.add({
            targets: enemy.spine,
            alpha: 0,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                if (enemy.spine?.scene) {
                    enemy.spine.destroy();
                    enemy.healthBar?.destroy();
                    enemy.healthBarBg?.destroy();
                }
            }
        });
    }

    handleEnemyHit(enemy: EnemyData) {
        enemy.spine.animationState.setAnimation(0, 'get_hit', false);
        enemy.spine.animationState.addAnimation(0, 'idle', true, 0);
    }

    checkAllEnemiesDead() {
        if (this.gameEnded) return;
        const allDead = this.enemies.every(e => e.currentHealth <= 0);
        console.log('Check all enemies dead:', allDead, 'Game ended:', this.gameEnded);
        if (allDead) {
            this.showGameComplete();
        }
    }

    createShootZone() {
        const cam = this.cameras.main;
        const [top, bottom] = [50, cam.height * 0.65 - 20];
        const zone = this.add.zone(cam.width/2, top + (bottom - top)/2, cam.width, bottom - top)
            .setOrigin(0.5)
            .setInteractive();
        zone.on("pointerdown", (p: Phaser.Input.Pointer) => this.handleShoot(p));
    }

    handleShoot(pointer: Phaser.Input.Pointer) {
        // Không cho phép bắn nếu game đã kết thúc
        if (this.gameEnded) return;

        const allEnemiesDead = this.enemies.every(e => e.currentHealth <= 0);
        if (allEnemiesDead) return;

        const anyEnemyAttacking = this.enemies.some(e => e.isAttacking && e.currentHealth > 0);
        if (anyEnemyAttacking) {
            this.handlePlayerDefeat();
            return;
        }

        const hitEnemy = this.checkHitEnemy(pointer.x, pointer.y);

        const char = this.arrCharacter[this.WEAPON_INDEX[this.currentWeapon as keyof typeof this.WEAPON_INDEX]];
        char.animationState.setAnimation(0, 'shoot', false);
        char.animationState.addAnimation(0, 'idle', true, 0);
        this.showCrosshair(pointer.x, pointer.y);

        if (hitEnemy) {
            this.damageEnemy(hitEnemy, this.WEAPON_DAMAGE[this.currentWeapon as keyof typeof this.WEAPON_DAMAGE]);
        }
    }

    startGroupAttackTimer() {
        const randomDelay = 6000 + Math.random() * 4000;
        this.groupAttackTimer = this.time.addEvent({
            delay: randomDelay,
            callback: () => {
                const aliveEnemies = this.enemies.filter(e => e.currentHealth > 0);
                if (aliveEnemies.length === 0) return;

                // Hiển thị cảnh báo chung ở giữa màn hình
                this.showGlobalAttackWarning();

                // Sau 2 giây, tất cả enemies còn sống sẽ cùng tấn công
                this.time.delayedCall(2000, () => {
                    aliveEnemies.forEach(enemy => {
                        if (enemy.currentHealth > 0) {
                            this.enemyAttack(enemy);
                        }
                    });
                });
            },
            callbackScope: this,
            loop: true
        });
    }

    showGlobalAttackWarning() {
        // Xóa warning cũ nếu có
        this.globalWarningIcon?.destroy();

        const cam = this.cameras.main;
        this.globalWarningIcon = this.add.image(cam.width / 2, 200, 'enemy-attack-warning')
            .setOrigin(0.5)
            .setScale(0.6);

        this.tweens.add({
            targets: this.globalWarningIcon,
            alpha: { from: 1, to: 0.3 },
            duration: 200,
            yoyo: true,
            repeat: 4,
            ease: 'Linear',
            onComplete: () => {
                this.globalWarningIcon?.destroy();
                this.globalWarningIcon = null;
            }
        });
    }

    enemyAttack(enemy: EnemyData) {
        if (enemy.currentHealth <= 0) return;
        enemy.isAttacking = true;
        enemy.spine.animationState.setAnimation(0, 'attack', true);
        this.time.delayedCall(4000, () => {
            enemy.isAttacking = false;

            if (enemy.spine?.scene && enemy.currentHealth > 0) {
                enemy.spine.animationState.setAnimation(0, 'idle', true);
            }
        });
    }

    handlePlayerDefeat() {
        this.showGameOver();
    }

    createTimer() {
        this.timer.text = this.add.text(this.cameras.main.width - 20, 20,
            this.formatTime(this.timer.remaining),
            {
                fontFamily: 'Russo One',
                fontSize: '32px',
                fontStyle: 'bold',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            })
            .setOrigin(1, 0);
        this.timer.event = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true }
        );
    }

    formatTime(s: number): string {
        return `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
    }

    updateTimer() {
        this.timer.remaining--;
        if (this.timer.text) {
            this.timer.text.setText(this.formatTime(this.timer.remaining));
            if (this.timer.remaining <= 10) this.timer.text.setColor('#ff0000');
            else if (this.timer.remaining <= 30) this.timer.text.setColor('#ffa500');
        }
        if (this.timer.remaining <= 0) this.handleTimeUp();
    }

    showGameOver() {
        if (this.gameEnded) return;
        this.gameEnded = true;
        this.showEndGameScreen('game-over-text', 'game-over-btn-playagain', () => this.scene.restart());
    }

    showGameComplete() {
        console.log('showGameComplete called, gameEnded:', this.gameEnded);
        if (this.gameEnded) return;
        this.gameEnded = true;
        this.showEndGameScreen('game-complete-text', 'game-over-btn-next', () => {
            this.scene.stop('Earth1');
            this.scene.start('Campaign');
        });
    }

    showEndGameScreen(textImg: string, actionImg: string, actionCb: () => void) {
        this.stopTimers();
        this.disableAllButtons();

        const cam = this.cameras.main;
        this.add.rectangle(cam.width/2, cam.height/2, cam.width, cam.height, 0x000000, 0.7)
            .setDepth(1000);
        this.add.image(cam.width/2, cam.height/2 - 80, textImg)
            .setOrigin(0.5)
            .setScale(0.8)
            .setDepth(1001);
        const actionBtn = this.add.image(cam.width/2, cam.height/2 + 60, actionImg)
            .setOrigin(0.5)
            .setScale(0.5)
            .setDepth(1001)
            .setInteractive({
                useHandCursor: true
            });
        actionBtn.on('pointerdown', actionCb);
        const exitBtn = this.add.image(cam.width/2, cam.height/2 + 120, 'game-over-btn-exit')
            .setOrigin(0.5)
            .setScale(0.5)
            .setDepth(1001)
            .setInteractive({
                useHandCursor: true
            });
        exitBtn.on('pointerdown', () => {
            this.scene.stop('Earth1');
            this.scene.start('Campaign');
        });
    }

    handleTimeUp() {
        if (this.gameEnded) return;
        this.stopTimers();
        const anyEnemyAlive = this.enemies.some(e => e.currentHealth > 0);
        anyEnemyAlive ? this.showGameOver() : this.showGameComplete();
    }

    disableAllButtons() {
        if (this.backButton) {
            this.backButton.disableInteractive();
        }

        this.weaponButtons.forEach(btn => {
            btn.normal.disableInteractive();
            btn.selected.disableInteractive();
        });
    }
}