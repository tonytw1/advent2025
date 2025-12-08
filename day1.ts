import { error } from 'console';
import * as fs from 'fs';

const dialSteps = 100;

export function part1(filename: string): number {
    const moves = parseInput(filename);

    var p = 50
    var zeros = 0
    for (const move of moves) {
        p = dialPositionAfterMove(p, move);
        if (p === 0) {
            zeros += 1;
        }
    }
    return zeros;
}

export function part2(filename: string): number {
    const moves = parseInput(filename);

    var p = 50
    var zeros = 0
    for (const move of moves) {
        // Final dial postion is the same as part 1

        // Evaulate how many times this crosses zero with out brute forcing it
        // Probably a function of the delta
        // Number of times through 0 is probably a proxy for know many full rotations have been made 
        // with an allowance for how close you started to 0.
        zeros += zeroCrossingsByDelta(p, move);
        p = dialPositionAfterMove(p, move);
    }
    return zeros;

    function zeroCrossingsByBruteForce(start: number, move: number): number {
        // Used to cross check the delta based approach
        var zeros = 0;
        var p = start;
        for (let i = 0; i < Math.abs(move); i++) {
            p = dialPositionAfterMove(p, Math.sign(move));
            if (p === 0) {
                zeros += 1;
            }
        }
        return zeros;
    }

    function zeroCrossingsByDelta(start: number, move: number): number {
        const delta = Math.abs(move);
        if (move > 0) {
            const distanceFromZero = start;
            const t = delta + distanceFromZero;
            return Math.floor(t / dialSteps);

        } else {
            const distanceFromZero = dialSteps - start
            var t = delta + distanceFromZero;
            if (start == 0) {
                t -= dialSteps;
            }
            return Math.floor(t / dialSteps);
        }
        return 0;
    }
}

function dialPositionAfterMove(p: number, move: number) {
    p += move;
    // Normalise
    p = p % dialSteps;
    if (p < 0) {
        p += dialSteps;
    }
    return p;
}

function parseInput(filename: string) {
    const input = fs.readFileSync(filename, 'utf8');
    const moves = [];
    const lines = input.split(/\r?\n/);
    for (const line of lines) {
        if (line.startsWith("L")) {
            const newLocal = line.slice(1);
            moves.push((Number(newLocal) * -1));
        } else {
            const newLocal = line.slice(1);
            moves.push(Number(newLocal));
        }
    }
    return moves;
}

