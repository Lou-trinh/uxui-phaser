import {Scene} from "phaser";
import createObjectUtils from "../../Utils/CreateObjectUtils.ts";

export class Campaign extends Scene {
    private scrollContainer!: Phaser.GameObjects.Container;
    private isDragging: boolean = false;
    private dragStartY: number = 0;
    private scrollY: number = 0;
    private maxScrollY: number = 0;

    constructor() {
        super('Campaign');
    }

    create() {
        this.createBackground();
        this.createBackButton();
        this.createScrollableContent();
        this.setupScrolling();
    }

    createBackButton() {
        const shopBtn = createObjectUtils.createButton(this, 7, 15, 'back-btn', 0.5);
        shopBtn.on('pointerdown', () => this.scene.start('Battle'));
    }

    createBackground() {
        createObjectUtils.createBackground(this, 'home-campaign-bg');
    }

    createScrollableContent() {
        this.scrollContainer = this.add.container(0, 0);

        const planetImages = ['earth', 'space', 'mars', 'back-to-earth', 'x-corp'];

        const planetPositions = [
            [13, -3, 0.48],   // Earth
            [13, -5, 0.48],   // Space
            [13, -5, 0.48],   // Mars
            [22, -5, 0.45],   // Back to Earth
            [15, -5, 0.48]    // X-Corp
        ];

        // Scene names for each fight button
        const sceneNames = ['Earth1', 'Space1', 'Mars1', 'BackToEarth1', 'XCorp1'];

        for (let i = 0; i < 5; i++) {
            const y = i * 18 + 26;
            const actBg = createObjectUtils.createBackground(this, `act-bg-${i + 1}`, 50, y);
            const fightBtn = createObjectUtils.createButton(this, 84, y + 5, 'fight-button', 0.5);

            // Add click event for each fight button
            fightBtn.on('pointerdown', () => {
                console.log(`Starting ${sceneNames[i]}`);
                this.scene.start(sceneNames[i]);
            });

            const [offsetX, offsetY, scale] = planetPositions[i];
            const planetImg = createObjectUtils.createImage(this, offsetX, y + offsetY, planetImages[i], scale);

            this.scrollContainer.add([actBg, planetImg, fightBtn]);
        }

        const camera = this.cameras.main;

        const containerHeight = 5 * camera.height * 0.18;
        const visibleHeight = camera.height * 0.75;
        this.maxScrollY = Math.max(0, containerHeight - visibleHeight);

        // Setup mask
        const mask = this.make.graphics()
            .fillStyle(0xffffff)
            .fillRect(0, camera.height * 0.2, camera.width, camera.height * 0.8)
            .createGeometryMask();
        this.scrollContainer.setMask(mask);
    }

    setupScrolling() {
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.isDragging = false;
            this.dragStartY = pointer.y;
        });

        this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (pointer.isDown) {
                const deltaY = pointer.y - this.dragStartY;
                if (Math.abs(deltaY) > 5) this.isDragging = true;

                if (this.isDragging) {
                    this.scrollY = Phaser.Math.Clamp(this.scrollY - deltaY, 0, this.maxScrollY);
                    this.scrollContainer.y = -this.scrollY;
                    this.dragStartY = pointer.y;
                }
            }
        });

        this.input.on('pointerup', () => setTimeout(() => this.isDragging = false, 100));

        this.input.on('wheel', (_p: Phaser.Input.Pointer, _g: any[], _dx: number, dy: number) => {
            this.scrollY = Phaser.Math.Clamp(this.scrollY + dy * 0.5, 0, this.maxScrollY);
            this.scrollContainer.y = -this.scrollY;
        });
    }
}