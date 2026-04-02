function newState(state) {
    if (state === "game") {
        document.getElementById("menu").style.display = "none";
        document.getElementById("back").style.display = "inline";
    } else if (state === "menu") {
        document.getElementById("menu").style.display = "flex";
        document.getElementById("back").style.display = "none";
    }
};

function initBoard() {
    var table = document.createElement("table");
    for (var i = 1; i < 9; i++) {
        var tr = document.createElement("tr");
        for (var j = 1; j < 9; j++) {
            var td = document.createElement("td");
            if (i%2 == j%2) {
                td.className = "white";
            } else {
                td.className = "black";
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);

    }
    document.getElementById("board").appendChild(table)
};

function initClassic() {
    newState("game")
    if (sessionStorage.getItem("existingGame") === null) {
        initBoard()
        sessionStorage.setItem("existingGame", true)
    }
};

function back() {
    newState("menu")
}