import { Scene } from "phaser"
import { TileGrid } from "./tile-grid"
import { Tile } from "./tile"

export class EffectManager {
    public activeTweens: number
    public selectionTween: Phaser.Tweens.Tween
    public idleTween: Phaser.Tweens.Tween[]
    public explosions: Phaser.GameObjects.Particles.ParticleEmitter[][]
    private scene: Scene
    private row: number
    private column: number
    public constructor (scene: Scene, row: number, column: number, tileGrid: (Tile | undefined)[][]) {
        this.activeTweens = 0
        this.scene = scene
        this.row = row
        this.column = column
        this.explosions = []
        for (let y = 0; y < row; y ++) {
            this.explosions[y] = []
            for (let x = 0; x < column; x ++) {
                this.explosions[y][x] = this.scene.add.particles(0, 0, "white_flare", {
                    speed: 200,
                    lifespan: 300,
                    quantity: 5,
                    scale: { start: 0.2, end: 0 },
                    emitting: false,
                    emitZone: { type: 'random', source: tileGrid[y][x]!.getBounds(), quantity: 10 },
                    duration: 200
                })
            }
        }
    }
    public setSelectionTween(tween: Phaser.Tweens.Tween) {
        this.selectionTween = tween
    }
    public removeSelectionTween() {
        if (this.selectionTween.isPlaying()) {
            this.selectionTween.destroy()
        }
    }
    public explode(x: number, y: number) {
        this.explosions[y][x].start()
    }
    public resetGrids() {

    }
}