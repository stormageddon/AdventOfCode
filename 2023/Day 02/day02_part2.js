import {promises as fs} from 'fs';

async function getData() {
    const data = await fs.readFile('input.txt', 'utf-8');
    return data.toString().split('\n');
}

const lines = await getData();

//only 12 red cubes, 13 green cubes, and 14 blue cubes

function setColorsPulled(color, value, colorsPulledDict) {
    colorsPulledDict[color] = Math.max(parseInt(colorsPulledDict[color]), value)
    return colorsPulledDict
}



function run() {
    var totalPower = 0

    lines.forEach(game => {

            var gameId = game.split(": ")[0]
            game = game.split(": ")[1]
            //console.log('game: ' + gameId + " -> " + game)
            var isValidGame = true
            var colorsPulled = {
                'red': -1,
                'green': -1,
                'blue': -1
            }
            game.split('; ').forEach(pull => {
             //   console.log('pull ' + pull)
                    
                    var entries = pull.split(', ')
                    entries.forEach(entry => {
                        var color = entry.split(' ')[1]
                        var value = entry.split(' ')[0]
                        colorsPulled = setColorsPulled(color, value, colorsPulled)  
                    })
                    
                               
            })
            console.log('min pulled: ' + JSON.stringify(colorsPulled))
            var powered = colorsPulled['red'] * colorsPulled['green'] * colorsPulled['blue']
            console.log('powered ' + powered)
            totalPower += powered
    })
    console.log("total power: " + totalPower)
    
    //console.log(validGames)
    ///console.log(validGames.reduce((total, currGame) => {
        //return total + parseInt(currGame.split(' ')[1])
    //}, 0))
}

run()