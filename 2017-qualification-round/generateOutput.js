#!/usr/local/bin/node

const readline = require('readline');

module.exports = (getLineResult) => {
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
};
