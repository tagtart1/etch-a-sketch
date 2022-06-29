

const drawSpaceWidth = 500; //in pixels
const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const gridSizeText = document.querySelector('.grid-value-text');
const colorPicker = document.querySelector('.color-picker');
const clearBtn = document.querySelector('#clear');
const rainbowMode = document.querySelector('#rainbow');
const shadeMode = document.querySelector('#shade');
const colorMode = document.querySelector('#color-btn');
const eraserMode = document.querySelector('#eraser');
const gridBtn = document.querySelector('#grid');

let boxAmount = 256; //init value
let holdingDownMouse = false;
let drawColor = colorPicker.value;
let currentDrawMode;
let isGridOn = false;


gridBtn.addEventListener('click', () => toggleGridLines())
colorMode.addEventListener('click', () => enterDrawMode(colorMode));
rainbowMode.addEventListener('click', () => enterDrawMode(rainbowMode));
clearBtn.addEventListener('click', resetCanvas);
shadeMode.addEventListener('click',() => enterDrawMode(shadeMode));
eraserMode.addEventListener('click', () => enterDrawMode(eraserMode));

container.addEventListener('mousedown', () => {holdingDownMouse = true});
container.addEventListener('mouseup', () => {holdingDownMouse = false} );
container.addEventListener('mouseleave', () => {holdingDownMouse = false});

enterDrawMode(colorMode);
drawEmptyCanvas();

slider.onchange = function () {
    boxAmount = this.value * this.value;
    resetCanvas();

}

slider.oninput = function () {
    gridSizeText.innerText = `${this.value} x ${this.value}`;
}

colorPicker.oninput = function () {
    drawColor = this.value;
}


function toggleGridLines() {
    const boxes = document.querySelectorAll('.emptybox');
    if(!isGridOn) {
    isGridOn = true;
    gridBtn.style.background = `rgb(37,37,37)`;
    gridBtn.style.color = `white`;
    boxes.forEach(box => box.classList.add('grid-lines'));
    
    }
    else {
        isGridOn = false;
        gridBtn.style.background = `rgb(230, 230, 230)`;
        gridBtn.style.color = `rgb(37,37,37)`;
        boxes.forEach(box => box.classList.remove('grid-lines'));
        
    }
}


function enterDrawMode(button) {
    if (currentDrawMode === button) return;
    if (currentDrawMode != null) {
    currentDrawMode.style.background = `rgb(230, 230, 230)`;
    currentDrawMode.style.color = `rgb(37,37,37)`;
    }
    currentDrawMode = button;
    button.style.background = `rgb(37,37,37)`;
    button.style.color = `white`;
}

function resetCanvas() {
    const oldBoxes = document.querySelectorAll('.emptybox');
    oldBoxes.forEach(oldBox => oldBox.remove() );
    drawEmptyCanvas();
}

function drawEmptyCanvas() {
    for (let i = 1; i <= boxAmount ; i++) {
        const boxDimension = drawSpaceWidth / Math.sqrt(boxAmount)
        const newBox = document.createElement('div');
        newBox.classList.add('emptybox');
        if (isGridOn) newBox.classList.add('grid-lines');
        newBox.style.background = 'rgb(255,255,255)';
        newBox.style.width = `${boxDimension}px`;
        newBox.style.height = `${boxDimension}px`;
        newBox.addEventListener('mouseenter', colorBoxHeld);
        newBox.addEventListener('click', colorBoxClick);
        container.appendChild(newBox);
       
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const rgb = `rgb(${r},${g},${b})`;
    return rgb;
}

function shadeColor(rgbvalues) {
    let newValues = rgbvalues.match(/\d+/g); //extracts the RGB values from the string
    newValues[0] *= .85; //for each loop would not work for some reason
    newValues[1] *= .85;
    newValues[2] *= .85;
    return `rgb(${newValues[0]}, ${newValues[1]}, ${newValues[2]})`
}



function colorBoxClick(e) {  
    this.classList.add('colored');
    if (currentDrawMode == rainbowMode) {
        this.style.background = getRandomColor();
     }
     else if (currentDrawMode == eraserMode) {
        this.style.background = `rgb(255, 255, 255)`;
     }
     else if (currentDrawMode == shadeMode) {
        this.style.background = shadeColor(this.style.background)
     }
     else
     this.style.background = drawColor;
}

function colorBoxHeld(e) { 
   if (holdingDownMouse) {
     this.classList.add('colored');
     if (currentDrawMode == rainbowMode) {
        this.style.background = getRandomColor();
     }
     else if (currentDrawMode == shadeMode) {
       
        this.style.background = shadeColor(this.style.background)
  }
     else if (currentDrawMode == eraserMode) {
        this.style.background = `rgb(255, 255, 255)`;
     }
     else
     this.style.background = drawColor;
   }
}
