export let CONST = {
    score: 0,
    highscore: 0,
    gridWidth: 8,
    gridHeight: 8,
    tileWidth: 64,
    tileHeight: 72,
    candyTypes: ['cracker', 'gato', 
        'donut', 'candy', 
        // 'cake'
    ],
    around: [
        { x: 1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
        { x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
    ],
    direction: [
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ],
}
