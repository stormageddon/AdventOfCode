import { promises as fs } from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');
    return data.toString().split('\n');
}

const boardingPasses = await getData();

let calculatedSeats = boardingPasses.map(getAssignment).filter((elem) => elem);
let highestId = calculatedSeats.reduce((seat, currHighest) => { return (seat.id > currHighest.id) ? seat : currHighest }, 0).id
console.log(calculatedSeats)
console.log(`Highest id: ${highestId}`)

let sortedSeats = calculatedSeats.map((x) => x.id).sort()

for (let i = 0; i < sortedSeats.length; i++) {
    if (sortedSeats[i + 1] && (sortedSeats[i + 1] - sortedSeats[i] > 1)) {
        console.log(`seat id ${sortedSeats[i] + 1}`)
    }
}

function getAssignment(boardingPass) {
    if (boardingPass.length != 10) return
    const row = binarySearch(boardingPass.split("", 7))
    const col = binarySearch(boardingPass.split("").slice(7), 0, 8)
    const id = row * 8 + col
    return {row: row, col: col, id: id, boardingPass: boardingPass}
}

function binarySearch(boardingPass, minRow = 0, maxRow = 127) { 
    if (boardingPass.length <= 0) {
        return minRow;
    }

    let remaining = maxRow - minRow
    let operator = boardingPass.shift();
    return (operator == 'F' || operator == 'L') ?  binarySearch(boardingPass, minRow, maxRow - Math.floor(remaining / 2)) : binarySearch(boardingPass, minRow + Math.ceil(remaining / 2), maxRow)
}
