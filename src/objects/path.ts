import { Tile } from "./tile"

export enum PathType {
    NONE,
    CIRCLE,
    SQUARE,
    OCTAGON,
    TRIANGLE,
    STAR,
}
export class Path {
    private pathType: PathType
    private circle: Phaser.Geom.Circle
    private square: Phaser.Geom.Rectangle
    private triangle: Phaser.Geom.Triangle
    private octagon: Phaser.Curves.Path
    private star: Phaser.Curves.Path
    private currentProgress: number
    public constructor() {
        this.circle = new Phaser.Geom.Circle(250, 300, 200)

        this.square = new Phaser.Geom.Rectangle(50, 100, 400, 400)

        this.triangle = new Phaser.Geom.Triangle(50, 500, 250, 200, 450, 500)
        
        this.octagon = new Phaser.Curves.Path(150, 100)
        this.octagon.lineTo(350, 100)
        this.octagon.lineTo(450, 200)
        this.octagon.lineTo(450, 400)
        this.octagon.lineTo(350, 500)
        this.octagon.lineTo(150, 500)
        this.octagon.lineTo(50, 400)
        this.octagon.lineTo(50, 200)
        this.octagon.lineTo(150, 100)
        
        const cx = 250; // Center x
        const cy = 250; // Center y
        const R = 200; // Outer radius
        const r = 95;  // Inner radius
        this.star = new Phaser.Curves.Path(cx, cy - R); // Start at the top

        for (let i = 0; i < 5; i++) {
            // Outer point
            let angle = Math.PI / 2 + 2 * Math.PI * i / 5;
            let x = cx + Math.cos(angle) * R;
            let y = cy - Math.sin(angle) * R;
            this.star.lineTo(x, y);

            // Inner point
            angle += Math.PI / 5;
            x = cx + Math.cos(angle) * r;
            y = cy - Math.sin(angle) * r;
            this.star.lineTo(x, y);
        }
        // this.Spath.lineTo(150, 200)
        this.star.closePath()
        this.pathType = PathType.NONE
        this.currentProgress = 0
    }
    public setPath(pathType: PathType) {
        this.pathType = pathType
    }
    public getPoints(tiles: Tile[]): Phaser.Geom.Point[] {
        switch (this.pathType) {
            case PathType.CIRCLE: {
                return this.circle.getPoints(tiles.length)
            }
            case PathType.SQUARE: {
                return this.square.getPoints(tiles.length)
            }
            case PathType.TRIANGLE: {
                return this.triangle.getPoints(tiles.length)
            }
            case PathType.OCTAGON: {
                let dt = 1 / tiles.length
                let points: Phaser.Geom.Point[] = []
                for (let i = 0; i < tiles.length; i ++) {
                    let position = this.octagon.getPoint(dt * i)
                    points.push(new Phaser.Geom.Point(position.x, position.y))
                }
                return points
            }
            case PathType.STAR: {
                let dt = 1 / tiles.length
                let points: Phaser.Geom.Point[] = []
                for (let i = 0; i < tiles.length; i ++) {
                    let position = this.star.getPoint(dt * i)
                    points.push(new Phaser.Geom.Point(position.x, position.y))
                }
                return points
            }
        }
        return []
    }
    public update(tiles: Tile[], time: number, delta: number) {
        if (this.pathType == PathType.NONE) return
        this.currentProgress += delta * 0.0004
        if (this.currentProgress >= 1) this.currentProgress -= 1
        let start = this.currentProgress
        let dt = 1 / tiles.length
        for (let i = 0; i < tiles.length; i ++) {
            let progress = start + i * dt
            if (progress >= 1) progress -= 1
            switch (this.pathType) {
                case PathType.CIRCLE: {
                    const point = this.circle.getPoint(progress)
                    tiles[i].setPosition(point.x, point.y)
                    break
                }
                case PathType.SQUARE: {
                    const point = this.square.getPoint(progress)
                    tiles[i].setPosition(point.x, point.y)
                    break
                }
                case PathType.OCTAGON: {
                    const point = this.octagon.getPoint(progress)
                    tiles[i].setPosition(point.x, point.y)
                    break
                }
                case PathType.TRIANGLE: {
                    const point = this.triangle.getPoint(progress)
                    tiles[i].setPosition(point.x, point.y)
                    break
                }
                case PathType.STAR: {
                    const point = this.star.getPoint(progress)
                    tiles[i].setPosition(point.x, point.y)
                    break
                }
            }
            
            
        }
    }
}