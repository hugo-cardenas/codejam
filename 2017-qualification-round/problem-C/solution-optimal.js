#!/usr/local/bin/node

const generateOutput = require('../generateOutput');

const getLineOutput = line => {
    const [length, numPeople] = line.split(' ').map(part => parseInt(part));

    let min;
    let max;

    let values = [length];
    let count = {
        [length]: 1
    };
    let i = 0;

    while (1) {
        const x = Math.max(...values);
        const x1 = Math.ceil((x - 1) / 2);
        const x2 = Math.floor((x - 1) / 2);

        i += count[x];
        if (i >= numPeople) {
            return x1 + ' ' + x2;
        }

        values.splice(values.indexOf(x), 1);
        if (!values.includes(x1)) {
            values.push(x1);
        }
        if (!values.includes(x2)) {
            values.push(x2);
        }

        if (count[x1] === undefined) {
            count[x1] = 0;
        }
        if (count[x2] === undefined) {
            count[x2] = 0;
        }
        count[x1] += count[x];
        count[x2] += count[x];
    }
};

generateOutput(getLineOutput);