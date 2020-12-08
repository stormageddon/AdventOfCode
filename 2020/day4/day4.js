import { promises as fs } from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');
    return data.toString().split('\n');
}

const passports = await getData();
let formattedPassportData = getFormattedPassportData(passports)
const numValid = formattedPassportData.reduce((numValid, passportData) => {
    return isValid(passportData) ? numValid + 1 : numValid
}, 0)

console.log('num valid: ' + numValid)

function isValid(passport) {
    return validateHeight(passport)
    && validateBirthYear(passport)
    && validateExpirationYear(passport)
    && validateHairColor(passport)
    && validatePassportId(passport)
    && validateIssueYear(passport)
    && validateEyeColor(passport)
}

function validateEyeColor(passport) {
    const ecl = getElem("ecl", passport)
    if (!ecl) return false
    return ['amb' ,'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)
}

function validateIssueYear(passport) {
    const iyr = getElem("iyr", passport)
    if (!iyr) return false
    const regex = RegExp('^[0-9]{4}$')
    return regex.test(iyr) && parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020
}

function validatePassportId(passport) {
    const pid = getElem("pid", passport)
    if (!pid) return false
    const regex = RegExp('^[0-9]{9}$')
    return regex.test(pid)
}

function validateHairColor(passport) {
    const hcl = getElem("hcl", passport)
    if (!hcl) return false
    const regex = RegExp('^\#[0-9a-f]{6}$')
    return regex.test(hcl)
}

function validateExpirationYear(passport) {
    const ey = getElem("eyr", passport)
    if (!ey) return false
    const regex = RegExp('^[0-9]{4}$');
    return regex.test(ey) && parseInt(ey) >= 2020 && parseInt(ey) <= 2030
}

function validateBirthYear(passport) {
    const by = getElem("byr", passport)
    if (!by) return false
    const regex = RegExp('^[0-9]{4}$');
    return regex.test(by) && parseInt(by) >= 1920 && parseInt(by) <= 2002
}

function validateHeight(passport) {
    let height = getElem("hgt", passport)
    if (!height) return false
    const regex = RegExp('[0-9]*(cm|in)$')
    if (!regex.test(height)) return false
    if (height.includes('cm')) {
        let h = parseInt(height.slice(0,-2))
        return h >= 150 && h <= 193
    }
    else if (height.includes('in')) {
        let h = parseInt(height.slice(0,-2))
        return h >= 59 && h <= 76
    }
    else {
        return false
    }
}

function getElem(elemId, str) {
    if (!str) return false
    let x = str.split(" ").find( (elem) => elem.includes(elemId))
    return (x) ? x.split(":")[1] : null;
}

function getFormattedPassportData(data) {
    let formattedPassports = []
    let currPassport = ""
    data.forEach((line) => {
        if (line.includes(':')) {
            currPassport += ` ${line}`
        }
        else {
            // new line
            formattedPassports.push(currPassport)
            currPassport = ""
        }
    })
    if (currPassport.length > 0) formattedPassports.push(currPassport)
    return formattedPassports
}