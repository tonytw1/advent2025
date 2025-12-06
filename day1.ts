import * as fs from 'fs';

export function day1(filename: string): number {
    const moves = parseInput(filename);

    const dialSteps = 100;
    var zeros = 0
    return part1();

    function part1(): number {
        var p = 50
        for (const move of moves) {
            p = dialPositionAfterMove(p, move);
            if (p === 0) {
                zeros += 1;
            }
        }
        return zeros;
    }

    function part2(): number {
        var p = 50
        for (const move of moves) {
            // Final dial postion is the same as part 1
            p = dialPositionAfterMove(p, move);

            // Evaulate how many times this crosses zero with out brute forcing it
            // Probably a function of the delta
            if (p === 0) {
                zeros += 1;
            }
        }
        return zeros;
    }

    function dialPositionAfterMove(p: number, move: number) {
        if (move > 0)
            p += move;
        else {
            // map left moves into match right moves for easier wrap around
            p += (dialSteps - Math.abs(move));
        }
        // Normalise
        p = p % dialSteps;
        return p;
    }


    function parseInput(filename: string) {
        const input = fs.readFileSync(filename, 'utf8');
        const moves = [];
        const lines = input.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
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

}
