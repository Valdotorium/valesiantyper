function strokeSymbol(id, x, y, scaleX, scaleY, canvas) {
    //scaleY is in pixels
    //scaleX is a multiplier
    if (id==0){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x, y + scaleY/2.25);
        canvas.lineTo(x - 18 * scaleX, y + scaleY / 2.25);
        canvas.lineTo(x - 18 * scaleX, y - scaleY / 2.25);
        canvas.lineTo(x, y - scaleY / 2.25);
        canvas.stroke();
    }
    if (id==1){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x, y);
        canvas.lineTo(x - 12 * scaleX, y);
        canvas.stroke();
    } 
    if (id==2){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x - 6 * scaleX, y + scaleY / 2.5);
        canvas.lineTo(x - 5 * scaleX, y - scaleY / 2.5);
        canvas.lineTo(x - 18 * scaleX, y + scaleY / 3);
        canvas.stroke();
    }
    if (id==3){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x - 4 * scaleX, y + scaleY / 3)
        canvas.lineTo(x - 22 * scaleX, y + scaleY / 3);
        canvas.lineTo(x - 18 * scaleX, y - scaleY / 3);
        canvas.stroke();
    }
    if (id==4){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x - 4 * scaleX, y - scaleY / 3)
        canvas.lineTo(x - 22 * scaleX, y - scaleY / 3);
        canvas.lineTo(x - 18 * scaleX, y + scaleY / 3);
        canvas.stroke();
    }
    if (id==5){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x - 22 * scaleX, y + scaleY / 2);
        canvas.lineTo(x - 22 * scaleX, y + scaleY / 2);
        canvas.lineTo(x - 21 * scaleX, y - scaleY / 2);
        canvas.moveTo(x, y)
        canvas.lineTo(x - 22 * scaleX,y);
        canvas.stroke();
    }
    if (id==6){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x - 6 * scaleX, y + scaleY / 3);
        canvas.lineTo(x - 14 * scaleX, y - scaleY / 3);
        canvas.stroke();
    }
    if (id==7){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x - 6 * scaleX, y - scaleY / 3);
        canvas.lineTo(x - 14 * scaleX, y + scaleY / 3);
        canvas.stroke();
    }
    if (id==8){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x , y - (scaleY / 4) * scaleX);
        canvas.lineTo(x - 18 * scaleX, y + (scaleY / 4) * scaleX);
        canvas.stroke();
    }
    if (id==9){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x , y + (scaleY / 4) * scaleX);
        canvas.lineTo(x - 18 * scaleX, y - (scaleY / 3) * scaleX);
        canvas.stroke();
    }

}

function strokeTenSymbol(id, x, y, scaleX, scaleY, canvas) {
    if(id < 3){
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x, y);
        canvas.lineTo(x + 28 * scaleX, y);
        canvas.stroke();
    }

    if (id == 2) {
        //add a short vertical line at the end of the already existing one
        canvas.lineWidth = 4
        canvas.beginPath();
        canvas.moveTo(x + 2 * scaleX, y);
        canvas.lineTo(x + 1 * scaleX, y + 8 * scaleY);
        canvas.stroke();
    }
    if (id == 3) {
        
        canvas.moveTo(x+2, y);
        canvas.lineTo(x, y + 30 * scaleY);
        canvas.stroke();
        canvas.lineTo(x + 27 * scaleX, y + 30 * scaleY);
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
        console.log("tens for symbol: " + symbolTemplate.groupedNumbers);
        let ten;
        try{
            ten = Math.floor(groupedNumbers[i][0]/10);
        } catch {
            ten = Math.floor(groupedNumbers[i]/10);
        }

        

        let xOffset = strokePositions[i].xOffset;
        let yOffset = strokePositions[i].yOffset;
        let startX = x + xOffset;
        let startY = y + yOffset;

        if (ten == 0 || groupcount == 0) {
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
    // the y position of the symbols
    let strokeHeights = [];
    // the side that the symbols are drawn on
    let strokeDirections = [];
    // the symbols that are drawn
    let symbols = [];
    //the scaling of the symbols on the y axis
    let symbolScales = [];

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
                symbolScales.push(7+Math.floor(9/group.length));
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
                    strokeHeights.push(50);
                    strokeHeights.push(40);
                }
                if (group.length == 3){
                    strokeHeights.push(54);
                    strokeHeights.push(45);
                    strokeHeights.push(36);
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
                symbolScales.push(5+Math.floor(7/group.length));
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

    //draw the symbols
    for (let i = 0; i < symbols.length; i++) {
        let id = symbols[i];
        let scaleY = symbolScales[i];
        let symbolCenterX = x + width / 2;
        let symbolCenterY = y + strokeHeights[i];
        strokeSymbol(id, symbolCenterX, symbolCenterY, strokeDirections[i], scaleY, canvas);
    }
}

export function drawSymbolTemplates(symbolTemplates, ctx,y){
    var canvas = document.getElementById('canvas');
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let symbolWidth = 50;
    let symbolHeight = 60;

    let currentX = canvasWidth / 2 - symbolTemplates.length * symbolWidth / 2;
    let currentY = y;

    //draw the symbol templates on the canvas
    for (let i = 0; i < symbolTemplates.length; i++) {
        let symbolTemplate = symbolTemplates[i];
        //draw the center line if the symbol is a letter
        if(symbolTemplate.groupedNumbers[0][0] != 33){
            ctx.lineWidth = 5
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo(currentX + symbolWidth / 2 + 2, currentY);
            ctx.lineTo(currentX + symbolWidth / 2 - 2 currentY + symbolHeight);
            ctx.stroke();
        }

        strokeTens(symbolTemplate, ctx, currentX, currentY, symbolWidth, symbolHeight);
        strokeOnes(symbolTemplate, ctx, currentX, currentY, symbolWidth, symbolHeight);

        //move to next symbol
        if(symbolTemplate.groupedNumbers.length == 1){
            currentX += symbolWidth / 2 + 5;
        } else {
            currentX += symbolWidth + 5;
        }

    }
}
