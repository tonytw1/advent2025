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

export function part2(filename: string): number {
    const ranges = parseInput(filename);

    function isInvalid(n: number): boolean {
        const asString = n.toString();

        // Step through each allowed sequence length
        for (let l = 1; l < asString.length; l++) {
            if (asString.length % l !== 0) {
                // Discard lengths which won't fit evenly
                continue;
            }

            const sequence = asString.substring(0, l);
            for (let s = l; s < asString.length; s += l) {
                const substring = asString.substring(s, s + l);
                if (substring != sequence) {
                    break
                }
                if (s + l == asString.length) {
                    return true;
                }
            }

        }
        return false;
    }

    var invalidTotal = 0;
    for (const range of ranges) {
        const start = range[0];
        const end = range[1];
        for (let n = start; n <= end; n++) {
            if (isInvalid(n)) {
                invalidTotal += n;
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

