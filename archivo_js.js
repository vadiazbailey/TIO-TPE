"use strict"
/* primera parte tp*/
document.addEventListener("DOMContentLoaded", function () {
    function compararCaptcha() {
        let captcha = document.getElementById("captcha").value;
        let input = document.getElementById("input").value;
        if (captcha == input) {
            alert("Captcha correcto");
        }
        else {
            alert("Captcha invalido.Intente otra vez");
            generarCaptcha();
            document.getElementById("formulario2").reset();
        }
    }

    function generarCaptcha() {
        let referencia = "";
        for (let i = 0; i < cantidad_maxima_captcha; i++) {
            let numero = Math.floor(Math.random() * 10);
            referencia += numero;
        }
        let captcha2 = document.getElementById("captcha");
        captcha2.innerHTML = referencia;
        captcha.value = referencia;
    }

    function compararContraseña() {
        let password = document.getElementById("password").value;
        let password2 = document.getElementById("password2").value;
        if (password != password2) {
            alert("La contraseña no coincide");
            document.getElementById("formulario2").reset();
        }
    }

    const cantidad_maxima_captcha = 5;

    let inputCaptcha = document.getElementById("verificar");
    if (inputCaptcha != null) {
        inputCaptcha.addEventListener("click", compararCaptcha);
        let inputConfirmacion = document.getElementById("password2");
        inputConfirmacion.addEventListener("change", compararContraseña);
        generarCaptcha();
    }

    /* fin parte 1 */

    /* TP ESPECIAL Parte2 */
    let tabla =
    {
        // "celda1": "Producto Comprado",
        // "celda2": "Sucursal",
        // "celda3": "Calidad del producto",
        // "celda4": "Critica"
    }

    let btn = document.querySelector("#agregar");
    if (btn != null) {
        btn.addEventListener("click", function(){enviarDatos(agregar_tabla)});

        let btn3 = document.querySelector("#agregar3");
        btn3.addEventListener("click", agregar_tabla3);

        let btn_borrar = document.querySelector("#borrar");
        btn_borrar.addEventListener("click", borrar);
        tabla_inicial();

    }

    // inputs
    let inputs_tabla2 = document.querySelectorAll(".input_tabla2");
    // tabla
    let tabla2 = document.querySelector("#tabla2");
    let array = [];

    // funciones
    function tabla_inicial() {

        /* creo un tr para filas */
        let fila = document.createElement("tr")
        /* creo los th para cada celda */
        let celda1 = document.createElement("th");
        let celda2 = document.createElement("th");
        let celda3 = document.createElement("th");
        let celda4 = document.createElement("th");
        /* creo un nodo para poner el contenido de cada celda */
        let nodo1 = document.createTextNode(tabla.celda1);
        let nodo2 = document.createTextNode(tabla.celda2);
        let nodo3 = document.createTextNode(tabla.celda3);
        let nodo4 = document.createTextNode(tabla.celda4);
        /* uno las celdas dentro de cada nodo */
        celda1.appendChild(nodo1);
        celda2.appendChild(nodo2);
        celda3.appendChild(nodo3);
        celda4.appendChild(nodo4);
        /* uno las celdas a cada fila */
        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(celda3);
        fila.appendChild(celda4);
        document.querySelector(".insertar_tabla").appendChild(fila);
    }

    function agregar_tabla() {
        let objeto = {
            "celda1": inputs_tabla2[0].value,
            "celda2": inputs_tabla2[1].value,
            "celda3": inputs_tabla2[2].value,
            "celda4": inputs_tabla2[3].value
        };

        if ((objeto.celda1 != "") && (objeto.celda2 != "") && (objeto.celda3 != "") && (objeto.celda4 != "")) {
            array.push(objeto);
            tabla2.children[2].innerHTML += "<tr>" + "<td>" + objeto.celda1 + "</td>"
                + "<td>" + objeto.celda2 + "</td>"
                + "<td>" + objeto.celda3 + "</td>"
                + "<td>" + objeto.celda4 + "</td>"
                + "</tr>";
        }
        resaltar();
    }

    function agregar_tabla3() {
        for (let i = 0; i <= 2; i++) {
            enviarDatos(agregar_tabla);
        }
    }

    // async function borrar() {
    //     console.log(tabla2.children[2].children.length);
    //     // for (let y = tabla2.children[2].children.length - 1; y >= 0; y--) {
    //     //     console.log(tabla2.children[2].children[y]);
    //     //     tabla2.children[2].children[y].remove();
    //     //     console.log(tabla2.children[2]);
    //     // }
    //     // tabla = {};
    // ----------------------------
 // PROBAR SI PUEDO LLAMAR A BORRAR DEL SERVIDOR CON ESTO---- 
    //     for(const elem of json.style_fashion){
    //         deleteFila(elem._id);
    //     }
    // }

    // OPCIONALES

    let filtro = document.getElementById("filtrar");
    filtro.addEventListener("keyup", filtrado);

    function filtrado() {
        let coincidencia = false;
        let i = 0;
        let buscar = filtro.value.toUpperCase();
        let tr = tabla2.getElementsByTagName('tr');
        for (let j = 0; j < tabla2.rows.length; j++) {
            coincidencia = false;
            i = 0;
            let td = tr[j].getElementsByTagName('td');
            while ((!coincidencia) && (i < td.length)) {
                let comparar = td[i].innerHTML.toUpperCase();
                console.log(buscar);
                console.log(comparar);
                let aux = comparar.indexOf(buscar);
                console.log(aux);
                if (comparar.indexOf(buscar) > -1) {
                    tr[j].classList.remove("ocultar");
                    coincidencia = true;
                } else {
                    tr[j].classList.add("ocultar");
                }
                i++;
            }
        }
    }

    function resaltar() {
        let i = 0;
        let coincide = false;
        let valor_resaltado = "EXCELENTE";
        console.log(valor_resaltado);
        let tr = tabla2.getElementsByTagName('tr');

        for (let j = 0; j < tabla2.rows.length; j++) {
            console.log(tabla2.rows.length);
            let td = tr[j].getElementsByTagName('td');
            coincide = false;
            i = 0;
            while ((!coincide) && (i < td.length)) {
                if (td[2].innerHTML.toUpperCase() == valor_resaltado) {
                    tr[j].classList.add("classlist_color");
                    coincide = true;
                }
                i++;
            }
        }
    }
    //parte 3
    // -----------------------ajax---------------------

    let data = []; 
    let url = "http://web-unicen.herokuapp.com/api/groups/59navarrete_lucero/style_fashion/";
    obtenerDatos();
// -----------------metodo POST--------------------------
    function enviarDatos(crearTabla){ 
        event.preventDefault();

        let producto = document.querySelector(".prod").value;
        let sucursal = document.querySelector(".suc").value;
        let calificacion = document.querySelector(".cal").value;
        let critica = document.querySelector(".crit").value;

        let datos = {
            "thing": {
                "celda1": producto,
                "celda2": sucursal,
                "celda3": calificacion,
                "celda4": critica
            }
        }
        fetch(url, {
            "method": "POST",
            "headers": {
                'content-type': 'application/json'
            },
            "body": JSON.stringify(datos)
        }).then(r=>r.json())
            .then(json=>console.log(json))
                .then(()=>{crearTabla()})
        
    }

    // --------------ametodo GET----------------------
    async function obtenerDatos(){
        let respuesta = await fetch(url);
        if (respuesta.ok){
            let datas = await respuesta.json();    
            data = await datas.style_fashion;
            crearTabla();
            console.log(data);
        }
    }

    function crearTabla (){
        document.getElementById("tabla_body").innerHTML = "";
        data.forEach(dato =>{
        let tr = document.createElement("tr");
        tr.dataset.id = dato._id;
        console.warn(tr.dataset.id);
        
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");

        let tablaBody = document.getElementById("tabla_body");

        let texto1 = document.createElement("span");
        let input1 = document.createElement("input");
        
        texto1.innerHTML = dato.thing.celda1;
        input1.value = dato.thing.celda1;
        input1.classList.toggle("ocultar");
        // ----------esto estaba comentado--------------
        input1.addEventListener("keyup", editFila);

        let texto2 = document.createElement("span");
        let input2 = document.createElement("input");
        console.log("TEXTO2")
        console.log(texto2);
        console.log(input2)
        texto2.innerHTML = dato.thing.celda2;
        input2.value = dato.thing.celda2;
        input2.classList.toggle("ocultar");
        // ----------esto estaba comentado--------------
        input2.addEventListener("keyup", editFila);
        
        let texto3 = document.createElement("span");
        let input3 = document.createElement("input");
        texto3.innerHTML = dato.thing.celda3;
        input3.value = dato.thing.celda3;
        input3.classList.toggle("ocultar");
        // ----------esto estaba comentado--------------
        input3.addEventListener("keyup", editFila);

        let texto4 = document.createElement("span");
        let input4 = document.createElement("input");
        texto4.innerHTML = dato.thing.celda4;
        input4.value = dato.thing.celda4;
        input4.classList.toggle("ocultar");
        // ----------esto estaba comentado--------------
        input4.addEventListener("keyup", editFila);

        let btnEdit = document.createElement("button");
        btnEdit.innerHTML = "Editar"
        // btnEdit.addEventListener("click", function () {editFila(tr.dataset.id, prepararEdit)});
        btnEdit.addEventListener("click", prepararEdit);

        let btnBorrar = document.createElement("button");
        btnBorrar.innerHTML = "Borrar"
        btnBorrar.addEventListener("click", deleteFila);

        td1.appendChild(texto1);
        td1.appendChild(input1);
        td2.appendChild(texto2);
        td2.appendChild(input2);
        td3.appendChild(texto3);
        td3.appendChild(input3);
        td4.appendChild(texto4);
        td4.appendChild(input4);
        td5.appendChild(btnEdit);
        td5.appendChild(btnBorrar);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
  
        tablaBody.appendChild(tr);
        
        })
    }

    function prepararEdit(e){
        let fil = e.target.parentElement.parentElement;

        fil.children[0].children[0].classList.toggle("ocultar");
        fil.children[0].children[1].classList.toggle("ocultar");

        fil.children[1].children[0].classList.toggle("ocultar");
        fil.children[1].children[1].classList.toggle("ocultar"); 

        fil.children[2].children[0].classList.toggle("ocultar");
        fil.children[2].children[1].classList.toggle("ocultar"); 

        fil.children[3].children[0].classList.toggle("ocultar");
        fil.children[3].children[1].classList.toggle("ocultar"); 
    }
//----------------- METODO PUT--------------------
    function editFila(e){
        event.preventDefault();  
        let fil =  e.target.parentElement.parentElement;
        let id = fil.dataset.id;

        if (event.keyCode !== 13) {
            return;
        }
        let producto = fil.children[0].children[1].value;
        let sucursal = fil.children[1].children[1].value;
        let calificacion = fil.children[2].children[1].value;
        let critica = fil.children[3].children[1].value;

        let datos = {
            "thing": {
                "celda1": producto,
                "celda2": sucursal,
                "celda3": calificacion,
                "celda4": critica
            }
        }

        fetch(url + id,{
                "method": "PUT",
                "headers": {'content-type': 'application/json'},
                "body": JSON.stringify(datos)
            }).then (r=>r.json())
            .then(json => {
                console.log(json) 
                obtenerDatos();
        })
       
    }
// --------------METODO DELETE--------
async function borrar() {
    console.log(tabla2.children[2].children.length);
    // for (let y = tabla2.children[2].children.length - 1; y >= 0; y--) {
    //     console.log(tabla2.children[2].children[y]);
    //     tabla2.children[2].children[y].remove();
    //     console.log(tabla2.children[2]);
    // }
    // tabla = {};
//  ------ PROBAR SI PUEDO LLAMAR A BORRAR DEL SERVIDOR ACA ------
    try{
        let respuesta = await fetch(url);
        if (respuesta.ok){
            let json = await respuesta.json();
            console.log(json);
            for(const elem of json.style_fashion){
                try{
                    let respuesta = await fetch(url + elem._id,{
                        "method": "DELETE"
                    });
                    let json = await respuesta.json();
                    console.log (json);
                    obtenerDatos();
                }
                catch(exc){
                    console.log("Error");
                }
                // deleteFila(elem._id);
            }
        }
    }
    catch(e){
        console.log("Error");
    }

}
    async function deleteFila (e, id){
         id = e.target.parentElement.parentElement.dataset.id;
        // let url2 = url + idTabla;
        console.log("Borrado exitoso");
        try {
            let respuesta = await fetch(url + id ,{
                "method": "DELETE"
            });
            let json = await respuesta.json();
            console.log(json);
            obtenerDatos();
        } catch (e) {
            console.log(e);
        }
        
    }

});