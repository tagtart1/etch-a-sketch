

const drawSpaceWidth = 500; //in pixels
const container = document.querySelector('.container');
const slider = document.querySelector('.slider');
const gridSizeText = document.querySelector('.grid-value-text');
const colorPicker = document.querySelector('.color-picker');

let boxAmount = 256; //init value
let holdingDownMouse = false;
let drawColor = colorPicker.value;



drawEmptyBoard();



container.addEventListener('mousedown', () => {holdingDownMouse = true});
container.addEventListener('mouseup', () => {holdingDownMouse = false} );
container.addEventListener('mouseleave', () => {holdingDownMouse = false});

slider.oninput = function () {
    boxAmount = this.value * this.value;
    gridSizeText.innerText = `${this.value} x ${this.value}`;

    const oldBoxes = document.querySelectorAll('.emptybox');
    oldBoxes.forEach(oldBox => oldBox.remove() );
    drawEmptyBoard();

}

colorPicker.oninput = function () {
    drawColor = this.value;
}

function drawEmptyBoard() {
    for (let i = 1; i <= boxAmount ; i++) {
        const boxDimension = drawSpaceWidth / Math.sqrt(boxAmount)
        const newBox = document.createElement('div');
        newBox.classList.add('emptybox');
        newBox.style.width = `${boxDimension}px`;
        newBox.style.height = `${boxDimension}px`;
        newBox.addEventListener('mouseenter', colorBoxHeld);
        newBox.addEventListener('click', colorBoxClick);
        container.appendChild(newBox);
       
    }
}
function colorBoxClick(e) {  
    this.classList.add('colored');
    this.style.background = drawColor;
}

function colorBoxHeld(e) { 
   if (holdingDownMouse) {
     this.classList.add('colored');
     this.style.background = drawColor;
   }
}
