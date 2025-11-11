import { Scene } from 'phaser';
import { SkinsAndAnimationBoundsProvider } 
    from "@esotericsoftware/spine-phaser-v3";

const gameUtils = {
    createGameObject: function (
        scene: Scene,
        x: number, 
        y: number, 
        key: string, 
        scale: number = 1, 
        type: string = 'image'
    ) {
        let object;
        
        if (type === 'image') {
            object = scene.add.image(x, y, key);
        } else {
            object = scene.add.image(x, y, key);
        }
        
        object.setScale(scale);
        
        return object;
    },

    createBackground: function (scene: Scene, key: string) {
        const sceneWidth = scene.cameras.main.width;
        const sceneHeight = scene.cameras.main.height;

        return  this.createGameObject(scene, sceneWidth / 2, sceneHeight / 2, key, 0.5);
    },

    createSpine: function (
        scene: Scene, 
        dataKey: string, 
        atlasKey: string, 
        x: integer, 
        y: integer, 
        scale: integer = 1,
        defaultSkin: string = "default",
        defaultAnimation: string = "idle",
    ) {
        const spine = scene.add.spine(x, y, dataKey, atlasKey,
            new SkinsAndAnimationBoundsProvider(null, [defaultSkin])
        );
        spine.skeleton.setSkinByName(defaultAnimation);
        spine.animationState.setAnimation(0, 'idle', true);
        spine.scale = scale;
    },

    createButton: function (
        scene: Scene,
        percentX: integer,
        percentY: integer,
        key: string,
        scale: number = 1
    ) {

        const btn = this.createGameObject(
            scene,
            0,
            0,
            key,
            scale
        ).setInteractive();
        
        const btnWidth = btn.width;
        
        let x = scene.cameras.main.width * percentX / 100;

        if (percentX == 0 || percentX == 100) {
            x = percentX == 0 ? x + btnWidth / 4 : x - btnWidth / 4;
        }
        
        btn.x = x;

        const btnHeight = btn.height;
        
        let y = scene.cameras.main.height * percentY / 100;

        if (percentX == 0 || percentX == 100) {
            y = percentY == 0 ? y + btnHeight / 4 : y - btnHeight / 4;
        }
        
        btn.y = y;
        
        return btn;
    }
}

export default gameUtils;