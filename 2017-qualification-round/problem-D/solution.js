#!/usr/local/bin/node

const readline = require('readline');

const solve = grid => {
    const entries = [];

    for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < grid.length; i++) {

            let value;
            if (grid[j][i] === ' ') {
                let newGrid = setValue(grid, i, j, 'o');
                value = 'o';
                if (!newGrid)  {
                    newGrid = setValue(grid, i, j, '+');
                    value = '+';
                }
                if (!newGrid)  {
                    newGrid = setValue(grid, i, j, 'x');
                    value = 'x';
                }
                if (newGrid) {
                    grid = newGrid;
                    entries.push([value, i + 1, j + 1]);
                }
            }

            if (grid[j][i] === '+' ||  grid[j][i] === 'x') {
                let newGrid = setValue(grid, i, j, 'o');
                if (newGrid) {
                    grid = newGrid;
                    entries.push(['o', i + 1, j + 1]);
                }
            }

        }
    }

    return {
        entries,
        grid
    };
};

const setValue = (inputGrid, x, y, value) => {
    const grid = copy(inputGrid);
    grid[y][x] = value;

    const row = getRow(grid, y);
    const rowNonPlusCount = row.filter(e => e !== '+' && e !== ' ').length;

    if (rowNonPlusCount > 1) {
        return false;
    }

    const column = getColumn(grid, x);
    const columnNonPlusCount = column.filter(e => e !== '+' && e !== ' ').length;

    if (columnNonPlusCount > 1) {
        return false;
    }

    const diagonal = getDiagonal1(grid, x, y);
    const diagonalNonXCount = diagonal.filter(e => e !== 'x' && e !== ' ').length;

    if (diagonalNonXCount > 1) {
        return false;
    }

    const diagonal2 = getDiagonal2(grid, x, y);
    const diagonal2NonXCount = diagonal2.filter(e => e !== 'x' && e !== ' ').length;

    if (diagonal2NonXCount > 1) {
        return false;
    }

    return grid;
};

const getRow = (grid, y) => grid[y];

const getColumn = (grid, x) => grid.map(row => row[x]);

const getDiagonal1 = (grid, x, y) => {
    while (x > 0 && y > 0) {
        x--;
        y--;
    }
    const diagonal = [];
    while (x < grid.length && y < grid.length) {
        diagonal.push(grid[y][x]);
        x++;
        y++;
    }
    return diagonal;
};

const getDiagonal2 = (grid, x, y) => {
    while (x > 0 && y < grid.length - 1) {
        x--;
        y++;
    }
    const diagonal = [];
    while (x < grid.length && y >= 0) {
        diagonal.push(grid[y][x]);
        x++;
        y--;
    }
    return diagonal;
};

const copy = grid => {
    const newGrid = [];
    grid.forEach(row => {
        newGrid.push(row.slice());
    });
    return newGrid;
}

const print = grid => {
    if (!grid) {
        console.log('FALSE');
        return;
    }

    grid.forEach(row => {
        console.log('|' + row.join('') + '|');
    });
    console.log('');
    console.log('---');
    console.log('');
}

const getPoints = grid => {
    const pointValues = {
        ' ': 0,
        '+': 1,
        'x': 1,
        'o': 2    
    };
    let points = 0;
    grid.forEach(row => row.forEach(entry => {
        points += pointValues[entry];
    }));
    return points;
};

const grid = [
    '   '.split(''),
    '+++'.split(''),
    'x  '.split('')
];

const solveCase = (caseNumber, gridLength, inputEntries) => {
    let inputGrid = (new Array(gridLength).fill(undefined)).map(e => (new Array(gridLength)).fill(' '));
    inputEntries.forEach(entry => {
        const [value, y, x] = entry;
        inputGrid[y - 1][x - 1] = value;
    });
    
    const { entries, grid } = solve(inputGrid);
    
    console.log(`Case #${caseNumber}: ${getPoints(grid)} ${entries.length}`);
    entries.forEach(entry => console.log(entry.join(' ')));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let firstLineRead = false;
let caseNumber = 0;

let gridLength = 0;
let entryCount = 0;
let entries = [];

rl.on('line', (line) => {
    if (!firstLineRead) {
        firstLineRead = true;
        return;
    }

    if (entryCount > 0) {
        entries.push(line.split(' '));
        entryCount--;
    } else if (line) {
        entries = [];

        const lineItems = line.split(' ');
        gridLength = parseInt(lineItems[0]);
        entryCount = parseInt(lineItems[1]);
        caseNumber++;
    }

    if (entryCount === 0) {
        solveCase(caseNumber, gridLength, entries);
    }
});