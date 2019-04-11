(function () {
    'use strict';

    const square = 20;
    var canvas = document.getElementById('game-canvas'),
        ctx = canvas.getContext('2d'),
        backgroundImg = new Image(),
        snakeHeadRight = new Image(),
        snakeHeadLeft = new Image(),
        snakeHeadUp = new Image(),
        snakeHeadDown = new Image(),
        collectibleImg = new Image(),
        collectSound = new Audio(),
        gameoverSound = new Audio(),
        score = 0,
        snake = [],
        move,
        headX,
        headY,
        collectible;

    snake[0] = {
        x: 14 * square,
        y: 120 + 10 * square
    }


    collectibleImg.src = 'img/rabbit.png';
    collectSound.src = 'img/chomp.ogg';
    gameoverSound.src = 'img/gameover.wav'
    backgroundImg.src = 'img/grass.png';
    snakeHeadRight.src = 'img/head-right.png';
    snakeHeadLeft.src = 'img/head-left.png';
    snakeHeadUp.src = 'img/head-up.png';
    snakeHeadDown.src = 'img/head-down.png';


    ctx.fillStyle = "#F5CB5C";
    ctx.fillRect(20, 20, 540, 80);

    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 37 && move != "RIGHT") {
            move = "LEFT";
        } else if (e.keyCode == 38 && move != "DOWN") {
            move = "UP";
        } else if (e.keyCode == 39 && move != "LEFT") {
            move = "RIGHT";
        } else if (e.keyCode == 40 && move != "UP") {
            move = "DOWN";
        }
    }, false);

    var generateCollectible = () => {
        collectible = {
            x: Math.floor(Math.random() * 27 + 1) * square,
            y: Math.floor(Math.random() * 22 + 6) * square
        };
    };

    generateCollectible();

    function isCollision(newHead, snake) {
        for (let i = 0; i < snake.length; i++) {
            if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function draw() {
        var bcgrnd = ctx.createPattern(backgroundImg, 'repeat'); // Create a pattern with this image, and set it to "repeat".
        ctx.fillStyle = bcgrnd;
        ctx.fillRect(20, 120, 540, 440);
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                ctx.drawImage(snakeHeadRight, snake[0].x, snake[0].y, square, square);
                /*
                ctx.fillStyle = "#F5CB5C";
                ctx.fillRect(snake[0].x, snake[0].y, square, square);*/
                if (move == "RIGHT") ctx.drawImage(snakeHeadRight, snake[0].x, snake[0].y, square, square);
                else if (move == "LEFT") ctx.drawImage(snakeHeadLeft, snake[0].x, snake[0].y, square, square);
                else if (move == "UP") ctx.drawImage(snakeHeadUp, snake[0].x, snake[0].y, square, square);
                else if (move == "DOWN") ctx.drawImage(snakeHeadDown, snake[0].x, snake[0].y, square, square);
            } else {
                ctx.fillStyle = "#E05112";
                ctx.fillRect(snake[i].x, snake[i].y, square, square);
            }
        }

        ctx.drawImage(collectibleImg, collectible.x, collectible.y, 20, 20);
        ctx.drawImage(collectibleImg, 40, 43, 30, 30);
        ctx.fillStyle = "#242423";
        ctx.font = "30px Roboto";
        ctx.fillText(score, 100, 70);


        // saving head start position
        headX = snake[0].x;
        headY = snake[0].y;


        // snake moves animation
        // removing the end and adding it to the beginning as a new head

        switch (move) {
            case "LEFT":
                headX -= square;
                break;
            case "UP":
                headY -= square;
                break;
            case "RIGHT":
                headX += square;
                break;
            case "DOWN":
                headY += square;
                break;
        }

        // scoring - collecting food
        if (headX == collectible.x && headY == collectible.y) {
            generateCollectible();
            score++;
            collectSound.play();
        } else {
            snake.pop();
        }


        var newHead = {
            x: headX,
            y: headY
        }

        // losing
        if (headX < square || headX > 27 * square || headY < 6 * square || headY > 27 * square || isCollision(newHead, snake) == true) {
            clearInterval(gameInterval);
            gameoverSound.play();
        }

        snake.unshift(newHead);


        ctx.fillStyle = "#F5CB5C";
        ctx.fillText(score - 1, 100, 70);
        ctx.fillStyle = "#242423";
        ctx.fillText(score, 100, 70);

    }
    let gameInterval = setInterval(draw, 100);


    var start = document.getElementById('btn__play');
    start.addEventListener("click", function () {
        document.getElementById('game-canvas').style.display = "block";
    }, false);


    var restart = document.getElementById('btn__restart');
    restart.addEventListener("click", function () {
        location.reload();
    }, false);
})();
