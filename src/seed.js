let seed = {
    TOTAL_TIME: 300,

    TOTAL_LIFE: 5,

    iconSize: [
        // 'fa-5x',
        // 'fa-4x',
        // 'fa-3x',
        // 'fa-2x',
        // 'fa-lg',
        '',
    ],

    level_digit: [
        1,//0
        1,//1
        1,//2
        1,//3
        2,//4
        1,//5
        1,//6
        1,//7
        2,//8
        2,//9
    ],

    level_equal_sign: {
        0: ['='],
        1: ['='],
        2: ['='],
        3: ['=', '>', '<'],
        4: ['='],
        5: ['='],
        6: ['='],
        7: ['=', '>', '<'],
        8: ['=', '>', '<'],
        9: ['=', '>', '<'],
    },

    level_operators: {
        0: ['+'],
        1: ['+'],
        2: ['-'],
        3: ['+', '-'],
        4: ['+', '-'],
        5: ['*'],
        6: ['/'],
        7: ['+', '-', '*'],
        8: ['+', '-', '*'],
        9: ['+', '-', '*', '/'],
    },

    iconSets: {
        0: [
            'fas fa-bug',
            'fas fa-baby-carriage',
            'fas fa-baby',
            'fas fa-child',
            'fas fa-walking',
            'fas fa-running',
            'fas fa-skating',
            'fas fa-skiing-nordic',
            'fas fa-snowboarding',
            'fas fa-snowman',
        ],
        1: [
            'fas fa-chess-pawn',
            'fas fa-horse-head',
            'fas fa-chess-knight',
            'fas fa-chess-rook',
            'fas fa-chess-queen',
            'fas fa-chess-king',
            'fas fa-crown',
            'fas fa-dragon',
            'fas fa-plane',
            'fas fa-rocket',

        ]
    }

}
export default seed