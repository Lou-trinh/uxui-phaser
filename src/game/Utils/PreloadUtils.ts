import { Scene } from 'phaser';

export default {
    preloadSpine: function (
        scene: Scene,
        BaseUrl: string,
        atlasKey: string,
        atlasUrl: string,
        dataKey: string,
        dataUrl: string
    ): void {
        scene.load.setPath(BaseUrl);
        scene.load.spineAtlas(atlasKey, atlasUrl);
        scene.load.spineJson(dataKey, dataUrl);
        scene.load.setPath('assets');
    },

    preloadPlayer: function (
        scene: Scene,
        PlayerUrl: string,
        atlasKey: string,
        atlasUrl: string,
        dataKey: string,
        dataUrl: string
    ): void {
        const url: string = `assets/players/${PlayerUrl}/`;
        this.preloadSpine(scene, url, atlasKey, atlasUrl, dataKey, dataUrl);
    },

    preloadEnemy: function (
        scene: Scene,
        EnemyUrl: string,
        atlasKey: string,
        atlasUrl: string,
        dataKey: string,
        dataUrl: string
    ): void {
        const url: string = `assets/enemys/${EnemyUrl}/`;
        this.preloadSpine(scene, url, atlasKey, atlasUrl, dataKey, dataUrl);
    }
}