import { ImageConstructor } from '../interfaces/image.interface'

export class Tile extends Phaser.GameObjects.Sprite {
    private gridX: number
    private gridY: number
    private tileNum: number
    private explodeEmitter: Phaser.GameObjects.Particles.ParticleEmitter
    constructor(params: ImageConstructor) {
        super(params.scene, params.x, params.y, params.texture, params.frame)
        this.tileNum = 1
        // set image settings
        this.setOrigin(0.5, 0.5)
        this.setInteractive()
        this.setDepth(0)
        this.scene.add.existing(this)
    }
    
    public setTileNumber(tileNum: number): void {
        this.tileNum = tileNum
    }
    public addTileNumber(tileNum: number): void {
        this.tileNum += tileNum
    }
    public getTileNumber(): number {
        return this.tileNum
    }
}
