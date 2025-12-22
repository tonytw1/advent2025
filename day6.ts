
import * as fs from 'fs';

export function part1(filename: string): number {
    const columns = parseInput(filename)

    var total = 0
    // Foreach column calculate the result
    for (const column of columns) {
        const numbers: number[] = []
        // Extract the numbes which are in normal left-to-right format
        for (let r = 0; r < column.length - 1; r++) {
            numbers.push(Number.parseInt(column[r].trim()))
        }
        // and the operator
        const operator = column[column.length - 1].trim()
        total += valueOfColumn(operator, numbers)
    }

    return total
}

export function part2(filename: string): number {
    const columns = parseInput(filename)

    var total = 0
    // Foreach column calculate the result
    for (const column of columns) {
        // Extract the numbes which are column descending left to right format.
        // Iterate across the vertical slots in the column.
        // We need the width of the larges row todo this
        var width = 0
        for (let r = 0; r < column.length - 1; r++) {
            const cell = column[r]
            if (cell.length > width) {
                width = cell.length
            }
        }

        const numbers: number[] = []

        // Scan the vertical slots to build the numbers
        for (let w = 0; w < width; w++) {
            var number = ""
            for (let r = 0; r < column.length - 1; r++) {
                const cell = column[r]
                if (cell.length > w) {
                    const c = cell.charAt(w)
                    number = number + c
                }
            }
            numbers.push(Number.parseInt(number))
        }
        const operator = column[column.length - 1].trim()
        total += valueOfColumn(operator, numbers)
    }

    return total
}

function valueOfColumn(operator: string, numbers: number[]) {
    var columnValue = 0;
    if (operator == '*') {
        columnValue = 1;
    }

    for (const number of numbers) {
        if (operator == '*') {
            columnValue *= number;
        } else {
            columnValue += number;
        }
    }
    return columnValue;
}

function parseInput(filename: string) {
    // Read each line spliting by white space
    // Parse into an a array of columns of rows
    const columns: string[][] = []

    const input = fs.readFileSync(filename, 'utf8');
    const lines = input.split(/\r?\n/);

    // Part 2 requires the white space within columns to be preserved!
    // Therefore we need to scan for the further most right seperator which slicing off columns

    // The max width is required to deal with the termination of the last column
    var maxLineWidth = -1
    for (const line of lines) {
        if (line.length > maxLineWidth) {
            maxLineWidth = line.length
        }
    }

    // Moving column slicing window until we reach max width of the lines
    var cut = 0;
    var newCut = 0;
    while (cut < maxLineWidth) {
        // Check each line for the max index of the separator
        // Use this to determine the right most cut for this column
        for (const line of lines) {
            const remainingLine = line.slice(cut, maxLineWidth);
            var indexOfNextColumnBreakOnThisLine = remainingLine.indexOf(" ");
            if (indexOfNextColumnBreakOnThisLine < 0) {
                indexOfNextColumnBreakOnThisLine = remainingLine.length
            }
            var s = indexOfNextColumnBreakOnThisLine + cut
            if (s > newCut) {
                newCut = s
            }
        }

        // Foreach row, slice off the column
        const column: string[] = []
        for (const line of lines) {
            column.push(line.slice(cut, newCut))
        }

        columns.push(column)
        cut = newCut + 1;
    }
    return columns
}