const chessboard = document.getElementById('chessboard');
const settings = {
  boardStyle: 'classic',
  contrast: 100,
};

const helpText = `
<h3>How to Play</h3>
<p>This is a demo chess game interface with emoji pieces for now.</p>
<p>Click on any piece and then a valid square to move it.</p>
<p>Levels, AI, and saving progress coming soon!</p>
`;

const feedbackText = `
<h3>Feedback</h3>
<p>Love the design? Want more features? Let me know!</p>
<p>Email: karthik@example.com</p>
`;

// Chessboard Setup with emoji pieces
const boardSquares = [];
const initialBoard = [
  ['♜','♞','♝','♛','♚','♝','♞','♜'],
  ['♟','♟','♟','♟','♟','♟','♟','♟'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['♙','♙','♙','♙','♙','♙','♙','♙'],
  ['♖','♘','♗','♕','♔','♗','♘','♖'],
];

let selected = null;

// Create board squares
function createBoard() {
  chessboard.innerHTML = '';
  boardSquares.length = 0;
  for(let r=0; r<8; r++) {
    for(let c=0; c<8; c++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.classList.add((r+c) % 2 === 0 ? 'light' : 'dark');
      square.dataset.row = r;
      square.dataset.col = c;
      square.textContent = initialBoard[r][c];
      square.addEventListener('click', () => squareClicked(r,c));
      chessboard.appendChild(square);
      boardSquares.push(square);
    }
  }
}

// Simple select and move logic (no rules for demo)
function squareClicked(r, c) {
  const square = boardSquares[r*8+c];
  if(selected) {
    // Move piece
    if(selected !== square) {
      square.textContent = selected.textContent;
      selected.textContent = '';
      clearHighlights();
      selected = null;
    }
  } else {
    if(square.textContent) {
      selected = square;
      highlightMoves(r,c);
    }
  }
}

function highlightMoves(r,c) {
  clearHighlights();
  // For demo: highlight all squares around
  const moves = [
    [r-1,c-1],[r-1,c],[r-1,c+1],
    [r,c-1],         [r,c+1],
    [r+1,c-1],[r+1,c],[r+1,c+1]
  ];
  moves.forEach(([rr,cc]) => {
    if(rr>=0 && rr<8 && cc>=0 && cc<8) {
      const sq = boardSquares[rr*8+cc];
      sq.classList.add('highlight');
    }
  });
}

function clearHighlights() {
  boardSquares.forEach(sq => sq.classList.remove('highlight'));
}

// Background images with overlay text and chess logos
const backgrounds = [
  'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=1280&q=80',
  'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1280&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1280&q=80',
];

// Overlay texts styles for "Karthik Kandimalla" with chess logos
const overlayTexts = [
  `<div style="color:#00ccff; font-size:48px; font-weight:bold; text-shadow: 0 0 10px #00ccff;">♞ Karthik Kandimalla ♞</div>`,
  `<div style="color:#ffaa00; font-size:36px; font-style:italic; text-shadow: 0 0 8px #ffaa00;">♛ Chess 2025 by Karthik Kandimalla ♛</div>`,
  `<div style="color:#33ff99; font-size:42px; font-family:'Courier New', Courier, monospace; text-shadow: 0 0 12px #33ff99;">♔ Creative Chess 2025 ♔</div>`,
];

const backgroundDiv = document.getElementById('background');

let bgIndex = 0;
function changeBackground() {
  backgroundDiv.style.backgroundImage = `url(${backgrounds[bgIndex]})`;
  backgroundDiv.innerHTML = overlayTexts[bgIndex];
  bgIndex = (bgIndex + 1) % backgrounds.length;
}
changeBackground();
setInterval(changeBackground, 3000);

// Settings UI Logic
const helpBtn = document.getElementById('helpBtn');
const feedbackBtn = document.getElementById('feedbackBtn');
const contrastSlider = document.getElementById('contrastSlider');
const boardStyleSelect = document.getElementById('boardStyleSelect');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeModalBtn = document.getElementById('closeModal');

helpBtn.addEventListener('click', () => {
  showModal(helpText);
});
feedbackBtn.addEventListener('click', () => {
  showModal(feedbackText);
});
closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

contrastSlider.addEventListener('input', (e) => {
  let val = e.target.value;
  document.body.style.filter = `contrast(${val}%)`;
});

boardStyleSelect.addEventListener('change', (e) => {
  settings.boardStyle = e.target.value;
  applyBoardStyle();
});

function showModal(html) {
  modalBody.innerHTML = html;
  modal.classList.remove('hidden');
}

function applyBoardStyle() {
  switch(settings.boardStyle) {
    case 'classic':
      boardSquares.forEach((sq, i) => {
        let r = Math.floor(i/8), c = i%8;
        sq.classList.toggle('light', (r+c) % 2 === 0);
        sq.classList.toggle('dark', (r+c) % 2 === 1);
        sq.style.backgroundImage = '';
      });
      break;
    case 'dark':
      boardSquares.forEach(sq => {
        sq.classList.remove('light');
        sq.classList.add('dark');
        sq.style.backgroundImage = '';
      });
      break;
    case 'modern':
      boardSquares.forEach(sq => {
        sq.style.backgroundImage = 'linear-gradient(135deg, #00aaff55, #00446655)';
      });
      break;
  }
}

createBoard();
applyBoardStyle();
