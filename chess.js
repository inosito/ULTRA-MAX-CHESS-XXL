function newState(state) {
    if (state === "classic") {
        document.getElementById("menu").style.display = "none";
        document.getElementById("back").style.display = "inline";
        document.getElementById("classic").style.display = "table";
    } else if (state === "blitz") {
        document.getElementById("menu").style.display = "none";
        document.getElementById("back").style.display = "inline";
        document.getElementById("blitz").style.display = "table";
    } else if (state === "ultra") {
        document.getElementById("menu").style.display = "none";
        document.getElementById("back").style.display = "inline";
        document.getElementById("ultra").style.display = "table";
    } else if (state === "menu") {
        document.getElementById("menu").style.display = "flex";
        document.getElementById("back").style.display = "none";
        document.getElementById("classic").style.display = "none";
        document.getElementById("blitz").style.display = "none";
        document.getElementById("ultra").style.display = "none";
    }
};

const pieceSvg = {
    bR: bRook,
    bN: bKnight,
    bB: bBishop,
    bQ: bQueen,
    bK: bKing,
    bP: bPawn,
    wR: wRook,
    wN: wKnight,
    wB: wBishop,
    wQ: wQueen,
    wK: wKing,
    wP: wPawn
};

const pieceSetting = [
    'bR','bN','bB','bQ','bK','bB','bN','bR',
    'bP','bP','bP','bP','bP','bP','bP','bP',
    null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,
    null,null,null,null,null,null,null,null,
    'wP','wP','wP','wP','wP','wP','wP','wP',
    'wR','wN','wB','wQ','wK','wB','wN','wR'
];

const boardStates = {
    classic: [],
    blitz: [],
    ultra: []
};

let currentBoardType = null;
let currentPlayer = "white";
let selectedIndex = null;
let selectedSquare = null;

function createStartingBoardState() {
    return pieceSetting.slice();
}

function isWhite(piece) {
    return piece && piece.startsWith("w");
}

function isBlack(piece) {
    return piece && piece.startsWith("b");
}

function isSameColor(pieceA, pieceB) {
    if (!pieceA || !pieceB) return false;
    return (isWhite(pieceA) && isWhite(pieceB)) || (isBlack(pieceA) && isBlack(pieceB));
}

function getCellIndex(row, col) {
    return row * 8 + col;
}

function getRowCol(index) {
    return { row: Math.floor(index / 8), col: index % 8 };
}

function renderBoard(type) {
    const boardState = boardStates[type];
    const table = document.getElementById(type);
    if (!table) return;
    const squares = table.querySelectorAll("td[data-index]");
    squares.forEach((td) => {
        const index = Number(td.dataset.index);
        const piece = boardState[index];
        td.innerHTML = piece ? pieceSvg[piece] : "";
        const pieceElement = td.querySelector("svg");
        if (pieceElement) pieceElement.classList.add("piece");

        if (selectedIndex === index && selectedSquare !== td) {
            selectedSquare = td;
        }
    });
    updateStatus();
}

