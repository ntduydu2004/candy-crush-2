import { ImageConstructor } from '../interfaces/image.interface'

export class Tile extends Phaser.GameObjects.Sprite {
    private gridX: number
    private gridY: number
    private tileNum: number
    private greenFlame: Phaser.GameObjects.Particles.ParticleEmitter
    private blueFlame
    constructor(params: ImageConstructor) {
        super(params.scene, params.x, params.y, params.texture, params.frame)
        this.tileNum = 1
        // set image settings
        this.setOrigin(0.5, 0.5)
        this.setInteractive()
        this.setDepth(1)
        this.setScale(0.8)
        this.scene.add.existing(this)
        this.greenFlame = this.scene.add.particles(0, 0, 'white', {
            color: [ 0x009804 ],
            colorEase: 'quad.out',
            lifespan: 500,
            angle: { min: -100, max: -80 },
            scale: { start: 1, end: 0, ease: 'sine.out' },
            speed: 100,
            blendMode: 'SCREEN',
        }).startFollow(this).stop().setDepth(0)
        this.blueFlame = this.scene.add.particles(0, 0, 'white', {
            color: [ 0xff272c ],
            colorEase: 'quad.out',
            lifespan: 500,
            angle: { min: -100, max: -80 },
            scale: { start: 1, end: 0, ease: 'sine.out' },
            speed: 100,
            blendMode: 'SCREEN',
        }).startFollow(this).stop().setDepth(0)
    }
    public stopFlame() {
        this.greenFlame.stop()
        this.blueFlame.stop()
    }
    public setTileNumber(tileNum: number): void {
        this.tileNum = tileNum
        if (tileNum == 4) {
            this.stopFlame()
            this.greenFlame.start(20)
        }
        else if (tileNum >= 5) {
            this.stopFlame()
            this.blueFlame.start(20)
        }
        // else if (tileNum >= 6) {

        // }
    }
    public addTileNumber(tileNum: number): void {
        this.tileNum += tileNum
        if (this.tileNum == 4) {
            this.stopFlame()
            this.greenFlame.start(20)
        }
        else if (this.tileNum >= 5) {
            this.stopFlame()
            this.blueFlame.start(20)
        }
    }
    public getTileNumber(): number {
        return this.tileNum
    }

}
