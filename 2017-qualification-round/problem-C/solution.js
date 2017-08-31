#!/usr/local/bin/node

const generateOutput = require('../generateOutput');

const getLineOutput = line => {
    const [length, numPeople] = line.split(' ').map(part => parseInt(part));

    let min;
    let max;

    let lengths = [length];
    let count = {
        [length]: 1
    };

    for (let i = 0; i < numPeople; i++) {
        let longestRow = lengths[0];
        min = Math.floor((longestRow - 1) / 2);
        max = Math.ceil((longestRow - 1) / 2);

        count[longestRow]--;
        if (count[longestRow] < 1) {
            lengths.shift();
        }

        let needSort = false;
        if (!count[min]) {
            count[min] = 0;
            lengths.push(min);
            needSort = true;
        }
        if (!count[max]) {
            count[max] = 0;
            if (max !== min) {
                lengths.push(max);
                needSort = true;
            }
        }
        if (needSort) {
            lengths.sort((a, b) => b - a);
        }

        count[min]++;
        count[max]++;
    }

    return max + ' ' + min;
};

generateOutput(getLineOutput);