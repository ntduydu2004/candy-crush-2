import { CONST } from '../const/const'
import { SoundManager } from '../helper/sound-manager'
import { Tile } from '../objects/tile'
import { TileGrid } from '../objects/tile-grid'

export class GameScene extends Phaser.Scene {
    // Grid with tiles
    private tileGrid: TileGrid
    private playingZone: Phaser.GameObjects.Zone
    private background: Phaser.GameObjects.Sprite
    private backgroundAlpha: Phaser.GameObjects.Rectangle
    private soundManger: SoundManager
    constructor() {
        super({
            key: 'GameScene',
        })
    }

    public init(): void {
        this.soundManger = SoundManager.getInstance()
        this.soundManger.init(this)
        this.background = this.add.sprite(-200, -200, 'bg').setDepth(-2).setOrigin(0)
        this.backgroundAlpha = this.add
            .rectangle(-200, -200, 1000, 1000, 0x000000)
            .setDepth(-1.5)
            .setAlpha(0.5)
            .setOrigin(0)
        this.cameras.main.setBackgroundColor(0x25595e)
        this.playingZone = this.add
            .zone(0, 0, CONST.gridWidth * CONST.tileWidth, CONST.gridHeight * CONST.tileHeight)
            .setDepth(1)
            .setInteractive()
        this.tileGrid = new TileGrid(this, CONST.gridHeight, CONST.gridWidth)
    }

    public create(): void {
        this.soundManger.playBackgroundMusic()
    }

    public update(time: number, delta: number): void {
        this.tileGrid.update(time, delta)
    }
}
