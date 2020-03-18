function crearTabla(){
    var tabla = document.getElementById("tabla");
    var largo = document.getElementById("largo").value;
    var alto = document.getElementById("alto").value;
    var conta = 1;
    tabla.innerHTML = '';
    for(i=1;i<=alto;i++){
        var tehache = document.createElement("tr");
        for(e=1;e<=largo;e++){
            var tede = document.createElement("th");
            var input = document.createElement("input");
            input.setAttribute("id", conta);
            input.setAttribute("type", "checkbox");
            tede.appendChild(input);
            tehache.appendChild(tede);
            conta++
        }
        tabla.appendChild(tehache);
    }
}

function generate(){
    var largo = document.getElementById("largo").value;
    var alto = document.getElementById("alto").value;
    var code = document.getElementById("code");
    var picross = [largo,alto];
    for(i=1;i<=largo*alto;i++){
        if(document.getElementById(i).checked == true){
            picross.push(1);
        }
        else{
            picross.push(0);
        }
    }
    console.log(picross);
    code.innerHTML = picross;
}