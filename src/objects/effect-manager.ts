import { Scene } from "phaser"
import { TileGrid } from "./tile-grid"
import { Tile } from "./tile"
import { CONST } from "../const/const"

export class EffectManager {
    public activeTweens: number
    public selectionTween: Phaser.Tweens.Tween
    public idleTileTween: Phaser.Tweens.Tween[][]
    private tileHintsTween: Phaser.Tweens.Tween
    public explosions: Phaser.GameObjects.Particles.ParticleEmitter[][]
    private firstTileHint: Phaser.GameObjects.Rectangle
    private secondTileHint: Phaser.GameObjects.Rectangle
    private scene: Scene
    private row: number
    private column: number
    public constructor (scene: Scene, row: number, column: number, tileGrid: (Tile | undefined)[][]) {
        this.activeTweens = 0
        this.scene = scene
        this.row = row
        this.column = column
        this.explosions = []
        this.idleTileTween = []
        for (let y = 0; y < row; y ++) {
            this.explosions[y] = []
            for (let x = 0; x < column; x ++) {
                this.explosions[y][x] = this.scene.add.particles(0, 0, "white_flare", {
                    color: [0xffffb5, 0xffdfc6, 0xf8b6b1, 0xf889a0],
                    colorEase: 'sine.out',
                    speed: 100,
                    lifespan: 500,
                    quantity: 10,
                    scale: { start: 0.2, end: 0 },
                    emitting: false,
                    emitZone: { type: 'edge', source: new Phaser.Geom.Circle(tileGrid[y][x]!.x, tileGrid[y][x]!.y, 20), quantity: 10 },
                    duration: 200
                })
            }
        }
        this.firstTileHint = this.scene.add.rectangle(0, 0, CONST.tileWidth, CONST.tileHeight, 0xffffff).setAlpha(0).setOrigin(0.5).setDepth(-1)
        this.secondTileHint = this.scene.add.rectangle(0, 0, CONST.tileWidth, CONST.tileHeight, 0x000000).setAlpha(0).setOrigin(0.5).setDepth(-1)
        this.tileHintsTween = this.scene.add.tween({
            targets: [this.firstTileHint, this.secondTileHint],
            alpha: 1,
            angle: 360,
            scale: 1.2,
            yoyo: true,
            repeat: -1,
            duration: 1000,
            ease: 'back.out'
        }).pause()
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
            angle: 0
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
    public removeHint(){
        if (this.tileHintsTween.isPlaying()) {
            this.tileHintsTween.pause()
        }
        
        this.firstTileHint.setAlpha(0)
        this.secondTileHint.setAlpha(0)
    }
    public startIdleTileTween(tileGrid: (Tile | undefined)[][]) {
        this.idleTileTween = []
        for (let y = 0; y < this.row; y ++) {
            this.idleTileTween[y] = []
            for (let x = 0; x < this.column; x ++){
                this.idleTileTween[y].push(this.scene.add.tween({
                    targets: tileGrid[y][x],
                    delay: (x + y) * 50,
                    duration: 300,
                    scale: 0.4,
                    repeat: -1,
                    repeatDelay: 5000,
                    yoyo: true
                }))
            }
        }
    }
    public removeIdleTileTween(tileGrid: (Tile | undefined)[][]) {
        if (this.idleTileTween.length === 0) return
        for (let y = 0; y < this.row; y ++) {
            for (let x = 0; x < this.column; x ++) {
                if (!this.idleTileTween[y][x].isDestroyed()) {
                    this.idleTileTween[y][x].destroy()
                    this.scene.add.tween({
                        targets: tileGrid[y][x],
                        scale: 0.8,
                        duration: 100,
                        yoyo: false,
                        ease: 'linear'
                    })
                }
            }
        }
    }

}