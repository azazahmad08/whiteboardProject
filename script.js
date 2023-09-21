document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const clearButton = document.getElementById('clear');
    const colorInput = document.getElementById('color');
    const thicknessInput = document.getElementById('thickness');
    const writeButton = document.getElementById('writeButton');
    const drawButton = document.getElementById('drawButton');
    const stopDrawingBox = document.getElementById('stopDrawingBox'); // Ensure this element exists in your HTML

    let isDrawing = false;
    let isTextMode = false;

    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 200;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    function activateWritingMode() {
        isDrawing = false;
        isTextMode = true;
    }

    function activateDrawingMode() {
        isDrawing = true;
        isTextMode = false;
    }

    function startPosition(e) {
        if (isDrawing) {
            ctx.beginPath();
            ctx.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        } else if (isTextMode) {
            const text = prompt('Enter text:');
            if (text) {
                ctx.font = '16px Arial';
                ctx.fillStyle = colorInput.value;
                ctx.fillText(text, e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
            }
        }
    }

    function endPosition() {
        if (isDrawing) {
            ctx.closePath();
        }
    }

    function draw(e) {
        if (isDrawing) {
            ctx.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
            ctx.stroke();
        }
    }

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    drawButton.addEventListener('click', () => {
        activateDrawingMode();
    });

    writeButton.addEventListener('click', () => {
        activateWritingMode();
    });

    // Check if the stopDrawingBox element exists before adding the event listener
    if (stopDrawingBox) {
        stopDrawingBox.addEventListener('mouseenter', () => {
            // Stop drawing when the mouse enters the box
            isDrawing = false;
        });
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
});
