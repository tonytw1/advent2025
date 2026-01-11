import * as fs from 'fs';

export function part1(filename: string, circuitsNeeded: number): number {
    const points = parseInput(filename);

    // Need a function to measure the distance between two points
    function distance(p1: [number, number, number], p2: [number, number, number]): number {
        const dx = (p1[0] - p2[0]) * (p1[0] - p2[0])
        const dy = (p1[1] - p2[1]) * (p1[1] - p2[1])
        const dz = (p1[2] - p2[2]) * (p1[2] - p2[2])
        return Math.sqrt(dx + dy + dz);
    }

    // Measure distances between all possible pairs of points and store in a map
    const distances: Map<string, number> = new Map();
    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dist = distance(points[i], points[j]);
            const key = points[i].toString() + "-" + points[j].toString();
            distances.set(key, dist);
        }
    }

    // Sort the pairs by smallest distance
    const sortedKeys = Array.from(distances.keys()).sort((a, b) => {
        return distances.get(a)! - distances.get(b)!;
    });

    // Trim to the required numnber of circuits
    const trimmed = sortedKeys.slice(0, circuitsNeeded);

    // Iterate through the sorted pairs and to group into connected regions
    let nextRegionId = 1;
    const connectedRegions: Map<string, number> = new Map();
    for (const key of trimmed) {
        const [point1, point2] = key.split("-");
        const region1 = connectedRegions.get(point1);
        const region2 = connectedRegions.get(point2);

        if (region1 === undefined && region2 === undefined) {
            // Both points are unconnected, create a new region
            connectedRegions.set(point1, nextRegionId);
            connectedRegions.set(point2, nextRegionId);
            nextRegionId++;

        } else if (region1 !== undefined && region2 === undefined) {
            // Point 2 is unconnected, connect it to point 1's region
            connectedRegions.set(point2, region1);

        } else if (region2 !== undefined && region1 === undefined) {
            // Point 1 is unconnected, connect it to point 2's region
            connectedRegions.set(point1, region2);

        } else if (region1 !== undefined && region2 !== undefined && region1 !== region2) {
            // Both are in different regions, merge them
            for (const [point, region] of connectedRegions.entries()) {
                if (region === region2) {
                    connectedRegions.set(point, region1);
                }
            }
        }
    }

    // Sum the sizes of each connected region
    const connectedRegionSizes: Map<number, number> = new Map();
    for (const region of connectedRegions.values()) {
        connectedRegionSizes.set(region, (connectedRegionSizes.get(region) || 0) + 1);
    }

    // Then sort by number of points in each region
    const sortedregionSizes = Array.from(connectedRegionSizes.keys()).sort((a, b) => {
        return connectedRegionSizes.get(b)! - connectedRegionSizes.get(a)!;
    });

    // Multiply the sizes of the three largest regions together
    var total = 1
    for (const connectedRegion of sortedregionSizes.slice(0, 3)) {
        total *= connectedRegionSizes.get(connectedRegion) || 1;
    }
    return total;
}

function parseInput(filename: string): [number, number, number][] {
    // Parse each line into a tuple of numbers
    const input = fs.readFileSync(filename, 'utf8');
    const lines = input.split(/\r?\n/);

    const points: [number, number, number][] = [];

    for (const line of lines) {
        const point: [number, number, number] = line.split(',').map(Number) as [number, number, number];
        points.push(point)
    }

    return points
}
