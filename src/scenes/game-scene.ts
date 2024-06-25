import { CONST } from '../const/const'
import { Tile } from '../objects/tile'
import { TileGrid } from '../objects/tile-grid'

export class GameScene extends Phaser.Scene {
    // Grid with tiles
    private tileGrid: TileGrid
    private playingZone: Phaser.GameObjects.Zone

    constructor() {
        super({
            key: 'GameScene',
        })
    }

    public init(): void {
        this.playingZone = this.add.zone(0, 0, CONST.gridWidth * CONST.tileWidth, CONST.gridHeight * CONST.tileHeight).setDepth(1).setInteractive()
        this.tileGrid = new TileGrid(this, CONST.gridHeight, CONST.gridWidth)
    }
}
