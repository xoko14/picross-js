var piRAM; //global variable for storing current picross string

//show picross board with input data
function crearTabla() {
    var tabla = document.getElementById("tabla");
    var largo = document.getElementById("largo").value;
    var alto = document.getElementById("alto").value;
    var conta = 1;
    tabla.innerHTML = '';
    for (i = 1; i <= alto; i++) {
        var tehache = document.createElement("tr");
        for (e = 1; e <= largo; e++) {
            var tede = document.createElement("td");
            var input = document.createElement("input");
            input.setAttribute("id", conta);
            input.setAttribute("type", "checkbox");
            input.setAttribute("class", "picrossCel");
            tede.appendChild(input);
            tehache.appendChild(tede);
            conta++
        }
        tabla.appendChild(tehache);
    }
}

//generate picross string from picross board
function generate() {
    var largo = document.getElementById("largo").value;
    var alto = document.getElementById("alto").value;
    //these two lines of code up here are the responsible to the two inputs in play.html
    if (largo.length == 1) {
        largo = "0" + largo;
    }
    if (alto.length == 1) {
        alto = "0" + alto;
    }
    var picross = [largo, alto];
    for (i = 1; i <= largo * alto; i++) {
        if (document.getElementById(i).checked == true) {
            picross.push(1);
        }
        else {
            picross.push(0);
        }
    }
    piRAM = picross.toString().replace(/,/g, '');
    console.log(piRAM);
}

//get an specific row
function getRow(tRow) {
    var picrossImp = piRAM;
    var equis = picrossImp[0] + picrossImp[1];
    var row = [];
    for (r = 0; r < equis; r++) {
        row.push(picrossImp[4 + tRow * equis + r]);
    }
    return row;
}

//get an specific column
function getCol(tCol) {
    var picrossImp = piRAM;
    var iy = picrossImp[2] + picrossImp[3];
    var col = [];
    for (c = 0; c < iy; c++) {
        col.push(picrossImp[4 + tCol + iy * c]);
    }
    return col;
}

//get a string with the data to show to the player about a row/column
function getStringInfo(tType, tStr) {
    switch (tType) {
        case "row":
            var Str = getRow(tStr);
            break;
        case "col":
            var Str = getCol(tStr);
            break;
        default:
            console.log("Error, input not nice enough. :(");
            break;
    }
    var conde = 0;
    var final = [];
    //console.log(Str.length + ", " + Str);
    for (s = 0; s < Str.length; s++) {
        if (Str[s] == 1) {
            conde++;
        }
        else {
            final.push(conde);
            conde = 0;
        }
    }
    final.push(conde);
    for (s = final.length - 1; s >= 0; s--) {
        if (final[s] === 0) {
            final.splice(s, 1);
        }
    }
    return final.toString().replace(/,/g, ' ');
}

//binary to decimal
function BtD(bstr) {
    return BigInt(parseInt((bstr + '').replace(/[^01]/gi, ''), 2));
}

//returns compressed string
//the compression is just converting from binary to hex (except the first 4 chars, used to store the dimensions)
function compress(unStr) {
    var ex = unStr[0] + unStr[1];
    var why = unStr[2] + unStr[3];
    var length = ex * why;
    var toCompress = "";

    for (i = 0; i < length; i++) {
        toCompress = toCompress.concat(unStr[4 + i]);
    }
    //console.log(toCompress);
    var compressed = BigInt('0b' + toCompress).toString(16);
    var final = ex + why + compressed
    //console.log(compressed);
    return final;
}

//returns decompressed string
function decompress(compStr) {
    var ex = compStr.charAt(0) + compStr.charAt(1);
    var why = compStr.charAt(2) + compStr.charAt(3);
    var length = ex * why;
    var toDecompress = "";

    for (i = 0; i < length; i++) {
        toDecompress = toDecompress.concat(compStr.charAt(4 + i));
    }

    var decompStr = BigInt("0x" + toDecompress).toString(2);
    for(c=0;c<(length-decompStr.length);c++){//place 0s omitted from compression
        decompStr = "0"+decompStr;
    }
    var final = ex + why + decompStr;
    //console.log(decompStr);
    return final;
}

