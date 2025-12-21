import { time } from 'console';
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
                freshCount++
                break
            }
        }
    }
    return freshCount
}

export function part2(filename: string): number {
    // The answer is the sum of the width of the ranges
    // But because the ranges over lap we will want to merge overlaps first
    const freshRanges = parseRanges(filename)

    const rangesByStart = freshRanges.sort((a, b) => 
        a[0] - b[0]
    )

    // Walk the ranges...
    // Keep tcurrent range in scope.
    // If the next range overlaps then expand the current range up to the next ranges end.
    // If the next range does not overlap then append the current range to merged and make the next range the current one
    // If a current range is left hanging at the end of the iteration then added it merged.
    const mergedRanges = []
    var currentRange: number[] = rangesByStart[0]
    for (let i = 1; i < rangesByStart.length; i++) {
        const range = rangesByStart[i]
        const overlaps = range[0] <= currentRange[1]
        if (overlaps) {
            // Only if this range is really wider than the current one
            if (range[1] > currentRange[1]) {
                currentRange[1] = range[1]
            }
        } else {
            mergedRanges.push(currentRange)
            currentRange = range
        }
    }
    mergedRanges.push(currentRange)

    var total = 0
    for (const range of mergedRanges) {
        const rangeLength = (range[1] - range[0]) + 1
        total += rangeLength
    }
    return total
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
    var isIngedient = false

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
