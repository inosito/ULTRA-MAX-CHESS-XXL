var table = document.createElement("table");
for (var i = 1; i < 9; i++) {
    var tr = document.createElement("tr");
    for (var j = 1; j < 9; j++) {
        var td = document.createElement("td");
        if (i%2 == j%2) {
            td.className = "white";
        } else {
            td.classname = "black";
        }
        tr.appendChaild(td);
    }
    table.appendChild(tr);

}
document.body.appendChild(table);