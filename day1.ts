import * as fs from 'fs';

export function day1(filename: string): number {
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

    const dialSteps = 100;
    var zeros = 0
    var p = 50
    for(const move of moves) {
        if (move > 0)
           p += move;
        else {
            // map left moves into match right moves for easier wrap around
              p += (dialSteps - Math.abs(move));
        }
        // Normalise
        p = p % dialSteps;

        if (p === 0) {
            zeros += 1;
        }
    }
    return zeros;
}
