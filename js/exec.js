import {drawSymbolTemplates} from "./draw.js";

function lettersToNumbers(letters) {
            
    let numbers = [];
    const letterValues = new Map([
        ["a", 1],
        ["b", 2],
        ["c", 3],
        ["d", 4],
        ["e", 5],
        ["f", 6],
        ["g", 7],
        ["h", 8],
        ["i", 9],
        ["j", 10],
        ["k", 11],
        ["l", 12],
        ["m", 13],
        ["n", 14],
        ["o", 15],
        ["p", 16],
        ["q", 17],
        ["r", 18],
        ["s", 19],
        ["t", 20],
        ["u", 21],
        ["v", 22],
        ["w", 23],
        ["x", 24],
        ["y", 25],
        ["z", 26],
        ["ch", 27],
        ["ä", 28],
        ["ß", 29],
        ["sch", 30],
        ["ö", 31],
        ["ü", 32],
        [" ", 33],
      ]);
    for (let i = 0; i < letters.length; i++){
        //TODO: implement ch (27) and sch (30)
        let syllable = letters[i].split("");
        let syllableNumbers = [];
        for (let j = 0; j < syllable.length; j++) {
            let letter = letters[i][j].toLowerCase();
            if (letterValues.has(letter)) {
                syllableNumbers.push(letterValues.get(letter));
            }
        }
        //add the syllable numbers to the numbers array
        numbers.push(syllableNumbers);

    }
    return numbers;

}
function numbersToSymbolTemplates(numbers) {
    let symbolTemplates = [];
    for (let i = 0; i < numbers.length; i++) {
        let symbolTemplate = {groupedNumbers: [], groupcount: 1};
        //check if the current symbol is empty (33)
        if (numbers[i][0] === 33) {
            symbolTemplate.groupcount = 0;
            symbolTemplate.groupedNumbers.push([33]);
            symbolTemplates.push(symbolTemplate);
            continue;
        }
        symbolTemplate.groupedNumbers.push([numbers[i][0]]);
        for (let j = 1; j < numbers[i].length; j++) {
            //group the numbers by tens
            if(Math.floor(numbers[i][j] / 10) === Math.floor(numbers[i][j - 1] / 10) && symbolTemplate.groupedNumbers[symbolTemplate.groupcount - 1].length < 3) {
                symbolTemplate.groupedNumbers[symbolTemplate.groupcount - 1].push(numbers[i][j]);
            } else {
                symbolTemplate.groupedNumbers.push([numbers[i][j]]);
                symbolTemplate.groupcount++;
            }
        }
        if (symbolTemplate.groupcount <= 2){ 
            symbolTemplate.groupcount = 2;
        } else {
            symbolTemplate.groupcount = 4;
        }
        symbolTemplates.push(symbolTemplate);
    }
    return symbolTemplates;
}
function translateStringToSymbols(string) {
    //split string at dashes
    var words = string.split(" ");
    let syllables = [];
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        //split word at dashes
        word = word.split("-");
        //create a new array for the syllables

        for(let j = 0; j < word.length; j++) {
            let syllable = word[j];
            //split syllable at slashes
            syllables.push(syllable);
        }
        if (i < words.length - 1) {
            //add a space between words if multiple words exist
            syllables.push(" ");
        }
    }
    //remove empty syllables
    syllables = syllables.filter(syllable => syllable !== "");

    let numbers = lettersToNumbers(syllables)
    let  symbolTemplates = numbersToSymbolTemplates(numbers);
    console.log(symbolTemplates);
    return symbolTemplates;

}


var c = document.getElementById("canvas");
var ctx = c.getContext("2d");

var canvasWidth = c.width;
var canvasHeight = c.height;
var canvasCenterX = canvasWidth / 2;
var canvasCenterY = canvasHeight / 2;

//constantly get the content of the text textbox and draw it on the canvas
var textBox = document.getElementById("text");
textBox.oninput = function() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.rect(0,0 , canvasWidth, canvasHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    let symbolTemplates = translateStringToSymbols(textBox.value)
    drawSymbolTemplates(symbolTemplates, ctx);
}
