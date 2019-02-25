let seed = {
    TOTAL_TIME: 300,

    TOTAL_LIFE: 5,

    iconSize: [
        'fa-5x',
        'fa-4x',
        'fa-3x',
        'fa-2x',
        // 'fa-lg',
    ],

    difficult_zero_icons: [
        ['ios-brush', 'ios-brush-outline'],
        ['ios-bug', 'ios-bug-outline'],
        ['ios-plane', 'ios-plane-outline'],
        ['ios-leaf', 'ios-leaf-outline'],
        ['ios-man', 'ios-man-outline'],
        ['ios-nutrition', 'ios-nutrition-outline'],
        ['ios-paper-plane', 'ios-paper-plane-outline'],
        ['ios-umbrella', 'ios-umbrella-outline'],
        ['ios-basket', 'ios-basket-outline'],
        ['ios-ice-cream', 'ios-ice-cream-outline'],
        ['ios-heart', 'ios-heart-outline'],
        ['ios-home', 'ios-home-outline'],
        ['ios-pizza', 'ios-pizza-outline'],
        ['ios-tennisball', 'ios-tennisball-outline'],
    ],
    level_define: {
        0: {
            0: { sign: ['='], ops: ['+'], digit: 1 },
            1: { sign: ['='], ops: ['+'], digit: 1 },
            2: { sign: ['='], ops: ['-'], digit: 1 },
            3: { sign: ['='], ops: ['-'], digit: 1 },
            4: { sign: ['='], ops: ['+', '-'], digit: 1 },
            5: { sign: ['='], ops: ['+', '-'], digit: 1 },
            6: { sign: ['='], ops: ['+', '-'], digit: 1 },
            7: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 1 },
            8: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 1 },
            9: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 1 },
        },
        1: {
            0: { sign: ['='], ops: ['+'], digit: 1 },
            1: { sign: ['='], ops: ['-'], digit: 1 },
            2: { sign: ['='], ops: ['+', '-'], digit: 1 },
            3: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 1 },
            4: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 1 },
            5: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 1 },
            6: { sign: ['='], ops: ['+', '-'], digit: 2 },
            7: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 2 },
            8: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 2 },
            9: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 3 },
        },
        2: {
            0: { sign: ['='], ops: ['+'], digit: 1 },
            1: { sign: ['=', '>', '<'], ops: ['+'], digit: 1 },
            2: { sign: ['='], ops: ['-'], digit: 1 },
            3: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 1 },
            4: { sign: ['='], ops: ['+', '-'], digit: 2 },
            5: { sign: ['='], ops: ['*'], digit: 1 },
            6: { sign: ['='], ops: ['/'], digit: 1 },
            7: { sign: ['=', '>', '<'], ops: ['+', '-', '*'], digit: 2 },
            8: { sign: ['=', '>', '<'], ops: ['+', '-', '*'], digit: 3 },
            9: { sign: ['=', '>', '<'], ops: ['+', '-', '*', '/'], digit: 3 },
        },
        3: {
            0: { sign: ['='], ops: ['+'], digit: 2 },
            1: { sign: ['='], ops: ['-'], digit: 2 },
            2: { sign: ['='], ops: ['+', '-'], digit: 2 },
            3: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 1 },
            4: { sign: ['=', '>', '<'], ops: ['+', '-'], digit: 2 },
            5: { sign: ['='], ops: ['*'], digit: 2 },
            6: { sign: ['='], ops: ['/'], digit: 2 },
            7: { sign: ['=', '>', '<'], ops: ['+', '-', '*'], digit: 2 },
            8: { sign: ['=', '>', '<'], ops: ['+', '-', '*', '/'], digit: 3 },
            9: { sign: ['=', '>', '<'], ops: ['+', '-', '*', '/'], digit: 3 },
        }
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