import { promises as fs } from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');

    return data.toString().replace(/\n\r/g, "\n")
    .replace(/\r/g, "\n")
    .split(/\n{2,}/g)
    .map((str) => str.replace(/\n/g, ""))
}

console.log((await getData()).map((_) => {return [...new Set(_.split(""))].length}).reduce((p, c) => { return p + c }))