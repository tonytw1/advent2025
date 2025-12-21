import * as fs from 'fs';

export function part1(filename: string): number {
    const batteries = parseInput(filename);
    var total = 0;
    for (const battery of batteries) {
        total += joltageOf(bestArrangement(battery, 2))
    }
    return total;
}

export function part2(filename: string): Number {
    const batteries = parseInput(filename);
    var total = 0
    for (const battery of batteries) {
        total += joltageOf(bestArrangement(battery, 12))
    }
    return total;
}

function bestArrangement(battery: number[], desiredBatterySize: number): number[] {
    // The best outcome is always allowing the highest possible number to appear on the left.
    // To do this we are allowed to discard up to n numbers

    var result: number[] = []
    // Number of allowed discards is a function of the battery length and desired length
    var canDiscard = battery.length - desiredBatterySize

    var i = 0
    while (i < battery.length && result.length < desiredBatterySize) {
        // Find the higest digit reachable with the allowed discards
        var slice = battery.slice(i, i + canDiscard + 1);
        const allTheSame = slice.every(v => v === slice[0]);
        if (allTheSame) {
            // Nothing todo if all the digits are the same
            // but only consume the first digit to perserve our look ahead
            result.push(slice[0])
            i += 1

        } else {
            // Find the best digit within the allowed discard range and then slice to it
            var bestDigit = -1
            var indexOfBest = -1
            for (let j = 0; j <= canDiscard + 1 && j < slice.length; j++) {
                const digit = slice[j];
                if (digit > bestDigit) {
                    bestDigit = digit;
                    indexOfBest = j;
                }
            }
            result.push(bestDigit);
            i = i + indexOfBest + 1;
            canDiscard = canDiscard - indexOfBest;  // Using the first digit doesn't cost a discard so don't correct for the index off by 1
        }
    }

    return result
}

function joltageOf(best: number[]) {
    var jostage = 0;
    var scale = 1;
    for (let i = best.length - 1; i >= 0; i--) {
        jostage += best[i] * scale;
        scale = scale * 10;
    }
    return jostage;
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

