//VARIABLES GENERALES A USAR
var posibilidades="";
var nfc;
var filas;
var juegoFin=true;
var turno = true;
//LO QUE INICIA NADA MAS CARGAR AL PAGINA
function cargar(){
    fContenido();
    cambio_soluciones();
    cambio_juego();
}
//CREACION DEL SELECT Y LAS OPTION DE DENTRO
function fContenido(){
    let elem = document.getElementById("idSelect");     
    for(let i = 3;i<=8;i++){
        let elem2 = document.createElement("option");
        elem2.text=i;
        elem2.value=i;
        elem.appendChild(elem2);
    }

//AÑADIENDO EVENTOS A LOS OPTION
    elem.addEventListener("change",()=>{cambio_soluciones();});
    elem.addEventListener("change",()=>{cambio_juego();});
}

//CREACION DEL ARRAY DE LAS POSIBLES SOLUCIONES
function cambio_soluciones(){
    nfc=parseInt(document.getElementById("idSelect").value)
    filas=(nfc*2)+2;
    let q=0;
    posibilidades=new Array(filas);
    for(i=0;i<filas;i++){
        posibilidades[i]=new Array(nfc);
    }
    for(let i=0;i<nfc;i++){
        for(let j=0;j<nfc;j++){
            posibilidades[q][j]=(i*nfc)+(j+1);
            posibilidades[q+nfc][j]=(j*nfc)+(i+1);
        }
        q++
    }
    q = (nfc*2);

    for(let i=0;i<nfc;i++){
        posibilidades[q][i]=(i*nfc)+(i+1);
        posibilidades[q+1][i]= (i*nfc) + (nfc-i);

    }
    document.getElementById("soluciones").innerHTML=dime();
}

//PINTA LAS SOLUCIONES EN UNA TABLA
function dime(){
    let cadena="<table align='center' border=1 class=posibilidades>";
        let v=1;
        for(let i=0;i<posibilidades.length;i++) {
            cadena +="<tr>";
        for(let j=0;j<posibilidades[i].length;j++) {
            cadena +="<td class=std id=casilla"+v+">"+posibilidades[i][j]+"</td>";
            v++
        }
        cadena +="</tr>";
    }
        cadena +="</table>";
    return cadena;
}

//CREA EL JUEGO EN UNA TABLA CON DIVS EN LAS CELDAS
function cambio_juego() {
    juegoFin=true;
    turno=true;
    document.getElementById("winner").innerText="";
    let destino = document.getElementById("juego");
    destino.innerHTML = "";
    var contador = 1;
    let tabla = document.createElement("table");
    for (let i=1;i<=nfc;i++) {
        let fila = document.createElement("tr");
        for (let u=0;u<nfc;u++) {
            let celda = document.createElement("td");
            let elem = document.createElement("div");
            elem.setAttribute("id", "div_" + contador);
            elem.setAttribute("class", "casillas");
            elem.addEventListener("dblclick",()=>{ganador(elem);});
            elem.innerHTML = "";
            celda.appendChild(elem);
            contador++;
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    destino.appendChild(tabla);
}

//COMPRUEBA SI LA CELDA ESTA MARCADA PARA PONER LA CASILLA
function ganador(casilla){
    if(!juegoFin || casilla.style.backgroundColor!="")return;
    if(turno){
        casilla.style.backgroundColor="red";
        turno = false;
        comprobar();
    }else{
        casilla.style.backgroundColor="blue";
        turno = true;
        comprobar();
    }
    
}

//DETERMINA SI YA HA GANADO UN JUGADOR
function comprobar(){
    for(let fila of posibilidades){
        let color = document.getElementById("div_"+fila[0]).style.backgroundColor
        let acertar=true;
        for(let celda of fila){
            let elem = document.getElementById("div_"+celda);
            if(elem.style.backgroundColor!=color){
                acertar=false;
                break;
            }   
        }
        if(acertar && color){
            document.getElementById("winner").innerHTML="HA GANADO JUGADOR "+color.toUpperCase()
            console.log("GANADOR "+color)
            juegoFin=false;
        
        }
    }
}

window.addEventListener('load',()=>{cargar()});