//displays the visualizer table
function crearTablaJ() {
    var seed = decompress(document.getElementById("seed").value);
    var tabla = document.getElementById("tabla");
    var largo = seed.charAt(0) + seed.charAt(1);
    var alto = seed.charAt(2) + seed.charAt(3);
    var conta = 0;
    tabla.innerHTML = '';
    for (i = 1; i <= alto; i++) {
        var tehache = document.createElement("tr");
        for (e = 1; e <= largo; e++) {
            var tede = document.createElement("td");
            var input = document.createElement("input");
            input.setAttribute("id", conta);
            input.setAttribute("type", "checkbox");
            input.setAttribute("class", "picrossCel");
            switch (seed.charAt(4 + conta)) {
                case "1":
                    var checkValue = true;
                    console.log("true");
                    break;
                case "0":
                    var checkValue = false;
                    console.log("false");
                    break;
                default:
                    console.log("error");
            }
            input.checked = checkValue;
            tede.appendChild(input);
            tehache.appendChild(tede);
            conta++
        }
        tabla.appendChild(tehache);
    }
}

//displays the playfield
function crearTablaP() {
    document.getElementById("seed").disabled = true;
    var seed = decompress(document.getElementById("seed").value);
    piRAM = seed.toString();
    var tabla = document.getElementById("tabla");
    var largo = parseInt(seed.charAt(0) + seed.charAt(1));
    var alto = parseInt(seed.charAt(2) + seed.charAt(3));
    console.log(largo + ", " + alto)
    var conta = 1;
    var contaC = -1;
    var contaR = 0;
    tabla.innerHTML = '';
    for (i = 0; i <= alto; i++) {
        var tehache = document.createElement("tr");
        if (i == 0) {
            for (e = 0; e <= largo; e++) {
                var tede = document.createElement("td");
                var span = document.createElement("div");
                var lineBreak = document.createElement("br");
                span.setAttribute("id", "c" + (contaC));
                tede.setAttribute("class", "verticalTableHeader");
                if(contaC>=0){
                    var content = getStringInfo("col", contaC)
                    span.innerHTML = content.replace(/ /g, "<br>");
                    console.log( i+" "+e + " doneteC " + contaC);
                }
                else{
                    span.textContent = "";
                }
                tede.appendChild(span);
                tehache.appendChild(tede);
                contaC++
            }
        }
        else {
            for (e = 0; e <= largo; e++) {
                if (e == 0) {
                    var tede = document.createElement("td");
                    var span = document.createElement("span");
                    span.setAttribute("id", "r" + contaR);
                    tede.setAttribute("class", "horizontalTableHeader");
                    if(contaR>=0){
                        span.textContent = getStringInfo("row", contaR);
                        console.log("doneteR " + contaR);
                    }
                    tede.appendChild(span);
                    tehache.appendChild(tede);
                    contaR++
                }
                else {
                    var tede = document.createElement("td");
                    var input = document.createElement("input");
                    input.setAttribute("id", conta);
                    input.setAttribute("type", "checkbox");
                    input.setAttribute("class", "picrossCel");
                    tede.appendChild(input);
                    tehache.appendChild(tede);
                    conta++
                }
            }
        }
        tabla.appendChild(tehache);
    }
}

//check wether the solution is correct
function check(){
    var seed = document.getElementById("seed").value;
    var largo = parseInt(seed.charAt(0) + seed.charAt(1));
    var alto = parseInt(seed.charAt(2) + seed.charAt(3));
    document.getElementById("largo").value = largo
    document.getElementById("alto").value = alto
    generate();
    if (compress(piRAM)==seed) {
        document.getElementById("code").innerHTML = "correct"
        console.log("correct");
    }
    else {
        document.getElementById("code").innerHTML = "incorrect"
        console.log("incorrect");
    }
}

function showCode(){
    var code = document.getElementById("code");
    code.innerHTML = compress(piRAM);
}