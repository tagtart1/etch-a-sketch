
let boxAmount = 16 * 16;
const container = document.querySelector('.container');
let holdingDownMouse = false;

for (let i = 1; i <= boxAmount ; i++) {
    
    const newBox = document.createElement('div');
    newBox.classList.add('emptybox')
    newBox.addEventListener('mouseenter', colorBoxHeld);
    newBox.addEventListener('click', colorBoxClick);
    container.appendChild(newBox);
   
}
function colorBoxClick(e) {
    this.classList.add('colored');
}

function colorBoxHeld(e) {
   if (holdingDownMouse) {
     this.classList.add('colored');
   }
}

container.addEventListener('mousedown', () => {holdingDownMouse = true});
container.addEventListener('mouseup', () => {holdingDownMouse = false} );
container.addEventListener('mouseleave', () => {holdingDownMouse = false});