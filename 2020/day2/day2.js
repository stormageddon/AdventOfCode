import { promises as fs } from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');
    return data.toString().split('\n');
}

const passwords = await getData();
// let numInvalidPassword = passwords.reduce((accumulator, currValue) => {
//     console.log(accumulator);
//     return accumulator + 1
// }, 0);



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
    // let l = parseInt(charMap[letterToCheck])
    
    // console.log(`Checking ${currPassword} for ${letterToCheck} between ${minNum} and ${maxNum} => ${isValid(minNum, maxNum, l)}`)

    if (isValid(pos1, pos2, letterToCheck, password)) {
        return numInvalid + 1
    } 
    else {
        return numInvalid;
    }
}, 0);

console.log(`${numInvalidPassword} were invalid`)

// function isValid(min, max, num) {
//     console.log(`min: ${min}, max: ${max}, num: ${num}, valid: ${num >= min && num <= max}`)
//     return num >= min && num <= max;
// }

function isValid(pos1, pos2, letter, passwordStr) {
    console.log(`pos1: ${pos1}, pos2: ${pos2}, letter: ${letter}, passwordStr: ${passwordStr}`)
    return (passwordStr.charAt(pos1 - 1) == letter) != (passwordStr.charAt(pos2 - 1) == letter)
}