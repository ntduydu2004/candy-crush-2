export let CONST = {
    score: 0,
    highscore: 0,
    gridWidth: 8,
    gridHeight: 8,
    tileWidth: 64,
    tileHeight: 72,
    candyTypes: [
        'blue-candy',
        'green-candy', 
        'orange-candy', 
        'purple-candy', 
        'red-candy'
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
}
