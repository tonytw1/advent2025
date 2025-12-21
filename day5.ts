import * as fs from 'fs';

export function part1(filename: string): number {
    // The ranges overlap so there is probably a gain from merging overlaps
    // but given the small number it does not seem material
    // Likewise sorting the ranges
    const freshRanges = parseRanges(filename)
    const ingredients = parseIngedients(filename)

    var freshCount = 0
    for (const ingredient of ingredients) {
        // Foreach ingredient brute force the ranges looking for a fit
        for (const freshRange of freshRanges) {
            if (ingredient >= freshRange[0] && ingredient <= freshRange[1]) {
                freshCount ++
                break
            }
        }
    }
    return freshCount
}

function parseRanges(filename: string): number[][] {
    const ranges: number[][] = []
    const input = fs.readFileSync(filename, 'utf8');
    const lines = input.split(/\r?\n/);

    for (const line of lines) {
        if (line == "") {
            return ranges;
        }
        const splits = line.split("-")
        ranges.push([Number.parseInt(splits[0]), Number.parseInt(splits[1])])
    }
    return ranges;
}

function parseIngedients(filename: string): number[] {
    const ingredients: number[] = []
    const input = fs.readFileSync(filename, 'utf8');
    const lines = input.split(/\r?\n/);
    var         isIngedient = false

    for (const line of lines) {
        if (isIngedient) {
            ingredients.push(Number.parseInt(line))
        }
        if (line == "") {
            isIngedient = true
        }
    }

    return ingredients
}
