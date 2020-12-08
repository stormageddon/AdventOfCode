import {promises as fs} from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');
    return data.toString().split('\n');
}

const entries = await getData();

while (entries.length > 0) {
    let x = entries.shift();
    entries.forEach((y) => {
        entries.forEach((z) => {
            if (parseInt(x) + parseInt(y) + parseInt(z) == 2020) console.log(`${x} * ${y} * ${z} == ${parseInt(x) * parseInt(y) * parseInt(z)}`)
        });
    });
}