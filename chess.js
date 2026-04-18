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
    }  else if (state === "menu") {
        document.getElementById("menu").style.display = "flex";
        document.getElementById("back").style.display = "none";
        document.getElementById("classic").style.display = "none";
        document.getElementById("blitz").style.display = "none";
        document.getElementById("ultra").style.display = "none";
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
];

function initBoard(type) {
    let table = document.createElement("table");
    table.setAttribute("id", `${type}`);
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

            if ((i + j) % 2 == 0) {
                td.className = "white";
                td.onclick = function() {squareClicking(this); };
            } else {
                td.className = "black";
                td.onclick = function() {squareClicking(this); };
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
    document.getElementById("board").appendChild(table);
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

function initGame(type) {
    if (sessionStorage.getItem(`existing${type}`) === null) {
        sessionStorage.setItem(`existing${type}`, true)
    };
    newState(type)
};

function back() {
    newState("menu")
}

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i <= 3; i++) {
        if (i === 0){
            initBoard("classic");
            document.getElementById("classic").style.display = "none";
        } else if (i === 1){
            initBoard("blitz");
            document.getElementById("blitz").style.display = "none";
        } else if (i === 2){
            initBoard("ultra");
            document.getElementById("ultra").style.display = "none";
        };
    };
});

