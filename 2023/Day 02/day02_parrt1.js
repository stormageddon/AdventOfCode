import {promises as fs} from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');
    return data.toString().split('\n');
}

const lines = await getData();

//only 12 red cubes, 13 green cubes, and 14 blue cubes

function isInvalidPull(pullDict) {
    console.log("checking " + JSON.stringify(pullDict))
    var response = parseInt(pullDict['red']) > 12 || parseInt(pullDict['green']) > 13 || parseInt(pullDict['blue']) > 14 
    console.log(response)
    return response
}

function run() {
    var validGames = []

    lines.forEach(game => {

            var gameId = game.split(": ")[0]
            game = game.split(": ")[1]
            console.log('game: ' + gameId + " -> " + game)
            var isValidGame = true
            game.split('; ').forEach(pull => {
                console.log('pull ' + pull)
                    var colorsPulled = {}
                    var entries = pull.split(', ')
                    entries.forEach(entry => {
                        colorsPulled[entry.split(' ')[1]] = entry.split(' ')[0]  
                    })
                    if (isInvalidPull(colorsPulled)) {
                        isValidGame = false
                    } 
                               
            })
            if (isValidGame) {
                console.log("adding " + gameId)
                validGames.push(gameId)
            }
    })
    
    console.log(validGames)
    console.log(validGames.reduce((total, currGame) => {
        return total + parseInt(currGame.split(' ')[1])
    }, 0))
}

run()