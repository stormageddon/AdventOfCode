import { promises as fs } from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');
    return data.toString().split('\n');
}
const slopes = [{xDelta: 3, yDelta: 1},
    {xDelta: 1, yDelta: 1},
    {xDelta: 5, yDelta: 1},
    {xDelta: 7, yDelta: 1},
    {xDelta: 1, yDelta: 2}
]
const arr = await getData();
const numRows = arr.length - 1;
const numCols = arr[0].length
const map = arr.map((x) => x.split(""))
let totalCollisions = 1;
slopes.forEach((slope) => {
    let xPos = 0, yPos = 0;
    let numCollisions = 0;
    do {
        xPos += slope.xDelta
        if (xPos >= numCols) xPos = xPos % numCols
        yPos += slope.yDelta
        if (map[yPos][xPos] == '#') {
            numCollisions += 1
        }
        
    } while(yPos < numRows)
    console.log(numCollisions);
    totalCollisions *= numCollisions;
});
console.log(`total: ${totalCollisions}`)
