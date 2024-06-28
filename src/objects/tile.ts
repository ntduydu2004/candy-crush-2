import { ImageConstructor } from '../interfaces/image.interface'

export class Tile extends Phaser.GameObjects.Sprite {
    private gridX: number
    private gridY: number
    private tileNum: number
    private greenFlame: Phaser.GameObjects.Particles.ParticleEmitter
    private blueFlame: Phaser.GameObjects.Particles.ParticleEmitter
    private redFlame: Phaser.GameObjects.Particles.ParticleEmitter
    constructor(params: ImageConstructor) {
        super(params.scene, params.x, params.y, params.texture, params.frame)
        this.tileNum = 1
        // set image settings
        this.setOrigin(0.5, 0.5)
        this.setInteractive()
        this.setDepth(1)
        this.setScale(0.4)
        this.scene.add.existing(this)
        this.greenFlame = this.scene.add
            .particles(0, 0, 'white', {
                color: [0xf5f52d, 0x009804, 0x009804, 0x009804],
                colorEase: 'quad.out',
                lifespan: 600,
                angle: { min: -100, max: -80 },
                scale: { start: 1, end: 0, ease: 'sine.out' },
                speed: 100,
                blendMode: 'SCREEN',
            })
            .startFollow(this)
            .stop()
            .setDepth(0)
        this.blueFlame = this.scene.add
            .particles(0, 0, 'white', {
                color: [0x816ad6, 0x2544ff],
                colorEase: 'quad.out',
                lifespan: 600,
                angle: { min: -100, max: -80 },
                scale: { start: 1, end: 0, ease: 'sine.out' },
                speed: 100,
                blendMode: 'SCREEN',
            })
            .startFollow(this)
            .stop()
            .setDepth(0)
        this.redFlame = this.scene.add
            .particles(0, 0, 'white', {
                color: [0xfe5500, 0xfe0f00],
                colorEase: 'quad.out',
                lifespan: 600,
                angle: { min: -100, max: -80 },
                scale: { start: 1, end: 0, ease: 'sine.out' },
                speed: 100,
                blendMode: 'SCREEN',
            })
            .startFollow(this)
            .stop()
            .setDepth(0)
    }
    public stopFlame() {
        this.greenFlame.stop()
        this.blueFlame.stop()
        this.redFlame.stop()
    }
    public setTileNumber(tileNum: number): void {
        this.tileNum = tileNum
        this.stopFlame()
        if (this.tileNum == 4) {
            this.greenFlame.start(20)
        } else if (this.tileNum == 5) {
            this.blueFlame.start(20)
        } else if (this.tileNum > 5) {
            this.redFlame.start(20)
        }
    }
    public addTileNumber(tileNum: number): void {
        this.tileNum += tileNum
        this.stopFlame()
        if (this.tileNum == 4) {
            this.greenFlame.start(20)
        } else if (this.tileNum == 5) {
            this.blueFlame.start(20)
        } else if (this.tileNum > 5) {
            this.redFlame.start(20)
        }
    }
    public getTileNumber(): number {
        return this.tileNum
    }
}
