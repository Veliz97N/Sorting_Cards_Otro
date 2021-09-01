let valores_cartas = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let valores_cartas_alfabeticas = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 100,
    "Q": 101,
    "K": 102,
    "A": 103
};
let valores_pintas = ["spade", "club", "heart", "diamond"];
const feedback = document.getElementById("invalid-card");
const inputCards = document.getElementById("inputCards");
const drawCards = document.getElementById("draw");
const cartas = document.getElementById("contenedor-cartas-generadas").children;
const contenedor_ordenadas_global = document.getElementById("contenedor_ordenadas_global");
const sortCards = document.getElementById("sort");
const bubble_div = document.getElementById("bubble");

function RandomIndex(array) {
    let largo_array = array.length;
    let indice_random = Math.floor(Math.random() * (largo_array));
    return indice_random;
}

function RandomCard() {
    const carta = document.createElement("div");
    const suit_arriba = document.createElement("div");
    const suit_abajo = document.createElement("div");
    const numero = document.createElement("div");
    const contenedor_cartas_generadas = document.getElementById("contenedor-cartas-generadas")
    //Se agregan los div al div carta
    carta.appendChild(suit_arriba);
    carta.appendChild(suit_abajo);
    carta.appendChild(numero);
    //Se añaden las clases a cada div creado
    carta.classList.add("carta");
    suit_arriba.classList.add("suit");
    suit_abajo.classList.add("suit");
    numero.classList.add("numero");
    //Se añaden atributos a #suit_arriba y #suit_abajo
    suit_arriba.setAttribute("id", "suit_arriba");
    suit_abajo.setAttribute("id", "suit_abajo");

    //Se añaden pintas y valor numerico a la carta
    let indice_pinta = RandomIndex(valores_pintas);
    const imagen_suit = document.createElement("img");

    if (valores_pintas[indice_pinta] == "spade") {
        imagen_suit.setAttribute("src", "/Suit/1.png");
    } else if (valores_pintas[indice_pinta] == "club") {
        imagen_suit.setAttribute("src", "/Suit/3.png");
    } else if (valores_pintas[indice_pinta] == "heart") {
        imagen_suit.setAttribute("src", "/Suit/2.png");
    } else if (valores_pintas[indice_pinta] == "diamond") {
        imagen_suit.setAttribute("src", "/Suit/4.png");
    }
    let indice_carta = RandomIndex(valores_cartas);
    suit_arriba.appendChild(imagen_suit);
    suit_abajo.appendChild(imagen_suit.cloneNode(true));
    numero.innerText = valores_cartas[indice_carta];
    //Se añade la carta a su contenedor
    contenedor_cartas_generadas.appendChild(carta);
}

function Sorting_Select() {
    let iteracion = 0;
    while (contenedor_ordenadas_global.firstChild) {
        contenedor_ordenadas_global.removeChild(contenedor_ordenadas_global.firstChild);
    }
    let array_cartas = [];
    for (i = 0; i < cartas.length; i++) {
        array_cartas.push(cartas[i]);
    }
    let min = 0;
    while (min < array_cartas.length-1) {
        for ( i = min + 1; i < array_cartas.length; i++) {
            if (valores_cartas_alfabeticas[(array_cartas[min].children[2].innerText)] > valores_cartas_alfabeticas[(array_cartas[i].children[2].innerText)]) {
                iteracion++; //Se suma una iteracion al contador
                let aux = array_cartas[min];
                array_cartas[min] = array_cartas[i];
                array_cartas[i] = aux;
                const contenedor_ordenadas = document.createElement("div");
                const iteracion_div = document.createElement("div"); //Se crea el recuadro de iteracion
                iteracion_div.classList.add("iteracion_div")
                iteracion_div.innerText = iteracion;
                contenedor_ordenadas.classList.add("contenedor_ordenadas");
                contenedor_ordenadas.appendChild(iteracion_div);
                for (x = 0; x < array_cartas.length; x++) {
                    contenedor_ordenadas.appendChild(array_cartas[x].cloneNode(true));
                }
                contenedor_ordenadas_global.appendChild(contenedor_ordenadas);
            }
        }
        min++;
    }
    // let wall = cartas.length - 1;
    // while (wall > 0) {
    //     let index = 0;
    //     while (index < wall) {
    //         if (valores_cartas_alfabeticas[(array_cartas[index].children[2].innerText)] > valores_cartas_alfabeticas[(array_cartas[index + 1].children[2].innerText)]) {
    //             iteracion++; //Se suma una iteracion al contador
    //             let aux = array_cartas[index];
    //             array_cartas[index] = array_cartas[index + 1];
    //             array_cartas[index + 1] = aux;
    //             const contenedor_ordenadas = document.createElement("div");
    //             const iteracion_div = document.createElement("div"); //Se crea el recuadro de iteracion
    //             iteracion_div.classList.add("iteracion_div")
    //             iteracion_div.innerText=iteracion;
    //             contenedor_ordenadas.classList.add("contenedor_ordenadas")
    //             contenedor_ordenadas.appendChild(iteracion_div);
    //             for (x = 0; x < array_cartas.length; x++) {
    //                 contenedor_ordenadas.appendChild(array_cartas[x].cloneNode(true))
    //             }
    //             contenedor_ordenadas_global.appendChild(contenedor_ordenadas);
    //         }
    //         index++;
    //     }
    //     wall--;
    // }
}

inputCards.addEventListener("keyup", () => {
    if (inputCards.value == "" || inputCards.value == null) {
        feedback.style.visibility = "hidden";
    } else if (inputCards.value > 15 || inputCards.value <= 0) {
        feedback.style.visibility = "visible";
    } else {
        feedback.style.visibility = "hidden";
    }
});

drawCards.addEventListener("click", () => {
    if (inputCards.value <= 15 && inputCards.value > 0) {
        bubble_div.style.visibility = "visible";
        let i = 0;
        const contenedor_cartas_generadas = document.getElementById("contenedor-cartas-generadas")
        while (contenedor_cartas_generadas.firstChild) {
            contenedor_cartas_generadas.removeChild(contenedor_cartas_generadas.firstChild);
        }
        while (contenedor_ordenadas_global.firstChild) {
            contenedor_ordenadas_global.removeChild(contenedor_ordenadas_global.firstChild);
        }
        while (i < inputCards.value) {
            RandomCard();
            i++;
        }
    }
});

sortCards.addEventListener("click", () => {
    Sorting_Select();
});