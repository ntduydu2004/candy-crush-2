import { Scene } from 'phaser'
import { TileGrid } from './tile-grid'
import { Tile } from './tile'
import { CONST } from '../const/const'
import { Path, PathType } from './path'

export class EffectManager {
    public activeTweens: number
    public selectionTween: Phaser.Tweens.Tween
    public idleTileTween: Phaser.Tweens.Tween[][]
    private tileHintsTween: Phaser.Tweens.Tween
    public explosions: Phaser.GameObjects.Particles.ParticleEmitter[][]
    private firstTileHint: Phaser.GameObjects.Rectangle
    private secondTileHint: Phaser.GameObjects.Rectangle
    private leftConfetti: Phaser.GameObjects.Particles.ParticleEmitter
    private rightConfetti: Phaser.GameObjects.Particles.ParticleEmitter
    private cross: Phaser.GameObjects.Sprite[][]
    private verticalCross: Phaser.GameObjects.Sprite[][]
    private path: Path
    private scene: Scene
    private row: number
    private column: number
    public constructor(
        scene: Scene,
        row: number,
        column: number,
        tileGrid: (Tile | undefined)[][]
    ) {
        this.activeTweens = 0
        this.scene = scene
        this.row = row
        this.column = column
        this.explosions = []
        this.idleTileTween = []
        for (let y = 0; y < row; y++) {
            this.explosions[y] = []
            for (let x = 0; x < column; x++) {
                this.explosions[y][x] = this.scene.add.particles(0, 0, 'white_flare', {
                    color: [0xffffb5, 0xffdfc6, 0xf8b6b1, 0xf889a0],
                    colorEase: 'sine.out',
                    speed: 100,
                    lifespan: 500,
                    quantity: 10,
                    scale: { start: 0.2, end: 0 },
                    emitting: false,
                    emitZone: {
                        type: 'edge',
                        source: new Phaser.Geom.Circle(tileGrid[y][x]!.x, tileGrid[y][x]!.y, 20),
                        quantity: 10,
                    },
                    duration: 200,
                })
            }
        }
        this.cross = []
        this.verticalCross = []
        for (let y = 0; y < row; y++) {
            this.cross[y] = []
            this.verticalCross[y] = []
            for (let x = 0; x < column; x++) {
                this.cross[y][x] = this.scene.add
                    .sprite(
                        x * CONST.tileWidth + CONST.tileWidth / 2,
                        y * CONST.tileHeight + CONST.tileHeight / 2,
                        'cross'
                    )
                    .setAlpha(0)
                    .setDepth(3)
                this.cross[y][x].displayHeight = CONST.tileHeight
                this.verticalCross[y][x] = this.scene.add
                    .sprite(
                        x * CONST.tileWidth + CONST.tileWidth / 2,
                        y * CONST.tileHeight + CONST.tileHeight / 2,
                        'cross_vertical'
                    )
                    .setAlpha(0)
                    .setDepth(3)
                this.verticalCross[y][x].displayWidth = CONST.tileWidth
            }
        }
        this.firstTileHint = this.scene.add
            .rectangle(0, 0, CONST.tileWidth, CONST.tileHeight, 0xf5f52d)
            .setAlpha(0)
            .setOrigin(0.5)
            .setDepth(-1)
        this.secondTileHint = this.scene.add
            .rectangle(0, 0, CONST.tileWidth, CONST.tileHeight, 0xf5f52d)
            .setAlpha(0)
            .setOrigin(0.5)
            .setDepth(-1)
        this.tileHintsTween = this.scene.add
            .tween({
                targets: [this.firstTileHint, this.secondTileHint],
                alpha: 1,
                angle: 360,
                scale: 0.7,
                yoyo: true,
                repeat: -1,
                duration: 1000,
                ease: 'back.out',
            })
            .pause()
        this.leftConfetti = this.scene.add
            .particles(-50, 600, 'confetti', {
                frame: [
                    '1.png',
                    '2.png',
                    '3.png',
                    '4.png',
                    '5.png',
                    '6.png',
                    '7.png',
                    '8.png',
                    '9.png',
                ],
                alpha: { min: 75, max: 100 },
                lifespan: 4000,
                rotate: {
                    onEmit: () => {
                        return Phaser.Math.RND.between(0, 180)
                    },
                    onUpdate: (particle, key, t, value) => {
                        return value + t * 3
                    },
                },
                angle: { min: -70, max: -35 },
                speed: {
                    onEmit: (particle) => {
                        let num = -particle!.angle * 2 - 600
                        return Phaser.Math.RND.between(num - 500, num + 200)
                    },
                },
                scale: { start: 0.2, end: 0 },
                accelerationX: {
                    onEmit: () => {
                        return -800
                    },
                    onUpdate: (particle, key, t, value) => {
                        if (particle.velocityX >= 100) {
                            return -800
                        }
                        return 0
                    },
                },
                accelerationY: {
                    onEmit: () => {
                        return 800
                    },
                    onUpdate: (particle, key, t, value) => {
                        if (particle.velocityY <= -100) {
                            return 800
                        }
                        return 0
                    },
                },
                quantity: 1,
                gravityY: 400,
                // emitting: false,
                duration: 2000,
            })
            .setDepth(5)
            .stop()
        this.rightConfetti = this.scene.add
            .particles(570, 600, 'confetti', {
                frame: [
                    '1.png',
                    '2.png',
                    '3.png',
                    '4.png',
                    '5.png',
                    '6.png',
                    '7.png',
                    '8.png',
                    '9.png',
                ],
                alpha: { min: 75, max: 100 },
                lifespan: 4000,
                rotate: {
                    onEmit: () => {
                        return Phaser.Math.RND.between(0, 180)
                    },
                    onUpdate: (particle, key, t, value) => {
                        return value + t * 3
                    },
                },
                angle: { min: -145, max: -110 },
                speed: {
                    onEmit: (particle) => {
                        let num = particle!.angle * 2 + 800
                        return Phaser.Math.RND.between(num - 200, num + 500)
                    },
                },
                scale: { start: 0.2, end: 0 },
                accelerationX: {
                    onEmit: () => {
                        return 800
                    },
                    onUpdate: (particle, key, t, value) => {
                        if (particle.velocityX <= 100) {
                            return 800
                        }
                        return 0
                    },
                },
                accelerationY: {
                    onEmit: () => {
                        return 800
                    },
                    onUpdate: (particle, key, t, value) => {
                        if (particle.velocityY <= -100) {
                            return 800
                        }
                        return 0
                    },
                },
                quantity: 1,
                gravityY: 400,
                // emitting: false,
                duration: 2000,
            })
            .stop()
            .setDepth(5)
        this.path = new Path()
    }
    public setPath(pathType: PathType) {
        this.path.setPath(pathType)
    }
    public setPositionsOnPath(tiles: Tile[]) {
        let depth = 1
        let points = this.path.getPoints(tiles)
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].setDepth(depth + i * 0.001)
            this.activeTweens++
            this.scene.add.tween({
                targets: tiles[i],
                x: points[i].x,
                y: points[i].y,
                ease: 'quad.out',
                duration: 500,
                onComplete: () => {
                    this.activeTweens--
                },
            })
        }
    }
    public update(tiles: Tile[], time: number, delta: number) {
        if (this.activeTweens == 0) {
            this.path.update(tiles, time, delta)
        }
    }
    public startSelectionTween(selectedTile: Tile) {
        if (this.selectionTween && !this.selectionTween.isDestroyed()) {
            this.selectionTween.destroy()
        }
        this.selectionTween = this.scene.add.tween({
            targets: selectedTile,
            duration: 2000,
            repeat: -1,
            angle: 360,
            ease: 'sine.out',
        })
    }
    public removeSelectionTween(selectedTile: Tile) {
        if (this.selectionTween.isPlaying()) {
            this.selectionTween.destroy()
        }
        this.scene.add.tween({
            targets: selectedTile,
            duration: 100,
            ease: 'linear',
            yoyo: false,
            angle: 0,
        })
    }
    public startConfettiEffect() {
        this.leftConfetti.start()
        this.rightConfetti.start()
    }
    public startCrossLineEffect(x: number, y: number) {
        this.cross[y][x].setAlpha(1).scaleX = 1
        this.verticalCross[y][x].setAlpha(1).scaleY = 1
        this.scene.add.tween({
            targets: this.cross[y][x],
            scaleX: 2.5,
            alpha: 0,
            duration: 500,
        })
        this.scene.add.tween({
            targets: this.verticalCross[y][x],
            scaleY: 2.5,
            alpha: 0,
            duration: 500,
        })
    }
    public explode(x: number, y: number) {
        this.explosions[y][x].start()
    }
    public shake() {
        this.scene.cameras.main.shake(200, 0.03)
    }
    public renderHint(firstX: number, firstY: number, secondX: number, secondY: number) {
        this.firstTileHint.setPosition(firstX, firstY)
        this.secondTileHint.setPosition(secondX, secondY)
        this.tileHintsTween.restart()
    }
    public removeHint() {
        if (this.tileHintsTween.isPlaying()) {
            this.tileHintsTween.pause()
        }

        this.firstTileHint.setAlpha(0)
        this.secondTileHint.setAlpha(0)
    }
    public startIdleTileTween(tileGrid: (Tile | undefined)[][]) {
        this.idleTileTween = []
        for (let y = 0; y < this.row; y++) {
            this.idleTileTween[y] = []
            for (let x = 0; x < this.column; x++) {
                this.idleTileTween[y].push(
                    this.scene.add.tween({
                        targets: tileGrid[y][x],
                        delay: (x + y) * 50,
                        duration: 300,
                        scale: 0.2,
                        repeat: -1,
                        repeatDelay: 5000,
                        yoyo: true,
                    })
                )
            }
        }
    }
    public removeIdleTileTween(tileGrid: (Tile | undefined)[][]) {
        if (this.idleTileTween.length === 0) return
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.column; x++) {
                if (!this.idleTileTween[y][x].isDestroyed()) {
                    this.idleTileTween[y][x].destroy()
                    this.scene.add.tween({
                        targets: tileGrid[y][x],
                        scale: 0.4,
                        duration: 100,
                        yoyo: false,
                        ease: 'linear',
                    })
                }
            }
        }
    }
}
