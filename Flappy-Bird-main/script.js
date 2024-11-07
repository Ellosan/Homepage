const gameArea = document.getElementById('gameArea');
        const bird = document.getElementById('bird');
        const startButton = document.getElementById('startButton');
        const scoreBoard = document.getElementById('score');
        const endGameMessage = document.getElementById('endGameMessage');
        const finalScore = document.getElementById('finalScore');
        const newGameButton = document.getElementById('newGameButton');
        const flapSound = document.getElementById('flapSound');
        const hitSound = document.getElementById('hitSound');
        const pointSound = document.getElementById('pointSound');
        let gameInterval, gravityInterval, pipeInterval;
        let birdY = gameArea.offsetHeight / 2;
        let birdVelocity = 0;
        let pipes = [];
        let score = 0;
        let isGameRunning = false;

        function startGame() {
            if (isGameRunning) return;
            isGameRunning = true;
            score = 0;
            scoreBoard.textContent = score;
            birdY = gameArea.offsetHeight / 2;
            birdVelocity = 0;
            pipes = [];
            gameArea.innerHTML = '';
            gameArea.appendChild(bird);
            bird.style.top = `${birdY}px`;

            gameInterval = setInterval(updateGame, 20);
            gravityInterval = setInterval(applyGravity, 20);
            pipeInterval = setInterval(createPipe, 2000);

            document.addEventListener('keydown', handleKeyPress);
        }

        function updateGame() {
            birdY += birdVelocity;
            bird.style.top = `${birdY}px`;

            if (birdY >= gameArea.offsetHeight || birdY <= 0) {
                endGame();
            }

            pipes.forEach(pipe => {
                pipe.top.style.left = `${pipe.x}px`;
                pipe.bottom.style.left = `${pipe.x}px`;
                pipe.x -= 2;
                    
                if (pipe.x + pipe.width < 0) {
                    pipe.top.remove();
                    pipe.bottom.remove();
                    pipes.shift();
                    score++;
                    scoreBoard.textContent = score;
                    pointSound.play();
                }

                if (
                    (bird.offsetLeft + bird.offsetWidth > pipe.x && bird.offsetLeft < pipe.x + pipe.width) &&
                    (bird.offsetTop < pipe.top.offsetHeight || bird.offsetTop + bird.offsetHeight > pipe.bottom.offsetTop)
                ) {
                    endGame();
                }
            });
        }

        function applyGravity() {
            birdVelocity += 1;
        }

        function handleKeyPress(event) {
            if (event.key === 'ArrowUp' || event.type === 'touchstart') {
                birdVelocity = -5;
                flapSound.play();
            }
        }


        function createPipe() {
            const pipeGap = 150;
            const pipeWidth = 52;
            const pipeTopHeight = Math.random() * (gameArea.offsetHeight - pipeGap);

            const pipeTop = document.createElement('div');
            pipeTop.classList.add('pipe', 'pipe-top');
            pipeTop.style.height = `${pipeTopHeight}px`;
            pipeTop.style.width = `${pipeWidth}px`;
            pipeTop.style.left = `${gameArea.offsetWidth}px`;

            const pipeBottom = document.createElement('div');
            pipeBottom.classList.add('pipe', 'pipe-bottom');
            pipeBottom.style.height = `${gameArea.offsetHeight - pipeTopHeight}px`;
            pipeBottom.style.width = `${pipeWidth}px`;
            pipeBottom.style.left = `${gameArea.offsetWidth}px`;
            pipeBottom.style.top = `${pipeTopHeight + pipeGap}px`;

            gameArea.appendChild(pipeTop);
            gameArea.appendChild(pipeBottom);

            pipes.push({
                top: pipeTop,
                bottom: pipeBottom,
                x: gameArea.offsetWidth,
                width: pipeWidth,
            });
        }

        function endGame() {
            clearInterval(gameInterval);
            clearInterval(gravityInterval);
            clearInterval(pipeInterval);
            isGameRunning = false;
            hitSound.play();
            finalScore.textContent = score;
            endGameMessage.classList.add('show');
        }

        function startNewGame() {
            endGameMessage.classList.remove('show');
            startGame();
        }

        startButton.addEventListener('click', startGame);
        newGameButton.addEventListener('click', startNewGame);
        document.addEventListener('touchstart', handleKeyPress);
