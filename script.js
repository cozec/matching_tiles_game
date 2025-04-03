// Game images array with cartoon image URLs
const images = [
    'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f436.svg', // dog
    'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f431.svg', // cat
    'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f430.svg', // rabbit
    'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f43b.svg', // bear
    'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f98a.svg', // fox
    'https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f43a.svg'  // wolf
];

class MatchingGame {
    constructor() {
        this.gameBoard = document.getElementById('gameBoard');
        this.matchesDisplay = document.getElementById('matches');
        this.timerDisplay = document.getElementById('timer');
        this.tiles = [];
        this.flippedTiles = [];
        this.matches = 0;
        this.canFlip = true;
        this.gameStarted = false;
        this.timer = null;
        this.seconds = 0;
        this.init();
    }

    init() {
        // Create pairs of images
        const gameImages = [...images, ...images];
        this.shuffleArray(gameImages);

        // Create tiles
        gameImages.forEach((image, index) => {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.value = image;
            tile.dataset.index = index;

            const front = document.createElement('div');
            front.className = 'tile-front';
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Cartoon character';
            front.appendChild(img);

            const back = document.createElement('div');
            back.className = 'tile-back';

            tile.appendChild(front);
            tile.appendChild(back);
            tile.addEventListener('click', () => this.flipTile(tile));
            this.gameBoard.appendChild(tile);
            this.tiles.push(tile);
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    flipTile(tile) {
        if (!this.canFlip || tile.classList.contains('flipped') || tile.classList.contains('matched')) {
            return;
        }

        // Start the timer on the first tile flip
        if (!this.gameStarted) {
            this.startTimer();
            this.gameStarted = true;
        }

        tile.classList.add('flipped');
        this.flippedTiles.push(tile);

        if (this.flippedTiles.length === 2) {
            this.canFlip = false;
            this.checkMatch();
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.seconds++;
            const minutes = Math.floor(this.seconds / 60);
            const remainingSeconds = this.seconds % 60;
            this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    checkMatch() {
        const [tile1, tile2] = this.flippedTiles;
        const match = tile1.dataset.value === tile2.dataset.value;

        if (match) {
            this.matches++;
            this.matchesDisplay.textContent = this.matches;
            tile1.classList.add('matched');
            tile2.classList.add('matched');
            this.resetFlippedTiles();
            
            // Check if all tiles are matched
            if (this.matches === images.length) {
                this.stopTimer();
                setTimeout(() => {
                    alert(`Congratulations! You completed the game in ${this.timerDisplay.textContent}!`);
                }, 500);
            }
        } else {
            setTimeout(() => {
                tile1.classList.remove('flipped');
                tile2.classList.remove('flipped');
                this.resetFlippedTiles();
            }, 1000);
        }
    }

    resetFlippedTiles() {
        this.flippedTiles = [];
        this.canFlip = true;
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new MatchingGame();
}); 