function initBoard(type) {
    boardStates[type] = createStartingBoardState();
    let table = document.createElement("table");
    table.setAttribute("id", type);
    let letters = "ABCDEFGH";
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            let td = document.createElement("td");
            if (j === 0) {
                td.textContent = 8 - i || "";
                td.classList.add("label");
                tr.appendChild(td);
                continue;
            }

            if (i === 8) {
                td.textContent = letters.charAt(j - 1);
                td.classList.add("label");
                tr.appendChild(td);
                continue;
            }

            if ((i + j) % 2 === 0) {
                td.className = "white";
            } else {
                td.className = "black";
            }

            const pieceIndex = (i * 8) + (j - 1);
            td.dataset.index = pieceIndex;
            td.onclick = function() { squareClicking(this); };

            const piece = boardStates[type][pieceIndex];
            if (piece) {
                td.innerHTML = pieceSvg[piece];
                const pieceElement = td.querySelector("svg");
                if (pieceElement) {
                    pieceElement.classList.add("piece");
                }
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    document.getElementById("board").appendChild(table);
}

function updateStatus() {
    const options = document.getElementById("options");
    if (!options) return;
    if (currentBoardType) {
        options.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} to move`;
    } else {
        options.textContent = "";
    }
}

function selectSquare(index, squareElement) {
    if (selectedSquare) {
        selectedSquare.classList.remove("selected");
    }
    selectedIndex = index;
    selectedSquare = squareElement;
    selectedSquare.classList.add("selected");
}

function deselectSquare() {
    if (selectedSquare) selectedSquare.classList.remove("selected");
    selectedIndex = null;
    selectedSquare = null;
}

function squareClicking(squareElement) {
    const type = squareElement.closest("table").id;
    if (type !== currentBoardType) return;
    const index = Number(squareElement.dataset.index);
    const boardState = boardStates[type];
    const piece = boardState[index];

    if (selectedIndex === null) {
        if (!piece) return;
        
        const isPlayersPiece = (currentPlayer === "white" && isWhite(piece)) || (currentPlayer === "black" && isBlack(piece));
        if (!isPlayersPiece) return;
        selectSquare(index, squareElement);
        return;
    }

    if (index === selectedIndex) {
        deselectSquare();
        return;
    }

    const selectedPiece = boardState[selectedIndex];
    const targetPiece = boardState[index];
    
    if (targetPiece && isSameColor(selectedPiece, targetPiece)) {
        return;
    }

    if (selectedPiece[1] === "P") {
        const { row: fromRow, col: fromCol } = getRowCol(selectedIndex);
        const { row: toRow, col: toCol } = getRowCol(index);
        const rowDiff = toRow - fromRow;
        const colDiff = toCol - fromCol;
        const direction = isWhite(selectedPiece) ? -1 : 1;
        const startRow = isWhite(selectedPiece) ? 6 : 1;
        
        if (colDiff === 0) {
            if (rowDiff === direction && !targetPiece) {
            } else if (rowDiff === 2 * direction && fromRow === startRow && !targetPiece) {
                const betweenIndex = getCellIndex(fromRow + direction, fromCol);
                if (boardState[betweenIndex]) return;
            } else {
                return;
            }
        } else if (Math.abs(colDiff) === 1 && rowDiff === direction && targetPiece && !isSameColor(selectedPiece, targetPiece)) {
        } else {
            return;
        }
    } else if (selectedPiece[1] === "N") {
        const { row: fromRow, col: fromCol } = getRowCol(selectedIndex);
        const { row: toRow, col: toCol } = getRowCol(index);      
        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);
        
        if ((rowDiff === 2 && colDiff === 1 || rowDiff === 1 && colDiff === 2) && !isSameColor(selectedPiece, targetPiece)) {
        } else {
            return;
        }
    } else if (selectedPiece[1] === "R") {
        const { row: fromRow, col: fromCol } = getRowCol(selectedIndex);
        const { row: toRow, col: toCol } = getRowCol(index);
        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);

        if (rowDiff !== 0 && colDiff !== 0) {
            return
        }
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;

    }

    boardState[index] = boardState[selectedIndex];
    boardState[selectedIndex] = null;
    deselectSquare();
    currentPlayer = currentPlayer === "white" ? "black" : "white";
    renderBoard(type);
}

function initGame(type) {
    boardStates[type] = createStartingBoardState();
    currentBoardType = type;
    currentPlayer = "white";
    deselectSquare();
    renderBoard(type);
    newState(type);
}

function back() {
    deselectSquare();
    currentBoardType = null;
    updateStatus();
    newState("menu");
}

document.addEventListener("DOMContentLoaded", () => {
    ["classic", "blitz", "ultra"].forEach((type) => {
        initBoard(type);
        document.getElementById(type).style.display = "none";
    });
});

