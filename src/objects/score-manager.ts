import { Scene } from "phaser";
import { ProgressBar } from "./progress-bar";

export class ScoreManager {
    private progressBar: ProgressBar
    private scoreText: Phaser.GameObjects.Text
    private scene: Scene
    private score: number
    private scoreMax: number

    public constructor(scene: Scene) {
        this.scene = scene
        this.progressBar = new ProgressBar(this.scene)
        this.reset()
    }

    public reset() {
        this.score = 0
        this.scoreMax = Phaser.Math.RND.between(1000, 1000)
        this.progressBar.setProgress(0)
    }

    public addScore(tileNumber: number) {
        this.score += tileNumber * 50
        this.score = Math.min(this.score, this.scoreMax)
        this.progressBar.setProgress(this.score/this.scoreMax)
    }

    public reachedMaxScore(): boolean {
        return this.score == this.scoreMax
    }
}