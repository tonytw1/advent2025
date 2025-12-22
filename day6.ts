
import * as fs from 'fs';

export function part1(filename: string): number {
    const input = parseInput(filename)

    var total = 0
    // Foreach column calculate the result
    for (let c = 0; c < input[0].length; c++) {
        const numbers: number[] = []
        // Extract the numbes which are in normal left-to-right format
        for (let r = 0; r < input.length - 1; r++) {
            numbers.push(Number.parseInt(input[r][c]))
        }
        // and the operator
        const operator = input[input.length - 1][c]

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
    // Parse into an a array of array of strings

    const input = fs.readFileSync(filename, 'utf8');
    const lines = input.split(/\r?\n/);


    const rows: string[][] = []
    for (const line of lines) {
        const cells: string[] = [];
        var buffer = ""

        for (let i = 0; i < line.length; i++) {
            const c = line.charAt(i)
            if (c == " ") {
                if (buffer.length > 0) {
                    cells.push(buffer)
                    buffer = ""
                }
            } else {
                buffer = buffer + c
            }
        }
        if (buffer.length > 0) {
            cells.push(buffer)
        }
        rows.push(cells)
    }
    return rows
}