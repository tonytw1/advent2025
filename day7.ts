import * as fs from 'fs';

export function part1(filename: string): number {
    const [s, splitters] = parseInput(filename)

    var beams = new Set<number>()
    beams.add(s)

    var totalSplits = 0
    for (const line of splitters) {
        // Compose the next set of beams based in this line's interaction with the current beams
        const nextBeams = new Set<number>()
        for (const beam of beams) {
            if (line.has(beam)) {
                // Split
                nextBeams.add(beam - 1)
                nextBeams.add(beam + 1)
                totalSplits++
            } else {
                // This beam drops through
                nextBeams.add(beam)
            }
        }
        beams = nextBeams
    }

    return totalSplits
}

function parseInput(filename: string): [number, Set<number>[]] {
    // Parse the input.
    // Return the index of the start from the first row
    // and a list of sets of indexes of the splitters
    const input = fs.readFileSync(filename, 'utf8');
    const lines = input.split(/\r?\n/);

    const firstLine = lines[0]
    const s = firstLine.indexOf('S')

    const splitters: Set<number>[] = []
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i]
        const lineSplitters = new Set<number>()
        for (let j = 0; j < line.length; j++) {
            if (line.charAt(j) == '^') {
                lineSplitters.add(j)
            }
        }
        if (lineSplitters.size > 0) {
            splitters.push(lineSplitters)
        }
    }

    return [s, splitters]
}
