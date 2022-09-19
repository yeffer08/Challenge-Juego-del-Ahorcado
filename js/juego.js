let palabrita;
let cant_errores = 0; 
let cant_aciertos = 0; 

const palabras = [
    'php',     
    'laravel',     
    'angular',    
    'html',       
    'react',     
    'python',       
    'java',   
    'flutter'    
];
const btn = id('jugar');
const btn2 = id('dejarDeJugar');
const btn3 = id('palabraNueva');
const imagen = id('imagen');
const btn_letras = document.querySelectorAll("#letras button");

/* click en iniciar juego */
btn.addEventListener('click', iniciar);
/* click para desistir juego */
btn2.addEventListener('click', desistir);
/* click para agregar palabra del juego */
btn3.addEventListener('click', nuevaPalabras);



function iniciar(event) {

    imagen.src = 'css/img/img0.png';
    btn.disabled = true;
    btn2.disabled = false;
    btn3.disabled = true;
    cant_errores = 0;
    cant_aciertos = 0;
    id('resultado').innerHTML = " ";
    id('palabra_nueva').style.display = 'none';
    id('Guardar').style.display = 'none';
    
    

    const parrafo = id('palabra_a_adivinar');
    parrafo.innerHTML = ' ';

    const cant_palabras = palabras.length;
    const valor_al_azar = obtener_random(0, cant_palabras);

    palabrita = palabras[valor_al_azar];
    console.log(palabrita);
    const cant_letras = palabrita.length;

    for (let i = 0; i < btn_letras.length; i++) {
        btn_letras[i].style.background="rgb(138, 50, 3)";
        btn_letras[i].disabled = false;
    }

    for (let i = 0; i < cant_letras; i++) {
        const span = document.createElement('span');
        parrafo.appendChild(span);
    }

}

function desistir(event) {
    id('resultado').innerHTML = "Perdiste, la palabra era " + palabrita;
    game_over();
}

function nuevaPalabras(event) {
    id('palabra_nueva').style.display = 'block';
    id('Guardar').style.display = 'block';
    id('resultado').innerHTML = " ";

    id('Guardar').addEventListener('click', function () {
        palabrita = id('palabra_nueva').value;
        console.log(palabrita);
        Guardar();
    });

}

function Guardar(event) {
    imagen.src = 'css/img/img0.png';
    cant_errores = 0;
    cant_aciertos = 0;

    btn.disabled = true;
    btn2.disabled = false;
    btn3.disabled = true;

    const parrafo = id('palabra_a_adivinar');
    parrafo.innerHTML = ' ';
    id('resultado').innerHTML = " ";
    const cant_letras = palabrita.length;
    for (let i = 0; i < btn_letras.length; i++) {
        btn_letras[i].style.background="rgb(138, 50, 3)";
        btn_letras[i].disabled = false;
    }

    for (let i = 0; i < cant_letras; i++) {
        const span = document.createElement('span');
        parrafo.appendChild(span);
    }
    id('palabra_nueva').style.display = 'none';
    id('Guardar').style.display = 'none';
    
}


/* click de adivinar letra */
for (let i = 0; i < btn_letras.length; i++) {
    btn_letras[i].addEventListener('click', click_letras);
}

function click_letras(event) {
    const spans = document.querySelectorAll('#palabra_a_adivinar span');
    const button = event.target;
    button.disabled = true;
    button.style.background= "black";

    const letra = button.innerHTML.toUpperCase();
    const palabra = palabrita.toUpperCase(); // .toLowerCase( )

    let acerto = false;
    for (let i = 0; i < palabra.length; i++) {
        if (letra == palabra[i]) {
            spans[i].innerHTML = letra;
            cant_aciertos++;
            acerto = true;
        }
    }

    if (acerto == false) {
        cant_errores++;
        const source = `css/img/img${cant_errores}.png`;
        imagen.src = source;
    }

    if (cant_errores == 7) {
        id('resultado').innerHTML = "Perdiste, la palabra era " + palabrita;
        game_over();
    } else if (cant_aciertos == palabrita.length) {
        id('resultado').innerHTML = "GANASTE!! WIIIIII";
        game_over();
    }
    console.log("la letra " + letra + " en la palabra " + palabra + " ¿existe?: " + acerto);
}


/* fin del juego */
function game_over() {
    for (let i = 0; i < btn_letras.length; i++) {
        btn_letras[i].disabled = true;
    }
    
    btn.disabled = false;
    btn2.disabled = true;
    btn3.disabled = false;
}



game_over();