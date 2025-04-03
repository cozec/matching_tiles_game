// Game images array with cartoon image URLs
const images = [
    'https://img.icons8.com/color/96/000000/dog.png',
    'https://img.icons8.com/color/96/000000/cat.png',
    'https://img.icons8.com/color/96/000000/rabbit.png',
    'https://img.icons8.com/color/96/000000/bear.png',
    'https://img.icons8.com/color/96/000000/fox.png',
    'https://img.icons8.com/color/96/000000/penguin.png'
];

class MatchingGame {
    constructor() {
        this.gameBoard = document.getElementById('gameBoard');
        this.matchesDisplay = document.getElementById('matches');
        this.tiles = [];
        this.flippedTiles = [];
        this.matches = 0;
        this.canFlip = true;
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

        tile.classList.add('flipped');
        this.flippedTiles.push(tile);

        if (this.flippedTiles.length === 2) {
            this.canFlip = false;
            this.checkMatch();
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
        } else {
            setTimeout(() => {
                tile1.classList.remove('flipped');
                tile2.classList.remove('flipped');
                this.resetFlippedTiles();
            }, 3000);
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