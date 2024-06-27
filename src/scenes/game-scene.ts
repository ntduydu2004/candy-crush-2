import { CONST } from '../const/const'
import { Tile } from '../objects/tile'
import { TileGrid } from '../objects/tile-grid'

export class GameScene extends Phaser.Scene {
    // Grid with tiles
    private tileGrid: TileGrid
    private playingZone: Phaser.GameObjects.Zone
    private background: Phaser.GameObjects.Sprite
    private backgroundAlpha: Phaser.GameObjects.Rectangle
    constructor() {
        super({
            key: 'GameScene',
        })
    }

    public init(): void {
        this.background = this.add.sprite(0, 0, "background").setDepth(-2).setOrigin(0).setScale(0.9)
        this.backgroundAlpha = this.add.rectangle(0, 0, 1000, 1000, 0x000000).setDepth(-1.5).setAlpha(0.5).setOrigin(0)
        // this.cameras.main.setBackgroundColor(0x25595e)
        this.playingZone = this.add
            .zone(0, 0, CONST.gridWidth * CONST.tileWidth, CONST.gridHeight * CONST.tileHeight)
            .setDepth(1)
            .setInteractive()
        this.tileGrid = new TileGrid(this, CONST.gridHeight, CONST.gridWidth)
    }

    public update(time: number, delta: number): void {
        this.tileGrid.update(time, delta)
    }
}
