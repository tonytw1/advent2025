import * as fs from 'fs';

export function part1(filename: string): number {
    const points = parseInput(filename);

    // For every combination of points, find the size
    // Record the best
    let bestSize = 0;

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const startPoint = points[i];
            const endPoint = points[j];

            const dx = Math.abs(startPoint[0] - endPoint[0]) + 1;
            const dy = Math.abs(startPoint[1] - endPoint[1]) + 1;
            const size = dx * dy;

            bestSize = Math.max(bestSize, size);
        }
    }

    return bestSize
}

function parseInput(filename: string): [number, number][] {
    // Parse each line into a tuple of numbers
    const input = fs.readFileSync(filename, 'utf8');
    const lines = input.split(/\r?\n/);

    const points: [number, number][] = [];

    for (const line of lines) {
        const point: [number, number] = line.split(',').map(Number) as [number, number];
        points.push(point)
    }

    return points
}
