document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const clearButton = document.getElementById('clear');
    const colorInput = document.getElementById('color');
    const thicknessInput = document.getElementById('thickness');
    
    let isDrawing = false;
    
    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 200;
    
    context.strokeStyle = '#000';
    context.lineWidth = 2;
    
    function startPosition(e) {
        isDrawing = true;
        draw(e);
    }
    
    function endPosition() {
        isDrawing = false;
        context.beginPath();
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        context.lineWidth = thicknessInput.value;
        context.strokeStyle = colorInput.value;
        
        context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    }
    
    clearButton.addEventListener('click', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
});
