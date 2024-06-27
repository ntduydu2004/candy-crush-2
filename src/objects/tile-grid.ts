import { Scene } from 'phaser'
import { ObjectManager } from './object-manager'
import { Tile } from './tile'
import { CONST } from '../const/const'
import { EffectManager } from './effect-manager'
import { PathType } from './path'
import { ScoreManager } from './score-manager'

export type Hint = {
    firstX: number
    firstY: number
    secondX: number
    secondY: number
}
export class TileGrid {
    private objectManager: ObjectManager<Tile>
    private effectManager: EffectManager
    private scoreManager: ScoreManager
    private scene: Scene
    private row: number
    private column: number
    private tileGrid: (Tile | undefined)[][]
    private firstSelectedTile: Tile | undefined
    private secondSelectedTile: Tile | undefined
    private canMove: boolean
    private visited: boolean[][]
    private isShaking: boolean
    private tilesArr: Tile[]
    public constructor(scene: Scene, row: number, column: number) {
        this.scene = scene
        this.row = row
        this.column = column
        this.canMove = true
        this.isShaking = false
        this.scoreManager = new ScoreManager(scene)
        this.objectManager = new ObjectManager(
            (object: Tile) => {
                object.x = -100
                object.y = -100
                object.setTexture('')
                object.setTileNumber(1)
                object.stopFlame()
            },
            () => {
                return new Tile({
                    scene: this.scene,
                    x: -100,
                    y: -100,
                    texture: '',
                })
            }
        )
        this.tilesArr = []
        this.tileGrid = []
        this.visited = new Array(this.row).fill(null).map(() => new Array(this.column).fill(false))
        for (let y = 0; y < row; y++) {
            this.tileGrid[y] = []
            for (let x = 0; x < column; x++) {
                this.tileGrid[y][x] = this.createTile(x, y)
            }
        }

        this.effectManager = new EffectManager(scene, row, column, this.tileGrid)
        // this.getShuffledTileArray()
        // this.effectManager.setPath(PathType.OCTAGON)
        // this.effectManager.setPositionsOnPath(this.tilesArr)
        this.firstSelectedTile = undefined
        this.secondSelectedTile = undefined

        this.scene.input.on('gameobjectdown', this.tileDown)
        this.checkMatches()
    }
    public update(time: number, delta: number): void {
        this.effectManager.update(this.tilesArr, time, delta)
    }
    private celebrate(): void {
        this.scene.time.removeAllEvents()
        this.effectManager.removeHint()
        this.effectManager.removeIdleTileTween(this.tileGrid)
        this.getShuffledTileArray()
        this.effectManager.setPath(Phaser.Math.RND.between(1, 4))
        this.effectManager.setPositionsOnPath(this.tilesArr)
        this.effectManager.startConfettiEffect()
        this.scene.time.delayedCall(5000, () => {
            this.effectManager.setPath(PathType.NONE)
            this.returnToInitialPosition()
        })
    }
    private returnToInitialPosition(): void {
        this.scoreManager.reset()
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.column; x ++) {
                this.scene.add.tween({
                    targets: this.tileGrid[y][x],
                    x: x * CONST.tileWidth + CONST.tileWidth / 2,
                    y: y * CONST.tileHeight + CONST.tileHeight / 2,
                    ease: 'linear',
                    delay: 5 * (y * this.column + x),
                    duration: 500
                })
            }
        }
        this.checkMatches()
    } 
    private tileDown = (pointer: Phaser.Input.Pointer) => {
        let y = Math.floor(pointer.y / CONST.tileHeight)
        let x = Math.floor(pointer.x / CONST.tileWidth)
        if (!this.canMove) return
        if (!this.firstSelectedTile) {
            this.firstSelectedTile = this.tileGrid[y][x]
            this.effectManager.startSelectionTween(this.firstSelectedTile!)
        } else {
            this.effectManager.removeSelectionTween(this.firstSelectedTile!)
            if (this.firstSelectedTile === this.tileGrid[y][x]) {
                this.firstSelectedTile = undefined
                return
            }
            this.secondSelectedTile = this.tileGrid[y][x]
            let dx =
                Math.abs(this.firstSelectedTile.x - this.secondSelectedTile!.x) / CONST.tileWidth
            let dy =
                Math.abs(this.firstSelectedTile.y - this.secondSelectedTile!.y) / CONST.tileHeight
            if (dx + dy === 1) {
                this.canMove = false
                this.scene.time.removeAllEvents()
                this.effectManager.removeHint()
                this.effectManager.removeIdleTileTween(this.tileGrid)
                this.swapTiles()
            } else {
                this.firstSelectedTile = this.tileGrid[y][x]
                this.secondSelectedTile = undefined
                this.effectManager.startSelectionTween(this.firstSelectedTile!)
            }
        }
    }
    private releaseTile(tile: Tile) {
        this.objectManager.returnObject(tile)
    }
    private checkValid(x: number, y: number): boolean {
        return (
            0 <= x &&
            x < this.column &&
            0 <= y &&
            y < this.row &&
            this.tileGrid[y][x] !== undefined &&
            !this.visited[y][x]
        )
    }
    private createTile(x: number, y: number): Tile {
        // Get a random tile
        let randomTileType: string =
            CONST.candyTypes[Phaser.Math.RND.between(0, CONST.candyTypes.length - 1)]
        let newTile = this.objectManager.getObject()
        newTile.setPosition(
            x * CONST.tileWidth + CONST.tileWidth / 2,
            y * CONST.tileHeight + CONST.tileHeight / 2
        )
        newTile.setTexture(randomTileType)
        // Return the created tile
        return newTile
    }
    private renderHint() {
        const hint = this.getHints()
        let firstX = this.tileGrid[hint.firstY][hint.firstX]!.x
        let firstY = this.tileGrid[hint.firstY][hint.firstX]!.y
        let secondX = this.tileGrid[hint.secondY][hint.secondX]!.x
        let secondY = this.tileGrid[hint.secondY][hint.secondX]!.y
        this.effectManager.renderHint(firstX, firstY, secondX, secondY)
    }
    private getHints(): Hint {
        let result: Hint[] = []
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.column; x++) {
                let textureKey = this.tileGrid[y][x]!.texture.key
                this.visited[y][x] = true
                if (this.checkExistMatch(x + 1, y, textureKey)) {
                    result.push({
                        firstX: x,
                        firstY: y,
                        secondX: x + 1,
                        secondY: y,
                    })
                }

                if (this.checkExistMatch(x - 1, y, textureKey)) {
                    result.push({
                        firstX: x,
                        firstY: y,
                        secondX: x - 1,
                        secondY: y,
                    })
                }
                if (this.checkExistMatch(x, y + 1, textureKey)) {
                    result.push({
                        firstX: x,
                        firstY: y,
                        secondX: x,
                        secondY: y + 1,
                    })
                }
                if (this.checkExistMatch(x, y - 1, textureKey)) {
                    result.push({
                        firstX: x,
                        firstY: y,
                        secondX: x,
                        secondY: y - 1,
                    })
                }
                this.visited[y][x] = false
            }
        }
        if (result.length == 0) {
            return {
                firstX: -1,
                firstY: -1,
                secondX: -1,
                secondY: -1,
            }
        }
        return result[Phaser.Math.RND.between(0, result.length - 1)]
    }

    private getShuffledTileArray(): void {
        this.tilesArr = []
        for (let i = 0; i < this.row; i ++) {
            for (let j = 0; j < this.column; j ++) {
                this.tilesArr.push(this.tileGrid[i][j]!)
            }
        }
        this.tilesArr.sort(() => Math.random() - 0.5)
    }
    private checkExistMatch(x: number, y: number, textureKey: string): boolean {
        if (!this.checkValid(x, y)) {
            return false
        }
        // count horizontal
        let count = 1
        for (let i = x - 1; i >= 0; i--) {
            if (this.checkValid(i, y) && this.tileGrid[y][i]!.texture.key === textureKey) {
                count++
            } else break
        }
        for (let i = x + 1; i < this.column; i++) {
            if (this.checkValid(i, y) && this.tileGrid[y][i]!.texture.key === textureKey) {
                count++
            } else break
        }
        if (count >= 3) return true
        count = 1

        // count vertical
        for (let i = y - 1; i >= 0; i--) {
            if (this.checkValid(x, i) && this.tileGrid[i][x]!.texture.key === textureKey) {
                count++
            } else break
        }
        for (let i = y + 1; i < this.row; i++) {
            if (this.checkValid(x, i) && this.tileGrid[i][x]!.texture.key === textureKey) {
                count++
            } else break
        }
        return count >= 3
    }
    private swapTiles() {
        if (this.firstSelectedTile && this.secondSelectedTile) {
            // Get the position of the two tiles
            let firstTilePosition = {
                x: this.firstSelectedTile.x,
                y: this.firstSelectedTile.y,
            }

            let secondTilePosition = {
                x: this.secondSelectedTile.x,
                y: this.secondSelectedTile.y,
            }

            // Swap them in our grid with the tiles
            this.tileGrid[(firstTilePosition.y - CONST.tileHeight / 2) / CONST.tileHeight][
                (firstTilePosition.x - CONST.tileWidth / 2) / CONST.tileWidth
            ] = this.secondSelectedTile
            this.tileGrid[(secondTilePosition.y - CONST.tileHeight / 2) / CONST.tileHeight][
                (secondTilePosition.x - CONST.tileWidth / 2) / CONST.tileWidth
            ] = this.firstSelectedTile

            // Move them on the screen with tweens
            this.scene.add.tween({
                targets: this.firstSelectedTile,
                x: this.secondSelectedTile.x,
                y: this.secondSelectedTile.y,
                ease: 'expo.inout',
                duration: 400,
                repeat: 0,
                yoyo: false,
            })

            this.scene.add.tween({
                targets: this.secondSelectedTile,
                x: this.firstSelectedTile.x,
                y: this.firstSelectedTile.y,
                ease: 'expo.inout',
                duration: 400,
                repeat: 0,
                yoyo: false,
                onComplete: () => {
                    this.checkMatches()
                },
            })

            this.firstSelectedTile =
                this.tileGrid[(firstTilePosition.y - CONST.tileHeight / 2) / CONST.tileHeight][
                    (firstTilePosition.x - CONST.tileWidth / 2) / CONST.tileWidth
                ]
            this.secondSelectedTile =
                this.tileGrid[(secondTilePosition.y - CONST.tileHeight / 2) / CONST.tileHeight][
                    (secondTilePosition.x - CONST.tileWidth / 2) / CONST.tileWidth
                ]
        }
    }
    private fillTiles(): void {
        let count = 0
        for (let x = 0; x < this.column; x++) {
            let empty = 0
            for (let y = this.row - 1; y >= 0; y--) {
                if (this.tileGrid[y][x] === undefined) {
                    empty++
                    continue
                }
                let tempTile = this.tileGrid[y][x]
                this.tileGrid[y][x] = undefined
                this.tileGrid[y + empty][x] = tempTile
                this.effectManager.activeTweens++
                this.scene.add.tween({
                    targets: tempTile,
                    y: (y + empty) * CONST.tileHeight + CONST.tileHeight / 2,
                    ease: 'bounce',
                    duration: 400,
                    delay: 100,
                    onComplete: () => {
                        this.effectManager.activeTweens--
                        if (this.effectManager.activeTweens == 0) {
                            this.checkMatches()
                        }
                    },
                })
            }
            for (let y = -1; y >= -empty; y--) {
                let newTile = this.createTile(x, y)
                this.tileGrid[y + empty][x] = newTile
                this.effectManager.activeTweens++
                this.scene.add.tween({
                    targets: newTile,
                    y: (y + empty) * CONST.tileHeight + CONST.tileHeight / 2,
                    ease: 'bounce',
                    duration: 400,
                    repeat: 0,
                    delay: 100,
                    yoyo: false,
                    onComplete: () => {
                        this.effectManager.activeTweens--
                        if (this.effectManager.activeTweens == 0) {
                            this.checkMatches()
                        }
                    },
                })
            }
            count += empty
        }
        this.tileUp()
    }
    private tileUp() {
        this.firstSelectedTile = undefined
        this.secondSelectedTile = undefined
    }
    private handleExplosionChain(x: number, y: number) {
        let tileNum = this.tileGrid[y][x]!.getTileNumber()
        let textureKey = this.tileGrid[y][x]!.texture.key
        this.scoreManager.addScore(tileNum)
        this.tileGrid[y][x] = undefined
        if (tileNum == 1) return
        this.isShaking = true
        if (tileNum == 4) {
            for (let i = 0; i < 8; i++) {
                let newY = y + CONST.around[i].y
                let newX = x + CONST.around[i].x
                if (!this.checkValid(newX, newY)) {
                    continue
                }

                let tile = this.tileGrid[newY][newX]!
                this.effectManager.activeTweens++
                this.scene.add.tween({
                    targets: tile,
                    duration: 200,
                    onComplete: () => {
                        this.effectManager.explode(newX, newY)
                        this.effectManager.activeTweens--
                        this.releaseTile(tile)
                        if (this.effectManager.activeTweens == 0) {
                            if (this.isShaking) {
                                this.effectManager.shake()
                                this.isShaking = false
                            }
                            this.fillTiles()
                        }
                    },
                })
                this.visited[newY][newX] = true
                this.handleExplosionChain(newX, newY)
            }
        } else if (tileNum == 5) {
            for (let i = 0; i < this.row; i++) {
                if (!this.checkValid(x, i)) continue
                let tile = this.tileGrid[i][x]!
                this.effectManager.activeTweens++
                this.scene.add.tween({
                    targets: tile,
                    duration: 200,
                    onComplete: () => {
                        this.effectManager.explode(x, i)
                        this.effectManager.activeTweens--
                        this.releaseTile(tile)
                        if (this.effectManager.activeTweens == 0) {
                            if (this.isShaking) {
                                this.effectManager.shake()
                                this.isShaking = false
                            }
                            this.fillTiles()
                        }
                    },
                })
                this.visited[i][x] = true
                this.handleExplosionChain(x, i)
            }

            for (let i = 0; i < this.column; i++) {
                if (!this.checkValid(i, y)) continue
                let tile = this.tileGrid[y][i]!
                this.effectManager.activeTweens++
                this.scene.add.tween({
                    targets: tileNum,
                    duration: 200,
                    onComplete: () => {
                        this.effectManager.explode(i, y)
                        this.effectManager.activeTweens--
                        this.releaseTile(tile)
                        if (this.effectManager.activeTweens == 0) {
                            if (this.isShaking) {
                                this.effectManager.shake()
                                this.isShaking = false
                            }
                            this.fillTiles()
                        }
                    },
                })
                this.visited[y][i] = true
                this.handleExplosionChain(i, y)
            }
        } else if (tileNum >= 6) {
            for (let i = 0; i < this.row; i++) {
                for (let j = 0; j < this.column; j++) {
                    if (!this.checkValid(j, i)) continue
                    if (textureKey === this.tileGrid[i][j]!.texture.key) {
                        let tile = this.tileGrid[i][j]!
                        this.tileGrid[i][j] = undefined
                        this.effectManager.activeTweens++
                        this.scene.add.tween({
                            targets: tile,
                            duration: 200,
                            onComplete: () => {
                                this.effectManager.explode(j, i)
                                this.effectManager.activeTweens--
                                this.releaseTile(tile)
                                if (this.effectManager.activeTweens == 0) {
                                    if (this.isShaking) {
                                        this.effectManager.shake()
                                        this.isShaking = false
                                    }
                                    this.fillTiles()
                                }
                            },
                        })
                        this.visited[i][j] = true
                    }
                }
            }
        }
    }
    private checkMatches(): void {
        // reset
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.column; x++) {
                this.visited[y][x] = false
            }
        }
        // check if there is a crossline match
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.column; x++) {
                if (!this.checkValid(x, y)) continue
                let countHorizontal = 0
                let countVertical = 0
                let group: Tile[] = []
                // horizontal
                let i = x - 1
                while (true) {
                    if (
                        this.checkValid(i, y) &&
                        this.tileGrid[y][i]!.texture.key === this.tileGrid[y][x]!.texture.key
                    ) {
                        countHorizontal++
                        group.push(this.tileGrid[y][i]!)
                        i--
                    } else break
                }
                i = x + 1
                while (true) {
                    if (
                        this.checkValid(i, y) &&
                        this.tileGrid[y][i]!.texture.key === this.tileGrid[y][x]!.texture.key
                    ) {
                        countHorizontal++
                        group.push(this.tileGrid[y][i]!)
                        i++
                    } else break
                }
                if (countHorizontal < 2) continue

                // vertical
                i = y - 1
                while (true) {
                    if (
                        this.checkValid(x, i) &&
                        this.tileGrid[i][x]!.texture.key === this.tileGrid[y][x]!.texture.key
                    ) {
                        countVertical++
                        group.push(this.tileGrid[i][x]!)
                        i--
                    } else break
                }
                i = y + 1
                while (true) {
                    if (
                        this.checkValid(x, i) &&
                        this.tileGrid[i][x]!.texture.key === this.tileGrid[y][x]!.texture.key
                    ) {
                        countVertical++
                        group.push(this.tileGrid[i][x]!)
                        i++
                    } else break
                }
                if (countVertical < 2) continue
                let tileNum = 0
                for (let j = 0; j < group.length; j++) {
                    let tile = group[j]
                    tileNum += tile.getTileNumber()
                    let tmpX = (tile.x - CONST.tileWidth / 2) / CONST.tileWidth
                    let tmpY = (tile.y - CONST.tileHeight / 2) / CONST.tileHeight
                    this.effectManager.activeTweens++
                    this.scene.add.tween({
                        targets: tile,
                        duration: 200,
                        x: x * CONST.tileWidth + CONST.tileWidth / 2,
                        y: y * CONST.tileHeight + CONST.tileHeight / 2,
                        ease: 'linear',
                        onComplete: () => {
                            this.effectManager.activeTweens--
                            this.releaseTile(tile)
                            if (this.effectManager.activeTweens == 0) {
                                this.fillTiles()
                            }
                        },
                    })
                    this.tileGrid[tmpY][tmpX] = undefined
                    this.visited[tmpY][tmpX] = true
                }
                this.tileGrid[y][x]!.addTileNumber(tileNum)
            }
        }
        // check if there is a horizontal line match
        for (let y = 0; y < this.row; y++) {
            for (let x = 0; x < this.column; x++) {
                if (!this.checkValid(x, y)) continue
                let count = 0
                let tmpX = x
                for (let i = x; i < this.column; i++) {
                    if (!this.checkValid(i, y)) break
                    if (this.tileGrid[y][x]!.texture.key === this.tileGrid[y][i]!.texture.key) {
                        count++
                        if (
                            this.tileGrid[y][i] === this.firstSelectedTile ||
                            this.tileGrid[y][i] === this.secondSelectedTile
                        ) {
                            tmpX = i
                        }
                    } else break
                }
                if (count == 3) {
                    // release the whole group
                    for (let i = x; i < x + 3; i++) {
                        if (!this.checkValid(i, y)) continue
                        let tile = this.tileGrid[y][i]!
                        this.effectManager.activeTweens++
                        this.scene.add.tween({
                            targets: tile,
                            duration: 200,
                            onComplete: () => {
                                this.effectManager.explode(i, y)
                                this.effectManager.activeTweens--
                                this.releaseTile(tile)
                                if (this.effectManager.activeTweens == 0) {
                                    if (this.isShaking) {
                                        this.effectManager.shake()
                                        this.isShaking = false
                                    }
                                    this.fillTiles()
                                }
                            },
                        })
                        this.visited[y][i] = true
                        this.handleExplosionChain(i, y)
                    }
                } else if (count > 3) {
                    let tileNum = 0
                    // group them together at this point and release the others

                    for (let i = x; i < x + count; i++) {
                        if (i == tmpX) continue
                        let tile = this.tileGrid[y][i]!
                        tileNum += tile.getTileNumber()
                        this.tileGrid[y][i] = undefined
                        this.effectManager.activeTweens++
                        this.scene.add.tween({
                            targets: tile,
                            ease: 'quad.out',
                            duration: 200,
                            x: tmpX * CONST.tileWidth + CONST.tileWidth / 2,
                            repeat: 0,
                            yoyo: false,
                            delay: 100,
                            onComplete: () => {
                                this.effectManager.activeTweens--
                                this.releaseTile(tile)
                                if (this.effectManager.activeTweens == 0) {
                                    if (this.isShaking) {
                                        this.effectManager.shake()
                                        this.isShaking = false
                                    }
                                    this.fillTiles()
                                }
                            },
                        })
                    }
                    this.tileGrid[y][tmpX]!.addTileNumber(tileNum)
                }
            }
        }

        // check if there is a vertical line match
        for (let x = 0; x < this.column; x++) {
            for (let y = 0; y < this.row; y++) {
                if (!this.checkValid(x, y)) continue
                let count = 0
                let tmpY = y
                for (let i = y; i < this.row; i++) {
                    if (!this.checkValid(x, i)) break
                    if (this.tileGrid[y][x]!.texture.key === this.tileGrid[i][x]!.texture.key) {
                        count++
                        if (
                            this.tileGrid[i][x] === this.firstSelectedTile ||
                            this.tileGrid[i][x] === this.secondSelectedTile
                        ) {
                            tmpY = i
                        }
                    } else break
                }

                if (count == 3) {
                    // release the whole group
                    for (let i = y; i < y + 3; i++) {
                        if (!this.checkValid(x, i)) continue
                        let tile = this.tileGrid[i][x]!
                        this.effectManager.activeTweens++
                        this.scene.add.tween({
                            targets: tile,
                            duration: 200,
                            onComplete: () => {
                                this.effectManager.explode(x, i)
                                this.releaseTile(tile)
                                this.effectManager.activeTweens--
                                if (this.effectManager.activeTweens == 0) {
                                    if (this.isShaking) {
                                        this.effectManager.shake()
                                        this.isShaking = false
                                    }
                                    this.fillTiles()
                                }
                            },
                        })
                        this.visited[i][x] = true
                        this.handleExplosionChain(x, i)
                    }
                } else if (count > 3) {
                    let tileNum = 0
                    // group them together at this point and release the others
                    for (let i = y; i < y + count; i++) {
                        if (i == tmpY) continue
                        let tile = this.tileGrid[i][x]!
                        tileNum += tile.getTileNumber()
                        this.tileGrid[i][x] = undefined
                        this.effectManager.activeTweens++
                        this.scene.add.tween({
                            targets: tile,
                            ease: 'quad.out',
                            duration: 200,
                            y: tmpY * CONST.tileHeight + CONST.tileHeight / 2,
                            repeat: 0,
                            yoyo: false,
                            delay: 100,
                            onComplete: () => {
                                this.effectManager.activeTweens--
                                this.releaseTile(tile)
                                if (this.effectManager.activeTweens == 0) {
                                    if (this.isShaking) {
                                        this.effectManager.shake()
                                        this.isShaking = false
                                    }
                                    this.fillTiles()
                                }
                            },
                        })
                    }
                    this.tileGrid[tmpY][x]!.addTileNumber(tileNum)
                }
            }
        }
        if (this.effectManager.activeTweens == 0) {
            if (!this.firstSelectedTile && !this.secondSelectedTile) {
                if (this.scoreManager.reachedMaxScore()) {
                    this.celebrate()
                    return
                }
                this.scene.time.delayedCall(3000, () => {
                    this.renderHint()
                })
                this.scene.time.delayedCall(3000, () => {
                    this.effectManager.startIdleTileTween(this.tileGrid)
                })
            }
            this.swapTiles()
            this.tileUp()

            this.canMove = true
        }
    }
}
