document.addEventListener('DOMContentLoaded', function() {
    // Initialize the canvas and game variables
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';
    let food = { x: 15, y: 15 };

    // Game logic and rendering
    function gameLoop() {
        update();
        draw();
    }

    function update() {
        // Update snake position
        const head = { ...snake[0] };
        switch (direction) {
            case 'right':
                head.x++;
                break;
            case 'left':
                head.x--;
                break;
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            // Snake eats food
            food = { x: Math.floor(Math.random() * canvas.width / gridSize), y: Math.floor(Math.random() * canvas.height / gridSize) };
        } else {
            snake.pop();
        }

        // Check for collision with walls
        if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
            alert('Game Over');
            snake = [{ x: 10, y: 10 }];
            direction = 'right';
            food = { x: 15, y: 15 };
        }
    }

    function draw() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });

        // Draw food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    // User input for controlling the snake
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    });

    // Start the game loop
    setInterval(gameLoop, 100);
});
