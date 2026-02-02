// Crossword Puzzle Data Structure
//
// All DOWN words intersect with the main ACROSS answer: WILLYOUBEMYVALENTINE
// Main answer at row 9, cols 0-19
// Letters indexed: W(0) I(1) L(2) L(3) Y(4) O(5) U(6) B(7) E(8) M(9) Y(10) V(11) A(12) L(13) E(14) N(15) T(16) I(17) N(18) E(19)

const GRID_COLS = 20;
const GRID_ROWS = 19;

const words = [
    // Main answer - horizontal centerpiece (ACROSS)
    // W(0) I(1) L(2) L(3) Y(4) O(5) U(6) B(7) E(8) M(9) Y(10) V(11) A(12) L(13) E(14) N(15) T(16) I(17) N(18) E(19)
    {
        word: 'WILLYOUBEMYVALENTINE',
        clue: 'The question this puzzle is really asking...',
        row: 9,
        col: 0,
        direction: 'across',
        number: 5
    },

    // FISHCHEEKS (10 letters) F-I-S-H-C-H-E-E-K-S
    // Intersects at I (position 2 in FISHCHEEKS) with I (col 1) in main
    // Starts at row 8: row 8=F, row 9=I (matches main's I at col 1)
    {
        word: 'FISHCHEEKS',
        clue: 'Favorite crustacean dish spot in the city',
        row: 8,
        col: 1,
        direction: 'down',
        number: 3
    },

    // SANSABINO (9 letters) S-A-N-S-A-B-I-N-O
    // Intersects at N (position 8 in SANSABINO) with N (col 15) in main
    // Starts at row 2: row 2=S... row 9=N (position 8, matches main's N at col 15)
    {
        word: 'SANSABINO',
        clue: 'Favorite seafood restaurant',
        row: 2,
        col: 15,
        direction: 'down',
        number: 1
    },

    // BARRIOCHINO (11 letters) B-A-R-R-I-O-C-H-I-N-O
    // Intersects at I (position 5 in BARRIOCHINO) with I (col 17) in main
    // Starts at row 5: row 5=B... row 9=I (position 5, matches main's I at col 17)
    {
        word: 'BARRIOCHINO',
        clue: 'First date spot',
        row: 5,
        col: 17,
        direction: 'down',
        number: 2
    },

    // PEAS (4 letters) P-E-A-S
    // Intersects at E (position 2 in PEAS) with E (col 8) in main
    // Starts at row 8: row 8=P, row 9=E (matches main's E at col 8)
    {
        word: 'PEAS',
        clue: 'What I said fell from the sky to start a conversation... and what actually did fall after our second date!',
        row: 8,
        col: 8,
        direction: 'down',
        number: 4
    },

    // COD (3 letters) C-O-D
    // Intersects at O (position 2 in COD) with O (col 5) in main
    // Starts at row 8: row 8=C, row 9=O (matches main's O at col 5)
    {
        word: 'COD',
        clue: 'Portuguese fish we never tried but made a song about',
        row: 8,
        col: 5,
        direction: 'down',
        number: 6
    },

    // PANDAN (6 letters) P-A-N-D-A-N
    // Intersects at A (position 2 in PANDAN) with A (col 12) in main
    // Starts at row 8: row 8=P, row 9=A (matches main's A at col 12)
    {
        word: 'PANDAN',
        clue: 'Your favorite Southeast Asian cocktail ingredient',
        row: 8,
        col: 12,
        direction: 'down',
        number: 7
    },

    // LIMANTOUR (9 letters) L-I-M-A-N-T-O-U-R
    // Intersects at L (position 1 in LIMANTOUR) with L (col 3) in main
    // Starts at row 9: row 9=L (matches main's L at col 3)
    {
        word: 'LIMANTOUR',
        clue: 'Our favorite cocktail bar in Mexico City',
        row: 9,
        col: 3,
        direction: 'down',
        number: 8
    },

    // CRUNCHFACTOR (12 letters) C-R-U-N-C-H-F-A-C-T-O-R
    // Intersects at U (position 3 in CRUNCHFACTOR) with U (col 6) in main
    // Starts at row 7: row 7=C, row 8=R, row 9=U (matches main's U at col 6)
    {
        word: 'CRUNCHFACTOR',
        clue: 'The dream Food Network show you want to create',
        row: 7,
        col: 6,
        direction: 'down',
        number: 9
    },

    // SCALLOPS (8 letters) S-C-A-L-L-O-P-S
    // Intersects at L (position 4 in SCALLOPS) with L (col 13) in main
    // Starts at row 6: row 6=S, row 7=C, row 8=A, row 9=L (matches main's L at col 13)
    {
        word: 'SCALLOPS',
        clue: 'The dish we made on our first Valentine\'s Day',
        row: 6,
        col: 13,
        direction: 'down',
        number: 10
    }
];

