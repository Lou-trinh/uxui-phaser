import { Scene } from 'phaser';

const preloadUtils = {
    preloadSpine: function (
        scene: Scene,
        BaseUrl: string,
        atlasKey: string,
        atlasUrl: string,
        dataKey: string,
        dataUrl: string
    ) {
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
    ) {
        const url = `assets/players/${PlayerUrl}/`;
        this.preloadSpine(scene, url, atlasKey, atlasUrl, dataKey, dataUrl);
    }
}

export default preloadUtils;