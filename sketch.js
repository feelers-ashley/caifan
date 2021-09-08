/*
Feelers-Ashley / Emoji2Caifan 
*/

let inputImgs = [];
let foodImgs = [];
let inputCanvas, outputContainer, statusMsg;
let randomBtn, clearBtn, transferBtn;
let emojiBtns = [];

// transfer img must be multiple of 256
const SIZE = 512;

function setup() {
    // create a 256x256 canvas
    inputCanvas = createCanvas(SIZE, SIZE);
    inputCanvas.class('border-box').parent('canvasContainer');

    // load food / input imgs
    for (let i = 0; i < 11; i++) {
        foodImgs[i] = [];
        if (i == 0) {
            for (let j = 0; j < 3; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }
        } else if (i == 1) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }

        } else if (i == 2) {
            for (let j = 0; j < 2; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }

        } else if (i == 3) {
            for (let j = 0; j < 3; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }

        } else if (i == 4) {
            for (let j = 0; j < 3; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }

        } else if (i == 5) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }

        } else if (i == 6) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }

        } else if (i == 7) {
            for (let j = 0; j < 5; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }

        } else if (i == 8) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }

        } else if (i == 9) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage('images/foods/food' + i + '-' + j + '.png');
            }

        } else if (i == 10) {
            foodImgs[i] = loadImage('images/foods/food' + i + '.png', clearCanvas);
        }
    }
    for (let i = 0; i < 9; i++) {
        inputImgs[i] = loadImage('images/inputs/input' + i + '.png', drawCaifan);
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

    // attach mousePressed event to buttons
    randomBtn.mousePressed(function () {
        drawImage();
    });
    clearBtn.mousePressed(function () {
        clearCanvas();
    });
    for (let i = 0; i < 10; i++) {
        emojiBtns[i].mousePressed(function () {
            drawFood(i);
        })
    }

    // set stroke to black
    stroke(0);
    pixelDensity(1);
}

function clearCanvas() {
    background(97, 103, 115);
    randomSeed(216);
    push();
    noStroke();
    ellipse(width / 2, height / 2, width);
    imageMode(CENTER);
    translate(0.55 * width, 0.7 * height);
    let riceImg = foodImgs[10];
    riceImg.resize(0.6 * SIZE, 0.6 * SIZE);
    image(riceImg, 0, 0);
    pop();
}

function drawImage() {
    let inputImg = inputImgs[int(random(inputImgs.length))];
    inputImg.resize(SIZE, SIZE);
    image(inputImg, 0, 0);
}

function drawFood(foodNo) {
    push();
    let foodVer = foodImgs[foodNo][int(random(foodImgs[foodNo].length))];
    let foodSize = 0.4 * SIZE;
    foodVer.resize(foodSize, foodSize)
    let foodPadL = width / 2 - 0.50 * width + foodSize / 2;
    let foodPadR = width / 2 + 0.50 * width - foodSize / 2;
    let foodPadT = height / 2 - 0.50 * width + foodSize / 2;
    let foodPadB = height / 2 + 0.35 * width - foodSize / 2;
    let foodX = random(foodPadL, foodPadR);
    let foodY = random(foodPadT, foodPadB);
    translate(foodX, foodY);
    imageMode(CENTER);
    push();
    rotate(random(0, PI))
    image(foodVer, 0, 0);
    pop();
    pop();
}

function drawCaifan() {
    // initialise pix2pix method with pre-trained caifan model
    ml5.pix2pix('models/caifan512.pict').ready.then((model) => {
        // show 'Model Loaded!' message
        statusMsg.html("click [cook] when you're <br/> happy with your caifan");

        // attach mousePressed event to the button
        transferBtn.mousePressed(function () {
            let resized = createGraphics(512,512);
            resized.image(inputCanvas, 0,0,512,512);
            resized.loadPixels();
            image(resized, 0,0);
            transfer(model);
            return false;
        });
    })
}

async function transfer(pix2pix) {
    declareStaus = new Promise((resolve, reject) => {
        statusMsg.html('... cooking your caifan ... <br/> ... please wait ...');
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
        createImg(result.src).size(512,512).class('border-box').parent('output');
        statusMsg.html('~ done ~ <br/> click [clear] to build a new caifan <br/> click [random] for a random caifan');    
    });
    
    statusMsg.html('');
}