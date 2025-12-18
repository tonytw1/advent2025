import * as fs from 'fs';

export function part1(filename: string): number {
    const batteries = parseInput(filename);

    var total = 0;
    for (const battery of batteries) {
        // A given battery can only form a pair with a number of it's right
        // Further more picking the largest possible number to the right will always given the highest value
        // So...
        // Working from right to left, keep track of the largest number seen so far 
        // and use that to compuse the best possible value for the each battery
        var best = 0
        var bestToRight = 0
        for (let i = 1; i < battery.length + 1; i++) {
            const b = battery[battery.length - i];
            if (bestToRight > 0) {
                const joltage = (b * 10) + bestToRight;
                if (joltage > best) {
                    best = joltage;
                }
            }
            if (b > bestToRight) {
                bestToRight = b;
            }
        }
        total += best;
    }

    return total;
}

function parseInput(filename: string) {
    const input = fs.readFileSync(filename, 'utf8');
    const rows: number[][] = [];
    const lines = input.split(/\r?\n/);
    for (const line of lines) {
        const row: number[] = [];
        for (let i = 0; i < line.length; i++) {
            const c = line.charAt(i);
            const num = Number.parseInt(c);
            row.push(num);
        }
        rows.push(row);
    }
    return rows;
}
