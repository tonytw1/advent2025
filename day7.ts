import * as fs from 'fs';

export function part1(filename: string): number {
    const [s, splitters] = parseInput(filename)

    function splittingTachyonBeamCount(s: number) {
        var beams = new Set<number>();
        beams.add(s);

        var totalSplits = 0;
        for (const line of splitters) {
            // Compose the next set of beams based in this line's interaction with the current beams
            const nextBeams = new Set<number>();
            for (const beam of beams) {
                if (line.has(beam)) {
                    // Split
                    nextBeams.add(beam - 1);
                    nextBeams.add(beam + 1);
                    totalSplits++;
                } else {
                    // This beam drops through
                    nextBeams.add(beam);
                }
            }
            beams = nextBeams;
        }

        return totalSplits;
    }

    return splittingTachyonBeamCount(s);
}

export function part2(filename: string): number {
    const [s, splitters] = parseInput(filename)

    const cache = new Map();

    function quantumTachyonPaths(s: number, d: number): number {
        // If we have reached the end of the depth then we can return 1 so indicate a possible path
        if (d == splitters.length) {
            return 1
        }

        // There is going to be an enormous about of rework over the lower layers
        // so we can spend memory on a cache to prevent rework of previously completed nodes
        const key = d + "-" + s
        if (cache.has(key)) {
            return cache.get(key)
        }

        const line = splitters[d]
        // If have not hit a splitter then we can recurse straight down in to the next layer
        if (!line.has(s)) {
            const countFromThisNode = quantumTachyonPaths(s, d + 1)
            cache.set(key, countFromThisNode)
            return quantumTachyonPaths(s, d + 1)
        } else {
            // Otherwise split and recurse into and count both paths
            const countFromThisNode = quantumTachyonPaths(s - 1, d + 1) + quantumTachyonPaths(s + 1, d + 1)
            cache.set(key, countFromThisNode)
            return countFromThisNode
        }
    }

    return quantumTachyonPaths(s, 0)
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
