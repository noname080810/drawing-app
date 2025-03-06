const canvas = document.getElementById('pad');
const ctx = canvas.getContext('2d');
const clearbtn = document.getElementById('clear');
const changeColor = document.getElementById('color');
const changeLW = document.getElementById('LineWidth');
const eraserbtn = document.getElementById('eraser');
let isHolding = false;
let lastX = 0;
let lastY = 0;

// Set up initial line properties
ctx.strokeStyle = changeColor.value; // Initial color
ctx.lineWidth = changeLW.value;       // Initial line width
ctx.lineCap = 'round';             // Rounded line ends (optional, but looks nice)
ctx.lineJoin = 'round';

canvas.addEventListener('mousedown', event => {
    let rect = canvas.getBoundingClientRect();
    lastX = event.clientX - rect.left;
    lastY = event.clientY - rect.top;
    isHolding = true;
});

canvas.addEventListener('mousemove', event => {
    if (!isHolding) return;
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // Update line properties if they've changed
    ctx.strokeStyle = changeColor.value; // Current color
    ctx.lineWidth = changeLW.value;       // Current line width

    ctx.beginPath();
    ctx.moveTo(lastX, lastY); // Start at the last point
    ctx.lineTo(x, y);         // Draw a line to the current point
    ctx.stroke();              // Stroke the line (draw the outline)

    lastX = x;
    lastY = y;
});

canvas.addEventListener('mouseup', () => {
    isHolding = false;
});

canvas.addEventListener('mouseout', () => {
    isHolding = false; // Stop drawing if mouse goes outside canvas
});

clearbtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Update line width in real time when change
changeLW.addEventListener('input', () => {
    ctx.lineWidth = changeLW.value;
})
// Update color in real time when change
changeColor.addEventListener('input', () => {
    ctx.strokeStyle = changeColor.value;
})

// Eraser button functionality
