canvas.width  = window.innerWidth * .9;
canvas.height = window.innerHeight * .9;

var myCanvas = document.getElementById("canvas");
var ctx = myCanvas.getContext("2d");
rectangle = myCanvas.getBoundingClientRect();

var btn = document.getElementById("btn");

var fruitWidth;
var fruitHeight;

var fruitSpawned;
/*
blackSpriteSheet = new Image();
blackSpriteSheet.src = "images/black.png";

redSpriteSheet = new Image();
redSpriteSheet.src = "images/red.png";
*/
fruitSpriteSheet = new Image();
fruitSpriteSheet.src = "images/Fruit+.png";//credit to ninjikin on itch.io

function watermelon(x, y)
{
    this.xPos = x;
    this.yPos = y;
}

function fruit(x, y)
{
    this.xPos = x;
    this.yPos = y;
}

let fruitsIndexX = [0, 16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 272, 288, 304, 320, 336, 352, 368, 384, 400, 432, 448, 464, 480, 496, 512, 528, 544, 560, 576]
let fruitsIndexY = [0, 16, 32, 48, 64, 80];

let fruitSizes = [64, 32, 16];

let fruitArray = [];

function startGame()
{
    btn.innerHTML = "RESET";

    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    fruitArray = [];
    fruitSpawned = 0;

    var sizing = Math.floor(Math.random() * 3);
    fruitWidth = fruitSizes[sizing];
    fruitHeight = fruitSizes[sizing];

    let myWatermelon = spawnPeople(Math.floor(Math.random() * (250 * (sizing + 1))) + 100);

    console.log("Fruit spawned: ", fruitSpawned);

    document.addEventListener("click", event => {hitReg(event, myWatermelon)});
}

function hitReg(event, myWatermelon)
{
    mouseX = event.clientX - rectangle.left;
    mouseY = event.clientY - rectangle.top;

    console.log(mouseX, " ", mouseY);

    if((mouseX >= myWatermelon.xPos && mouseX <= myWatermelon.xPos + fruitWidth) && (mouseY >= myWatermelon.yPos && mouseY <= myWatermelon.yPos + fruitHeight))
    {
        console.log("Hit");
        startGame();
    }
    else console.log("Miss")
}

function spawnPeople(numPeople)
{
    for(i = 0; i < numPeople; i++) fruitArray.push(spawnFruit());
    fruitSpawned = numPeople;

    return spawnWatermelon();
}

function spawnFruit()
{
    var x = Math.random() * (canvas.width - fruitWidth);
    var y = Math.random() * (canvas.height - fruitHeight);
    var p = new fruit(x, y);
    var xIndex = Math.floor(Math.random() * 35);
    var yIndex = Math.floor(Math.random() * 6);

    //console.log("Person at: ", p);

    ctx.drawImage(fruitSpriteSheet, fruitsIndexX[xIndex], fruitsIndexY[yIndex], 16, 16, x, y, fruitWidth, fruitHeight);
    return p;
}

function spawnWatermelon()
{
    var x = Math.random() * (canvas.width - fruitWidth);
    var y = Math.random() * (canvas.height - fruitHeight);
    var w = new watermelon(x, y);

    console.log("Watermelon at: ", w);

    ctx.drawImage(fruitSpriteSheet, 416, 80, 16, 16, x, y, fruitWidth, fruitHeight);
    return w;
}