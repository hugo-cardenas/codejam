#!/usr/local/bin/node

const generateOutput = require('../generateOutput');

const isSorted = digits => {
    for (let i = 0; i < digits.length - 1; i++) {
        if (digits[i] > digits[i + 1])  {
            return false;
        }
    }
    return true;
}

const getLineResult = line => {
    const digits = line.split('').map(digit => parseInt(digit));
    const length = digits.length;

    // If already sorted, return
    if (isSorted(digits)) {
        return digits.join('');
    }

    const result = [];
    result[length - 1] = (digits[length - 1] === 0) ? 9 : digits[length - 1] - 1;

    for (let i = length - 2; i >= 0; i--) {
        if (digits[i] <= result[i + 1] && i !== length - 2) {
            result[i] = digits[i];
        } else {
            for (let j = i + 1; j < length; j++) {
                result[j] = 9;
            }
            result[i] = digits[i] - 1;
        }
    }

    while (result[0] === 0 && result.length > 1) {
        result.shift();
    }

    return result.join('');
};

generateOutput(getLineResult);