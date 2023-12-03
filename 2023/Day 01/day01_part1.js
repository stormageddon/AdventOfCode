import {promises as fs} from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');
    return data.toString().split('\n');
}

const entries = await getData();

var first_num = -1
var last_num = -1
var total = 0
var totals = []

entries.forEach(e => {
    first_num = -1
    last_num = -1
    e.split('').forEach(c => {
        if (is_num(c) && first_num == -1) {
            first_num = c
        }
    })

    e.split('').reverse().forEach(c => {
        if (is_num(c) && last_num == -1) {
            last_num = c
        }
    })

    total = first_num.concat(last_num)
    totals.push(parseInt(total))
})
console.log(totals.reduce((allTotal, t) => allTotal + t))

function is_num(c) {
    return c >= 0 && c <= 9
}
