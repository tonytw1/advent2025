import * as fs from 'fs';

export function part1(filename: string): Number {
    const map = parseInput(filename)
    return accessibleFrom(map, new Set<string>()).length;
}

export function part2(filename: string): Number {
    const map = parseInput(filename)

    // Rather than mutate the input, keep a record of known removed rolls
    var removedRolls = new Set<string>()
    var accessibleRolls: number[][] = accessibleFrom(map, removedRolls);
    while (accessibleRolls.length > 0) {
        // Remove the accessible rolls and them re-evaluate
        for (let i = 0; i < accessibleRolls.length; i++) {
            const roll = accessibleRolls[i]
            removedRolls.add(roll[0] + "," + roll[1])
        }
        accessibleRolls = accessibleFrom(map, removedRolls)
    }

    return removedRolls.size
}


function accessibleFrom(map: string[], removed: Set<string>): number[][] {

    function isRemoved(x: number, y: number): boolean {
       const key = x + "," + y;  // TODO number tuples not working with Set because compare is by reference not value
    return  removed.has(key);
    }


    const width = map[0].length;
    const height = map.length;
    var accessible: number[][] = [];
    // Visit every node of the map
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (map[y].charAt(x) != '@') {
                continue
            }
            // Ignore previously removed
            if (isRemoved(x, y)) {              
                continue
            }
            
            // Count neighbours
            var neighbours = 0;
            for (let sy = y - 1; sy <= y + 1; sy += 1) {
                for (let sx = x - 1; sx <= x + 1; sx += 1) {
                    // Ignore out of bounds 
                    if (sx < 0 || sx == width || sy < 0 || sy == height) {
                        continue;
                    }
                    // Don't count ourselves
                    if (sx == x && sy == y) {
                        continue;
                    }

                    if (map[sy].charAt(sx) == '@') {
                        if (!isRemoved(sx, sy)) {
                            neighbours++;
                        }
                    }
                }
            }

            if (neighbours < 4) {
                accessible.push([x, y]);

            }

        }
    }

    return accessible;
}

function parseInput(filename: string): string[] {
    const map: string[] = [];
    const input = fs.readFileSync(filename, 'utf8');
    const lines = input.split(/\r?\n/);
    for (const line of lines) {
        map.push(line);
    }
    return map;
}