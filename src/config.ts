import { BootScene } from './scenes/boot-scene'
import { GameScene } from './scenes/game-scene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Candy crush',
    url: 'https://github.com/digitsensitive/phaser3-typescript',
    version: '0.0.1',
    width: 520,
    height: 700,
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    parent: 'game',
    scene: [BootScene, GameScene],
    backgroundColor: '#000000',
    render: { pixelArt: false, antialias: true },
}
