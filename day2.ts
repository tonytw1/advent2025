import * as fs from 'fs';

export function part1(filename: string): number {
    const ranges = parseInput(filename);

    var invalidTotal = 0;
    for (const range of ranges) {
        const start = range[0];
        const end = range[1];

        for (let n = start; n <= end; n++) {
            const asString = n.toString();
            if (asString.length % 2 == 0) {
                const middle = asString.length / 2;
                const left = asString.substring(0, middle);
                const right = asString.substring(middle);
                if (left === right) {
                    invalidTotal += n;
                }
            }
        }
    }
    return invalidTotal;
}

function parseInput(filename: string) {
    const input = fs.readFileSync(filename, 'utf8');
    const ranges: number[][] = [];
    const rangeInputs = input.split(",");
    for (const rangeInput of rangeInputs) {
        const split = rangeInput.split("-");
        const start = Number(split[0]);
        const end = Number(split[1]);
        ranges.push([start, end]);
    }
    return ranges;
}

