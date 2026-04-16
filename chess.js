function newState(state) {
    if (state === "game") {
        document.getElementById("menu").style.display = "none";
        document.getElementById("back").style.display = "inline";
        document.getElementById("board").style.display = "inline";
    } else if (state === "menu") {
        document.getElementById("menu").style.display = "flex";
        document.getElementById("back").style.display = "none";
        document.getElementById("board").style.display = "none";
    }
};

const pieceSetting = [bRook,bKnight,bBishop,bQueen,bKing,bBishop,bKnight,bRook,
                      bPawn,bPawn,bPawn,bPawn,bPawn,bPawn,bPawn,bPawn,
                      '','','','','','','','',
                      '','','','','','','','',
                      '','','','','','','','',
                      '','','','','','','','',
                      wPawn,wPawn,wPawn,wPawn,wPawn,wPawn,wPawn,wPawn,
                      wRook,wKnight,wBishop,wQueen,wKing,wBishop,wKnight,wRook
]

function initBoard() {
    let table = document.createElement("table");
    let letters = "ABCDEFGH";
    for (let i = 0; i < 9; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < 9; j++) {
            let td = document.createElement("td");
            td.onclick = function() {squareClicking(this); };
            
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

            if ((i + j) % 2 == 0) {
                td.className = "white";
            } else {
                td.className = "black";
            }

            if (i < 8 && j > 0) {
                const pieceIndex = (i*8) + (j-1);
                const piece = pieceSetting[pieceIndex];
                if (pieceIndex !== undefined && pieceIndex !== "") {
                    td.innerHTML = piece
                }
                const pieceElement = td.querySelector("svg");
                if (pieceElement) {
                    pieceElement.classList.add("piece");
                };
            };

            tr.appendChild(td);
        };
        table.appendChild(tr);
    };
    document.getElementById("board").appendChild(table)
};

let selectedPiece = null;
let selectedSquare = null;

function squareClicking(squareElement) {
    if (!selectedPiece) {
        if (squareElement.innerHTML !== "") {
            selectedPiece = squareElement.innerHTML;
            selectedSquare = squareElement;
            squareElement.classList.add("selected");
        }
    } else {
        if (squareElement === selectedSquare) {
            selectedSquare.classList.remove("selected");
            selectedPiece = null;
            selectedSquare = null;
            return;
        }
        squareElement.innerHTML = selectedPiece;
        selectedSquare.innerHTML = "";
        selectedSquare.classList.remove("selected")
        selectedPiece = null;
        selectedSquare = null;
    }
}



function initClassic() {
    newState("game")
    if (sessionStorage.getItem("existingGame") === null) {
        initBoard()
        sessionStorage.setItem("existingGame", true)
    } 
};

function initBlitz() {
    newState("game")
    if (sessionStorage.getItem("existingGame") === null) {
        initBoard()
        sessionStorage.setItem("existingGame", true)
    }
};

function back() {
    newState("menu")
}

