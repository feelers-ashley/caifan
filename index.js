/* ===
~ Build-A-Caifan ~
A project by Feelers.
https://feelers-feelers.com/
This uses a pre-trained model on 100 caifan images from @caipng2.50.
https://www.instagram.com/caipng2.50/

Build-A-Caifan is an imaginary online caifan stall which digitally replicates the experience of picking out dishes at a stall through clicking on food emojis. The dishes selected are reflected real-time as illustrations on a plate before being digitally "cooked" using machine learning to present a final realistic-looking piping hot plate of ready to eat caifan.
=== */

let inputImgs = [];
let foodImgs = [];
let inputCanvas, outputContainer, statusMsg;
let randomBtn, clearBtn, transferBtn;
let emojiBtns = [];

const SIZE = 512;

function setup() {
    inputCanvas = createCanvas(SIZE, SIZE);
    inputCanvas.class('border-box').parent('canvasContainer');

    ////////// LOAD FOOD + INPUT IMAGES //////////
    for (let i = 0; i < 11; i++) {
        let fpath = 'caifan-assets/images/foods/food';
        foodImgs[i] = [];
        if (i == 0) {
            for (let j = 0; j < 3; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 1) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 2) {
            for (let j = 0; j < 2; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 3) {
            for (let j = 0; j < 3; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 4) {
            for (let j = 0; j < 3; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 5) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 6) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 7) {
            for (let j = 0; j < 5; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 8) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 9) {
            for (let j = 0; j < 4; j++) {
                foodImgs[i][j] = loadImage(fpath + i + '-' + j + '.png');
            }
        } else if (i == 10) {
            foodImgs[i] = loadImage(fpath + i + '.png', clearCanvas);
        }
    }

    for (let i = 0; i < 9; i++) {
        let ipath = 'caifan-assets/images/inputs/input';
        inputImgs[i] = loadImage(ipath + i + '.png', drawCaifan);
    }

    ////////// ASSIGN CONTAINERS + BUTTONS //////////
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

    stroke(0);
    pixelDensity(1);
}

////////// DRAW RESET EMPTY PLATE //////////
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

////////// DRAW RANDOM CAIFAN PLATES //////////
function drawImage() {
    let inputImg = inputImgs[int(random(inputImgs.length))];
    inputImg.resize(SIZE, SIZE);
    image(inputImg, 0, 0);
}

////////// DRAW CAIFAN INGREDIENTS //////////
function drawFood(foodNo) {
    push();
    let foodVer = foodImgs[foodNo][int(random(foodImgs[foodNo].length))];
    let foodSize = 0.4 * SIZE;
    foodVer.resize(foodSize, foodSize);
    let foodPadL = width / 2 - 0.50 * width + foodSize / 2;
    let foodPadR = width / 2 + 0.50 * width - foodSize / 2;
    let foodPadT = height / 2 - 0.50 * width + foodSize / 2;
    let foodPadB = height / 2 + 0.35 * width - foodSize / 2;
    let foodX = random(foodPadL, foodPadR);
    let foodY = random(foodPadT, foodPadB);
    translate(foodX, foodY);
    imageMode(CENTER);
    push();
    rotate(random(0, PI));
    image(foodVer, 0, 0);
    pop();
    pop();
}

////////// LOAD PRE-TRAINED CAIFAN MODEL //////////
function drawCaifan() {
    let mpath = 'caifan-assets/models/caifan_BtoA.pict';
    ml5.pix2pix(mpath).ready.then((model) => {
        statusMsg.html("click [cook] when you're <br/> happy with your caifan");
        transferBtn.mousePressed(function () {
            transfer(model);
            return false;
        });
    });
}

////////// APPLY STYLE TRANSFER //////////
async function transfer(pix2pix) {
    declareStaus = new Promise((resolve, reject) => {
        statusMsg.html('... cooking your caifan ... <br/> ... please wait ...');
        setTimeout(resolve, 10)
    });
    await declareStaus;
    const canvasElement = select('canvas').elt;
    pix2pix.transfer(canvasElement).then((result) => {
        outputContainer.html('');
        createImg(result.src).class('border-box').parent('output');
        statusMsg.html('~ done ~ <br/> click [clear] to build a new caifan <br/> click [random] for a random caifan');
    });
    statusMsg.html('');
}
