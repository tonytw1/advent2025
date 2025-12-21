import * as fs from 'fs';

export function part1(filename: string): Number {
    const map = parseInput(filename)
    const width = map[0].length
    const height = map.length

    var accessible = 0
    // Visit every node of the map
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (map[y].charAt(x) != '@') {
                continue
            }

            // Count neighbours
            var neighbours = 0;
            for (let sy = y - 1; sy <= y + 1; sy += 1) {
                for (let sx = x - 1; sx <= x + 1; sx += 1) {
                    // Ignore out of bounds 
                    if (sx < 0 || sx == width || sy < 0 || sy == height) {
                        continue
                    }
                    // Don't count ourselves
                    if (sx == x && sy == y) {
                        continue
                    }

                    if (map[sy].charAt(sx) == '@') {
                        neighbours++
                    }
                }
            }

            if (neighbours < 4) {
                accessible++
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