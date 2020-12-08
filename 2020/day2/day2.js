import { promises as fs } from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');
    return data.toString().split('\n');
}

const passwords = await getData();

let numInvalidPassword = passwords.reduce((numInvalid, currPassword) => {
    let x = currPassword.split(":")[0]
    let password = currPassword.split(":")[1].slice(1)
    let letterToCheck = x[x.length - 1]
    
    let pos1 = parseInt(x.split('-')[0])
    let pos2 = parseInt(x.split('-')[1])

    let charMap = {}
    password.split("").forEach((char) => {
        !charMap[char] ? charMap[char] = 1 : charMap[char] += 1
    });

    if (isValid(pos1, pos2, letterToCheck, password)) {
        return numInvalid + 1
    } 
    else {
        return numInvalid;
    }
}, 0);

console.log(`${numInvalidPassword} were invalid`)

function isValid(pos1, pos2, letter, passwordStr) {
    console.log(`pos1: ${pos1}, pos2: ${pos2}, letter: ${letter}, passwordStr: ${passwordStr}`)
    return (passwordStr.charAt(pos1 - 1) == letter) != (passwordStr.charAt(pos2 - 1) == letter)
}