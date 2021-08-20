/*
Feelers-Ashley / Emoji2Caifan 
*/

let inputImgs = [];
let emojiImgs = [];
let inputCanvas, outputContainer, statusMsg;
let randomBtn, clearBtn, transferBtn;
let emojiBtns = [];

// transfer img must be multiple of 256
const SIZE = 256;

function setup() {
    // create a 256x256 canvas
    inputCanvas = createCanvas(SIZE, SIZE);
    inputCanvas.class('border-box').parent('canvasContainer');

    // load emoji / input imgs
    for (let i = 0; i < 12; i++) {
        emojiImgs[i] = loadImage('images/emojis/food' + i + '.png', clearCanvas);
    }
    for (let i = 0; i < 3; i++) {
        inputImgs[i] = loadImage('images/inputs/' + i + '.png', drawCaifan);
    }

    // selcect containers / elements
    outputContainer = select('#output');
    statusMsg = select('#status');
    randomBtn = select('#randomBtn');
    clearBtn = select('#clearBtn');
    transferBtn = select('#transferBtn');
    let btn0 = select('#btn0');
    let btn1 = select('#btn1');
    let btn2 = select('#btn2');
    let btn3 = select('#btn3');
    let btn4 = select('#btn4');
    let btn5 = select('#btn5');
    let btn6 = select('#btn6');
    let btn7 = select('#btn7');
    let btn8 = select('#btn8');
    let btn9 = select('#btn9');
    let btn10 = select('#btn10');
    let btn11 = select('#btn11');

    // add p5 elements to emoji button array
    emojiBtns.push(btn0);
    emojiBtns.push(btn1);
    emojiBtns.push(btn2);
    emojiBtns.push(btn3);
    emojiBtns.push(btn4);
    emojiBtns.push(btn5);
    emojiBtns.push(btn6);
    emojiBtns.push(btn7);
    emojiBtns.push(btn8);
    emojiBtns.push(btn9);
    emojiBtns.push(btn10);
    emojiBtns.push(btn11);

    // attach mousePressed event to buttons
    randomBtn.mousePressed(function () {
        drawImage();
    });
    clearBtn.mousePressed(function () {
        clearCanvas();
    });
    for (let i = 0; i < 12; i++) {
        emojiBtns[i].mousePressed(function () {
            drawEmoji(i);
        })
    }

    // set stroke to black
    stroke(0);
    pixelDensity(1);
}

function clearCanvas() {
    background(97, 103, 115);
    noStroke();
    ellipse(width / 2, height / 2, width);
}

function drawImage() {
    let inputImg = inputImgs[int(random(inputImgs.length))];
    inputImg.resize(SIZE, SIZE);
    image(inputImg, 0, 0);
}

function drawEmoji(foodNo) {
    let foodSize = 50;
    let foodPadL = width / 2 - 0.35 * width;
    let foodPadR = width / 2 + 0.35 * width - foodSize;
    let foodPadT = height / 2 - 0.35 * width;
    let foodPadB = height / 2 + 0.35 * width - foodSize;
    if (foodNo >= 0 && foodNo < 6) {
        image(emojiImgs[foodNo], random(foodPadL, foodPadR), random(foodPadT, foodPadB), foodSize, foodSize);
    } else {
        push();
        foodSize = 80
        image(emojiImgs[foodNo], random(foodPadL, foodPadR), random(foodPadT, foodPadB), foodSize, foodSize);
        pop();
    }
}

function drawCaifan() {
    // initialise pix2pix method with pre-trained caifan model
    ml5.pix2pix('models/caifan1000_BtoA.pict').ready.then((model) => {
        // show 'Model Loaded!' message
        statusMsg.html('Model Loaded!');

        // attach mousePressed event to the button
        transferBtn.mousePressed(function () {
            transfer(model);
        });
    })
}

async function transfer(pix2pix) {
    declareStaus = new Promise((resolve, reject) => {
        statusMsg.html('Applying Style Transfer...');
        setTimeout(resolve, 10)
    })
    await declareStaus;
    // select p5 canvas element (pix2pix requires canvas DOM element)
    const canvasElement = select('canvas').elt;

    // apply pix2pix transformation
    pix2pix.transfer(canvasElement).then((result) => {
        // clear output container
        outputContainer.html('');
        // create img from result
        createImg(result.src).class('border-box').parent('output');
        statusMsg.html('Done!');
    });
}
