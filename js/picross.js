var piRAM; //global variable for storing current picross string

//show picross board with input data
function crearTabla(){
    var tabla = document.getElementById("tabla");
    var largo = document.getElementById("largo").value;
    var alto = document.getElementById("alto").value;
    var conta = 1;
    tabla.innerHTML = '';
    for(i=1;i<=alto;i++){
        var tehache = document.createElement("tr");
        for(e=1;e<=largo;e++){
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
function generate(){
    var largo = document.getElementById("largo").value;
    var alto = document.getElementById("alto").value;
    if(largo.length == 1){
        largo = "0"+largo;
    }
    if(alto.length == 1){
        alto = "0"+alto;
    }
    var picross = [largo,alto];
    for(i=1;i<=largo*alto;i++){
        if(document.getElementById(i).checked == true){
            picross.push(1);
        }
        else{
            picross.push(0);
        }
    }
    piRAM = picross.toString().replace(/,/g, '');
    console.log(piRAM);
}

//get an specific row
function getRow(tRow){
    var picrossImp = piRAM;
    var equis = picrossImp[0]+picrossImp[1];
    var row = [];
    for(i=0;i<equis;i++){
        row.push(picrossImp[4+tRow*equis+i]);
    }
    return row;
}

function getCol(tCol){
    var picrossImp = piRAM;
    var iy = picrossImp[2]+picrossImp[3];
    var col = [];
    for(i=0;i<iy;i++){
        col.push(picrossImp[4+tCol+iy*i]);
    }
    return col;
}

function getStringInfo(tType,tStr){
    switch(tType){
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
    console.log(Str.length + ", " + Str);
    for(i=0;i<Str.length;i++){
        if(Str[i]==1){
            conde++;
        }
        else{
            final.push(conde);
            conde = 0;
        }
    }
    final.push(conde);
    for(i=final.length-1;i>=0;i--) {
        if(final[i] === 0) {
            final.splice(i, 1);
        }
    }
    return final.toString().replace(/,/g, ' ');
}

function BtD(bstr) { 
    return BigInt(parseInt((bstr + '').replace(/[^01]/gi, ''), 2));
}

function compress(unStr){
    var ex = unStr[0] + unStr[1];
    var why = unStr[2] + unStr[3];
    var length = ex*why;
    var toCompress = "";

    for(i=0;i<length;i++){
        toCompress = toCompress.concat(unStr[4+i]);
    }
    //console.log(toCompress);
    var compressed = BigInt('0b' + toCompress).toString(16);
    var final = ex + why + compressed
    //console.log(compressed);
    return final;
}

//uncomplete, trying to figure out
function decompress(compStr){
    var ex = compStr.charAt(0) + compStr.charAt(1);
    var why = compStr.charAt(2) + compStr.charAt(3);
    var length = ex*why;
    var toDecompress = "";

    for(i=0;i<length;i++){
        toDecompress = toDecompress.concat(compStr.charAt(4+i));
    }

    var decompStr = BigInt("0x" + toDecompress).toString(2);
    var final = ex + why + decompStr;
    //console.log(decompStr);
    return final;
}

function crearTablaJ(){
    var seed = document.getElementById("seed").value;
    var tabla = document.getElementById("tabla");
    var largo = seed.charAt(0) + seed.charAt(1);
    var alto = seed.charAt(2) + seed.charAt(3);
    var conta = 0;
    tabla.innerHTML = '';
    for(i=1;i<=alto;i++){
        var tehache = document.createElement("tr");
        for(e=1;e<=largo;e++){
            var tede = document.createElement("td");
            var input = document.createElement("input");
            input.setAttribute("id", conta);
            input.setAttribute("type", "checkbox");
            input.setAttribute("class", "picrossCel");
            input.checked = seed.charAt(4+conta);
            tede.appendChild(input);
            tehache.appendChild(tede);
            conta++
        }
        tabla.appendChild(tehache);
    }
}