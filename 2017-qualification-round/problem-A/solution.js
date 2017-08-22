#!/usr/local/bin/node

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let firstLineRead = false;
let lineNumber = 1;
rl.on('line', (line) => {
    if (!firstLineRead) {
        firstLineRead = true;
        return;
    }
    
    const result = getLineResult(line);
    process.stdout.write(`Case #${lineNumber}: ${result}\n`);
    lineNumber++;
});

const getLineResult = line => {
    const parts = line.split(' ');
    let pancakes = parts[0];
    let flipperSize = parseInt(parts[1]);

    let numSteps = 0;
    let i;
    while ((i = pancakes.indexOf('-')) >= 0) {
        if (pancakes.length - i < flipperSize) {
            return 'IMPOSSIBLE';
        }
        pancakes = flip(pancakes, i, flipperSize);
        numSteps++;
    }
    return numSteps;
};

const flip = (pancakes, i, flipperSize) => {
    if (i < 0 ||  i + flipperSize > pancakes.length) {
        throw new Error(`Invalid operation, pancakes: ${pancakes} (${pancakes.length}), i: ${i}, Flipper size: ${flipperSize}`);

    }
    const result = pancakes
        .split('')
        .map((pancake, index) => {
            if (index >= i && index <= i + flipperSize - 1) {
                return pancake === '+' ? '-' : '+';
            }
            return pancake;
        })
        .join('');

    return result;
};