import { Scene } from 'phaser';
import {SkinsAndAnimationBoundsProvider, SpineGameObject}
    from "@esotericsoftware/spine-phaser-v3";

export default {
    createImageFactory: function (
        scene: Scene,
        x: number,
        y: number,
        key: string,
        scale: number = 1,
    ): Phaser.GameObjects.Image {

        return scene.add.image(x, y, key)
            .setScale(scale);
    },

    createBackground: function (
        scene: Scene, 
        key: string, 
        percentX: number = -1,
        percentY: number = -1,
        scale: number = 0.5
    ): Phaser.GameObjects.Image {
        const sceneWidth = scene.cameras.main.width;
        const sceneHeight = scene.cameras.main.height;

        let x: number = percentX == -1 ? sceneWidth / 2 : sceneWidth * percentX / 100;
        let y: number = percentY == -1 ? sceneHeight / 2 : sceneHeight * percentY / 100;
        
        return this.createImageFactory(scene, x, y, key, scale);
    },

    createSpine: function (
        scene: Scene,
        dataKey: string,
        atlasKey: string,
        percentX : number,
        percentY: number,
        scale: number = 1,
        defaultSkin: string = "default",
        defaultAnimation: string = "idle",
    ): SpineGameObject {
        let x = scene.cameras.main.width * percentX / 100;
        let y = scene.cameras.main.height * percentY / 100;

        const spine = scene.add.spine(x, y, dataKey, atlasKey,
            new SkinsAndAnimationBoundsProvider(null, [defaultSkin])
        );

        spine.skeleton.setSkinByName(defaultSkin);
        spine.animationState.setAnimation(0, defaultAnimation, true);
        spine.scale = scale;
        spine.setOrigin();

        return spine;
    },

    createImage: function (
        scene: Scene,
        percentX: integer,
        percentY: integer,
        key: string,
        scale: number = 1
    ): Phaser.GameObjects.Image {
        const btn: Phaser.GameObjects.Image = this.createImageFactory(
            scene,
            0,
            0,
            key,
            scale
        )

        const btnWidth: number = btn.width;

        let x = scene.cameras.main.width * percentX / 100;

        if (percentX == 0 || percentX == 100) {
            x = percentX == 0 ? x + btnWidth / 4 : x - btnWidth / 4;
        }

        btn.x = x;

        const btnHeight: number = btn.height;

        let y: number = scene.cameras.main.height * percentY / 100;

        if (percentY == 0 || percentY == 100) {
            y = percentY == 0 ? y + btnHeight / 4 : y - btnHeight / 4;
        }

        btn.y = y;

        return btn;
    },

    createButton: function (
        scene: Scene,
        percentX: integer,
        percentY: integer,
        key: string,
        scale: number = 1
    ): Phaser.GameObjects.Image {
        return this.createImage(scene, percentX, percentY, key, scale).setInteractive();
    },
}