// Build the grid
let grid = [];
let cellMap = {};

function initializeGrid() {
    // Create empty grid
    for (let r = 0; r < GRID_ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < GRID_COLS; c++) {
            grid[r][c] = {
                letter: null,
                isBlocked: true,
                number: null,
                row: r,
                col: c,
                words: []
            };
        }
    }

    // Place words on grid
    words.forEach(wordData => {
        const { word, row, col, direction, number } = wordData;

        for (let i = 0; i < word.length; i++) {
            const r = direction === 'across' ? row : row + i;
            const c = direction === 'across' ? col + i : col;

            if (r < GRID_ROWS && c < GRID_COLS) {
                grid[r][c].letter = word[i];
                grid[r][c].isBlocked = false;
                grid[r][c].words.push(wordData);

                // Set number for first cell of word (only if no number already)
                if (i === 0 && grid[r][c].number === null) {
                    grid[r][c].number = number;
                }

                cellMap[`${r},${c}`] = grid[r][c];
            }
        }
    });

    // Renumber cells in reading order (top-to-bottom, left-to-right)
    renumberCells();
}

function renumberCells() {
    let num = 1;
    const numberMap = {};

    // First pass: identify cells that need numbers and assign in reading order
    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            const cell = grid[r][c];
            if (!cell.isBlocked) {
                // Check if this cell starts any word
                const startsWord = cell.words.some(w => w.row === r && w.col === c);
                if (startsWord) {
                    // Map old numbers to new numbers
                    cell.words.forEach(w => {
                        if (w.row === r && w.col === c && !numberMap[`${w.number}-${w.direction}`]) {
                            numberMap[`${w.number}-${w.direction}`] = num;
                        }
                    });
                    cell.number = num;
                    num++;
                }
            }
        }
    }

    // Update word numbers
    words.forEach(w => {
        const key = `${w.number}-${w.direction}`;
        if (numberMap[key]) {
            w.number = numberMap[key];
        }
    });
}

// Render the grid
function renderGrid() {
    const gridEl = document.getElementById('crossword-grid');
    gridEl.style.gridTemplateColumns = `repeat(${GRID_COLS}, var(--cell-size))`;
    gridEl.style.gridTemplateRows = `repeat(${GRID_ROWS}, var(--cell-size))`;
    gridEl.innerHTML = '';

    for (let r = 0; r < GRID_ROWS; r++) {
        for (let c = 0; c < GRID_COLS; c++) {
            const cell = grid[r][c];
            const cellEl = document.createElement('div');
            cellEl.className = 'cell';
            cellEl.dataset.row = r;
            cellEl.dataset.col = c;

            if (cell.isBlocked) {
                cellEl.classList.add('blocked');
            } else {
                if (cell.number) {
                    const numberEl = document.createElement('span');
                    numberEl.className = 'cell-number';
                    numberEl.textContent = cell.number;
                    cellEl.appendChild(numberEl);
                }

                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.dataset.row = r;
                input.dataset.col = c;
                input.setAttribute('autocomplete', 'off');
                input.setAttribute('autocorrect', 'off');
                input.setAttribute('autocapitalize', 'characters');
                input.setAttribute('spellcheck', 'false');
                cellEl.appendChild(input);
            }

            gridEl.appendChild(cellEl);
        }
    }
}

