function strokeTenSymbol(id, x, y, scaleX, scaleY, canvas) {
    if(id < 3){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x, y);
        canvas.lineTo(x + 32 * scaleX, y);
        canvas.stroke();
    }

    if (id == 2) {
        //add a short vertical line at the end of the already existing one
        canvas.lineWidth = 4
        canvas.moveTo(x + 2 * scaleX, y);
        canvas.lineTo(x + 2 * scaleX, y + 8 * scaleY);
        canvas.stroke();
    }
    if (id == 3) {
        
        canvas.moveTo(x, y);
        canvas.lineTo(x, y + 30 * scaleY);
        canvas.stroke();
        canvas.lineTo(x + 32 * scaleX, y + 30 * scaleY);
        canvas.stroke();
    }
}

function strokeTens(symbolTemplate, canvas, x, y, width, height) {
    let groupcount = symbolTemplate.groupcount;
    let groupedNumbers = symbolTemplate.groupedNumbers;
    let strokePositions = [];
    if (groupcount === 0) {
        return;
    }
    if (groupcount == 2){
        strokePositions = [{xOffset: 0, yOffset: 0}, {xOffset: width, yOffset: 0}];
    }
    if (groupcount == 4){
        strokePositions = [{xOffset: 0, yOffset: height / 2}, {xOffset: width, yOffset: height / 2}, {xOffset: 0, yOffset: 0}, {xOffset: width, yOffset: 0}];
    }
    for (let i = 0; i < strokePositions.length; i++) {
        let ten = Math.floor(groupedNumbers[i]/10);

        let xOffset = strokePositions[i].xOffset;
        let yOffset = strokePositions[i].yOffset;
        let startX = x + xOffset;
        let startY = y + yOffset;

        if (ten == 0 || groupedNumbers[i] > 32 || groupedNumbers[i] == undefined) {
            continue
        } else {
            if(i%2 == 0){
                //draw symbol on the left
                if (groupcount == 2){
                    strokeTenSymbol(ten, startX, startY, 1, 2, canvas);
                } else {
                    strokeTenSymbol(ten, startX, startY, 1, 1, canvas);
                }

            } else {
                //draw symbol on the right
                if (groupcount == 2){
                    strokeTenSymbol(ten, startX, startY, -1, 2, canvas);
                } else {
                    strokeTenSymbol(ten, startX, startY, -1, 1, canvas);
                }
            }
        } 
    }
}

function strokeOnes(symbolTemplate, canvas, x, y, width, height) {
    let groupcount = symbolTemplate.groupcount;
    let groupedNumbers = symbolTemplate.groupedNumbers;
    let strokeHeights = [];
    let strokeDirections = [];
    let symbols = [];

    if (groupcount === 0) {
        return;
    }
    //distribute the letters on the y axis
    if (groupcount == 2){
        for (let i = 0; i < groupedNumbers.length; i++){
            let group = groupedNumbers[i];
            console.log(group);
            if (group.length == 1){
                strokeHeights.push(30);
            }
            if (group.length == 2){
                strokeHeights.push(40);
                strokeHeights.push(20);
            }
            if (group.length == 3){
                strokeHeights.push(50);
                strokeHeights.push(30);
                strokeHeights.push(10);
            }
            for(let j = 0; j < group.length; j++){
                let symbol = group[j] % 10;
                symbols.push(symbol);
            }
        }
    }
    if (groupcount == 4){
        for (let i = 0; i < groupedNumbers.length; i++){
            let group = groupedNumbers[i];
            if(i < 2){
                if (group.length == 1){
                    strokeHeights.push(45);
                }
                if (group.length == 2){
                    strokeHeights.push(40);
                    strokeHeights.push(50);
                }
                if (group.length == 3){
                    strokeHeights.push(55);
                    strokeHeights.push(45);
                    strokeHeights.push(55);
                }

            } else {
                if (group.length == 1){
                    strokeHeights.push(15);
                }
                if (group.length == 2){
                    strokeHeights.push(20);
                    strokeHeights.push(10);
                }
                if (group.length == 3){
                    strokeHeights.push(25);
                    strokeHeights.push(15);
                    strokeHeights.push(5);
                }
            } 
            for(let j = 0; j < group.length; j++){
                let symbol = group[j] % 10;
                symbols.push(symbol);
            }
        }
    }
    //set the directions
    for(let i = 0; i < groupedNumbers.length; i++){
        let dir
        if (i % 2 == 0){
            dir = 1
        } else {
            dir = -1
        }
        for (let j = 0; j < groupedNumbers[i].length; j++){
            strokeDirections.push(dir)
        }
    }

    //log
    console.log("heights" , strokeHeights)
    console.log("dirs", strokeDirections)
    console.log("symbols", symbols)
}

export function drawSymbolTemplates(symbolTemplates, canvas){
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let currentX = 10
    let currentY = 10
    let symbolWidth = 60;
    let symbolHeight = 60;
    //clear the canvas
    canvas.fillStyle = "white";
    canvas.clearRect(0, 0, canvasWidth, canvasHeight);
    //draw the symbol templates on the canvas
    for (let i = 0; i < symbolTemplates.length; i++) {
        let symbolTemplate = symbolTemplates[i];
        //draw the center line if the symbol is a letter
        if(symbolTemplate.groupedNumbers[0][0] != 33){
            canvas.lineWidth = 5
            canvas.beginPath();
            canvas.strokeStyle = "black";
            canvas.moveTo(currentX + symbolWidth / 2, currentY);
            canvas.lineTo(currentX + symbolWidth / 2, currentY + symbolHeight);
            canvas.stroke();
        }

        strokeTens(symbolTemplate, canvas, currentX, currentY, symbolWidth, symbolHeight);
        strokeOnes(symbolTemplate, canvas, currentX, currentY, symbolWidth, symbolHeight);

        //move to next symbol
        currentX += symbolWidth + 5;

    }
}