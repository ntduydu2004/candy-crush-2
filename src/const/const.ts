export let CONST = {
    score: 0,
    highscore: 0,
    gridWidth: 8,
    gridHeight: 8,
    tileWidth: 64,
    tileHeight: 72,
    candyTypes: [
        'cookie1',
        'croissant',
        'cupcake',
        'donut',
        'macaroon',
        'poptart1',
        // 'starcookie1',
    ],
    around: [
        {x: 1, y: 1},
        {x: 0, y: 1},
        {x: 1, y: 0},
        {x: -1, y: -1},
        {x: -1, y: 0},
        {x: -1, y: 1},
        {x: 0, y: -1},
        {x: 1, y: -1}
    ]
}