// Render clues
function renderClues() {
    const acrossClues = document.getElementById('across-clues');
    const downClues = document.getElementById('down-clues');

    const acrossWords = words.filter(w => w.direction === 'across').sort((a, b) => a.number - b.number);
    const downWords = words.filter(w => w.direction === 'down').sort((a, b) => a.number - b.number);

    acrossWords.forEach(wordData => {
        const li = document.createElement('li');
        li.dataset.number = wordData.number;
        li.dataset.direction = wordData.direction;
        li.innerHTML = `<span class="clue-number">${wordData.number}.</span> ${wordData.clue}`;
        li.addEventListener('click', () => selectWord(wordData));
        acrossClues.appendChild(li);
    });

    downWords.forEach(wordData => {
        const li = document.createElement('li');
        li.dataset.number = wordData.number;
        li.dataset.direction = wordData.direction;
        li.innerHTML = `<span class="clue-number">${wordData.number}.</span> ${wordData.clue}`;
        li.addEventListener('click', () => selectWord(wordData));
        downClues.appendChild(li);
    });
}

// Current state
let currentDirection = 'across';
let currentWord = null;
let currentCell = null;

// Select a word
function selectWord(wordData) {
    currentWord = wordData;
    currentDirection = wordData.direction;

    const { row, col, word, direction } = wordData;
    let targetRow = row;
    let targetCol = col;

    // Find first empty cell in word
    for (let i = 0; i < word.length; i++) {
        const r = direction === 'across' ? row : row + i;
        const c = direction === 'across' ? col + i : col;
        const input = getInputAt(r, c);
        if (input && !input.value) {
            targetRow = r;
            targetCol = c;
            break;
        }
    }

    focusCell(targetRow, targetCol);
}

function getInputAt(row, col) {
    return document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
}

function focusCell(row, col) {
    const input = getInputAt(row, col);
    if (input) {
        input.focus();
        input.select();
        currentCell = { row, col };
        updateHighlights();
    }
}

