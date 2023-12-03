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
var cons_letters = ""

function run() {
    entries.forEach(e => {
        first_num = -1
        last_num = -1
        cons_letters = ""
        e.split('').forEach(c => {
            if (is_num(c)) {
                if ( first_num == -1)
                    first_num = c
            }
            else {
                cons_letters += c
                var n = tryGetNumFromStr(cons_letters)
                if (n != -1 ) {
                    if (first_num == -1)
                        first_num = n
                    cons_letters = ""
                }
            }
        })
    
        e.split('').reverse().forEach(c => {
            if (is_num(c)) {
                if ( last_num == -1)
                    last_num = c
            }
            else {
                cons_letters = c + cons_letters
                var n = tryGetNumFromStr(cons_letters)
                if (n != -1) {
                    if (last_num == -1) {
                        last_num = n
                    }
                    cons_letters = ""
                }
            }
        })
        total = first_num.concat(last_num)
        totals.push(parseInt(total))
    })
    
    console.log(totals.reduce((allTotal, t) => allTotal + t))
}


function is_num(c) {
    return c >= 0 && c <= 9 
}

function tryGetNumFromStr(str) {
    const numLookup = {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9'
    }

    var maybeNum
    for (const [key, value] of Object.entries(numLookup)) {
        var v = str.includes(key)
        if (v) {
            maybeNum = value
        }
    }

    if (maybeNum) {
        return maybeNum
    }
    else return -1
 }

run()