function updateHighlights() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('active', 'active-word');
    });
    document.querySelectorAll('.clue-list li').forEach(li => {
        li.classList.remove('active');
    });

    if (!currentCell) return;

    const { row, col } = currentCell;
    const cell = grid[row][col];

    currentWord = cell.words.find(w => w.direction === currentDirection) || cell.words[0];
    if (currentWord) {
        currentDirection = currentWord.direction;
    }

    const activeCellEl = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (activeCellEl) {
        activeCellEl.classList.add('active');
    }

    if (currentWord) {
        const { row: startRow, col: startCol, word, direction } = currentWord;
        for (let i = 0; i < word.length; i++) {
            const r = direction === 'across' ? startRow : startRow + i;
            const c = direction === 'across' ? startCol + i : startCol;
            const cellEl = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
            if (cellEl) {
                cellEl.classList.add('active-word');
            }
        }

        const clueEl = document.querySelector(`.clue-list li[data-number="${currentWord.number}"][data-direction="${currentWord.direction}"]`);
        if (clueEl) {
            clueEl.classList.add('active');
            clueEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function moveToNextCell() {
    if (!currentCell || !currentWord) return;

    const { row, col } = currentCell;
    const { direction } = currentWord;

    let nextRow = direction === 'across' ? row : row + 1;
    let nextCol = direction === 'across' ? col + 1 : col;

    const wordEndRow = currentWord.row + (direction === 'down' ? currentWord.word.length - 1 : 0);
    const wordEndCol = currentWord.col + (direction === 'across' ? currentWord.word.length - 1 : 0);

    if (nextRow <= wordEndRow && nextCol <= wordEndCol) {
        focusCell(nextRow, nextCol);
    }
}

function moveToPrevCell() {
    if (!currentCell || !currentWord) return;

    const { row, col } = currentCell;
    const { direction } = currentWord;

    let prevRow = direction === 'across' ? row : row - 1;
    let prevCol = direction === 'across' ? col - 1 : col;

    if (prevRow >= currentWord.row && prevCol >= currentWord.col) {
        focusCell(prevRow, prevCol);
    }
}

function toggleDirection() {
    if (!currentCell) return;

    const { row, col } = currentCell;
    const cell = grid[row][col];

    if (cell.words.length > 1) {
        currentDirection = currentDirection === 'across' ? 'down' : 'across';
        updateHighlights();
    }
}

function handleInput(e) {
    const input = e.target;
    const value = input.value.toUpperCase();

    if (value.length > 0) {
        input.value = value.slice(-1);
        moveToNextCell();
    }
}

function handleKeydown(e) {
    const input = e.target;

    switch (e.key) {
        case 'ArrowRight':
            e.preventDefault();
            if (currentDirection === 'across') {
                moveToNextCell();
            } else {
                currentDirection = 'across';
                updateHighlights();
            }
            break;
        case 'ArrowLeft':
            e.preventDefault();
            if (currentDirection === 'across') {
                moveToPrevCell();
            } else {
                currentDirection = 'across';
                updateHighlights();
            }
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (currentDirection === 'down') {
                moveToNextCell();
            } else {
                currentDirection = 'down';
                updateHighlights();
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (currentDirection === 'down') {
                moveToPrevCell();
            } else {
                currentDirection = 'down';
                updateHighlights();
            }
            break;
        case 'Tab':
            e.preventDefault();
            moveToNextWord();
            break;
        case 'Backspace':
            if (!input.value) {
                e.preventDefault();
                moveToPrevCell();
            }
            break;
        case ' ':
            e.preventDefault();
            toggleDirection();
            break;
    }
}

function moveToNextWord() {
    if (!currentWord) return;

    const sortedWords = [...words].sort((a, b) => a.number - b.number);
    const currentIndex = sortedWords.findIndex(w => w.number === currentWord.number && w.direction === currentWord.direction);
    const nextIndex = (currentIndex + 1) % sortedWords.length;

    selectWord(sortedWords[nextIndex]);
}

function handleFocus(e) {
    const input = e.target;
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);

    currentCell = { row, col };

    const cell = grid[row][col];
    if (!cell.words.find(w => w.direction === currentDirection)) {
        currentDirection = cell.words[0].direction;
    }

    updateHighlights();
}

function checkPuzzle() {
    let allCorrect = true;
    let allFilled = true;

    words.forEach(wordData => {
        const { word, row, col, direction } = wordData;

        for (let i = 0; i < word.length; i++) {
            const r = direction === 'across' ? row : row + i;
            const c = direction === 'across' ? col + i : col;
            const input = getInputAt(r, c);

            if (input) {
                if (!input.value) {
                    allFilled = false;
                } else if (input.value.toUpperCase() !== word[i]) {
                    allCorrect = false;
                }
            }
        }
    });

    if (!allFilled) {
        alert('Keep going! Some cells are still empty.');
        return;
    }

    if (allCorrect) {
        revealValentine();
    } else {
        alert('Almost there! Some answers are not quite right. Keep trying!');
    }
}

function revealValentine() {
    const overlay = document.getElementById('reveal-overlay');
    overlay.classList.remove('hidden');

    startFloatingHearts();

    if (typeof startConfetti === 'function') {
        startConfetti();
    }
}

function startFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const hearts = ['💕', '💖', '💗', '💝', '❤️', '💘', '💓'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (3 + Math.random() * 2) + 's';
        heart.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
        container.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }

    setInterval(createHeart, 300);

    for (let i = 0; i < 10; i++) {
        setTimeout(createHeart, i * 100);
    }
}

function initEventListeners() {
    const gridEl = document.getElementById('crossword-grid');

    gridEl.addEventListener('input', handleInput);
    gridEl.addEventListener('keydown', handleKeydown);
    gridEl.addEventListener('focusin', handleFocus);

    document.getElementById('check-btn').addEventListener('click', checkPuzzle);
}

function init() {
    initializeGrid();
    renderGrid();
    renderClues();
    initEventListeners();

    // Select first word
    const firstWord = words.find(w => w.number === 1);
    if (firstWord) {
        selectWord(firstWord);
    }
}

document.addEventListener('DOMContentLoaded', init);
