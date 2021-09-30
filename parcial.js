const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let datos; // se declaran los datos

let cargaDatos = false;

let diccionarioOrdenes = []; // diccionario de ordenes de productos

function getCargaDatos() {
  return cargaDatos;
}

function toggleCargaDatos() {
  cargaDatos = !cargaDatos;
}

async function fetchData() {
  try {
    const response = await fetch(url);
    const productos = await response.json();

    // se llena un diccionario con todos los productos ofrecidos
    // con este se llevara la cuenta de los pedidos
    productos.forEach((item) => {
      item.products.forEach((producto) => {
        diccionarioOrdenes.push({
          qty: 0,
          description: producto["name"],
          price: producto["price"],
        });
      });
    });
    return productos;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

// 0: burgers, 1: tacos, 2: salads, 3: desserts, 4: Drinks & Sides
async function loadData(posicionProducto, vista) {
  if (vista === 0) {
    // solo se cargan los datos la primera vez
    if (!getCargaDatos()) {
      datos = await fetchData(); // se cargan los datos
      toggleCargaDatos();
    }

    let contenido = document.getElementById("comidas");

    let dflex = document.createElement("div");
    dflex.className = "d-flex align-items-center justify-content-center";
    dflex.style.height = "8vh";
    let nombreProducto = document.createElement("h1");
    nombreProducto.innerHTML = datos[posicionProducto]["name"];
    dflex.appendChild(nombreProducto);
    let separador = document.createElement("hr");

    contenido.innerHTML = "";
    contenido.appendChild(dflex);
    contenido.appendChild(separador);

    for (let i = 0; i < datos[posicionProducto]["products"].length; i++) {
      let food = datos[posicionProducto]["products"][i];
      let name = food["name"];
      let description = food["description"];
      let price = food["price"];
      let image = food["image"];

      // a cada columna le caben 4 cartas
      let col = document.createElement("div");
      col.className = "col-md-3 d-flex align-items-stretch";
      col.style.marginBottom = "1em";

      //creación carta
      let card = document.createElement("div");
      card.className = "card";

      //imagen
      let imgPhoto = document.createElement("img");
      imgPhoto.src = image;
      imgPhoto.className = "card-img-top";
      card.appendChild(imgPhoto);

      //nombre comida
      let h5 = document.createElement("h5");
      h5.className = "card-header";
      h5.innerHTML = name;
      card.appendChild(h5);

      //descripcion y precio
      let body = document.createElement("div");
      body.className = "card-body";
      let p1 = document.createElement("p");
      let p2 = document.createElement("strong");
      p1.className = "card-text";
      p2.className = "card-text";
      p1.innerHTML = description;
      p2.innerHTML = "$" + price;
      body.appendChild(p1);
      body.appendChild(p2);
      card.appendChild(body);

      //botón add cart
      let foot = document.createElement("div");
      foot.className = "card-footer";
      let button = document.createElement("button");
      button.className = "btn btn-dark float-left botonCompra";
      button.onclick = anadirOrden;
      button.type = "button";
      button.innerHTML = "Add to car";
      foot.appendChild(button);
      card.append(foot);

      // se añade la carta al div
      col.appendChild(card);

      // se añade el div al html
      contenido.appendChild(col);
    }
  }

  if (vista === 1) {
    let contenido = document.getElementById("comidas");

    let dflex = document.createElement("div");
    dflex.className = "d-flex align-items-center justify-content-center";
    dflex.style.height = "8vh";
    let nombreProducto = document.createElement("h1");
    nombreProducto.innerHTML = "Order detail";
    dflex.appendChild(nombreProducto);
    let separador = document.createElement("hr");

    contenido.innerHTML = "";
    contenido.appendChild(dflex);
    contenido.appendChild(separador);

    let htmlTabla = `<table class="table table-stripped">
            <thead>
            <tr>
                <th scope="col">Item</th>
                <th scope="col">Qty</th>
                <th scope="col">Description</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Amount</th>
                <th scope="col">Modify</th>
            </tr>
            </thead>
            <tbody id="inf"></tbody>
        </table>`;

    contenido.innerHTML += htmlTabla;

    let totalOrden = 0;
    let conteo = 0;
    for (let i = 0; i < diccionarioOrdenes.length; i++) {
      if (diccionarioOrdenes[i]["qty"] > 0) {
        let row = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = conteo + 1;

        let td2 = document.createElement("td");
        td2.innerHTML = diccionarioOrdenes[i]["qty"];

        let td3 = document.createElement("td");
        td3.innerHTML = diccionarioOrdenes[i]["description"];

        let td4 = document.createElement("td");
        td4.innerHTML = diccionarioOrdenes[i]["price"];

        let td5 = document.createElement("td");
        td5.innerHTML = (
          diccionarioOrdenes[i]["price"] * diccionarioOrdenes[i]["qty"]
        ).toFixed(2);
        totalOrden += Number(
          diccionarioOrdenes[i]["price"] * diccionarioOrdenes[i]["qty"]
        );

        let td6 = document.createElement("td");

        let agregar = document.createElement("a");
        agregar.className = "btn";
        agregar.onclick = agregarProducto;
        agregar.type = "button";
        agregar.innerHTML = "+";
        agregar.style.color = "white";
        agregar.style.backgroundColor = "black";
        agregar.style.width = "3vh";
        agregar.style.marginRight = "2px";
        agregar.style.padding = 0;

        let quitar = document.createElement("a");
        quitar.className = "btn";
        quitar.onclick = restarProducto;
        quitar.type = "button";
        quitar.innerHTML = "-";
        quitar.style.color = "white";
        quitar.style.backgroundColor = "black";
        quitar.style.width = "3vh";
        quitar.style.padding = 0;

        td6.appendChild(agregar);
        td6.appendChild(quitar);

        conteo++;

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);

        document.getElementById("inf").appendChild(row);
      }

      if (i === diccionarioOrdenes.length - 1 && conteo > 0) {
        let rowPrincipal = document.createElement("div");
        rowPrincipal.className = "row";
        rowPrincipal.style.width = "100%";

        let div1 = document.createElement("div");
        div1.className = "col-md-9 align-self-center";

        let div2 = document.createElement("div");
        div2.className = "col-md-3";

        div1.innerHTML = "Total: $" + Number(totalOrden).toFixed(2);

        let buttonCancel = document.createElement("button");
        buttonCancel.className = "btn float-left";
        buttonCancel.type = "button";
        buttonCancel.innerHTML = "Cancel";
        buttonCancel.style.marginRight = "2px";
        buttonCancel.style.backgroundColor = "#FF5050";
        buttonCancel.setAttribute("data-toggle", "modal");
        buttonCancel.setAttribute("data-target", ".modal");

        let buttonConfirm = document.createElement("button");
        buttonConfirm.className = "btn float-left";
        buttonConfirm.onclick = aceptarCompra;
        buttonConfirm.type = "button";
        buttonConfirm.innerHTML = "Confirm order";
        buttonConfirm.style.marginRight = "2px";
        buttonConfirm.style.backgroundColor = "rgb(240,230,221)";

        div2.appendChild(buttonCancel);
        div2.appendChild(buttonConfirm);

        rowPrincipal.appendChild(div1);
        rowPrincipal.appendChild(div2);

        document
          .getElementById("inf")
          .parentNode.parentNode.appendChild(rowPrincipal);
      }
    }
  }
}

loadData(0, 0); // datos cargados

// referente a hamburguesa
document.getElementById("b0").addEventListener("click", function () {
  loadData(0, 0);
});
// referente a tacos
document.getElementById("b1").addEventListener("click", function () {
  loadData(1, 0);
});
// referente a ensaladas
document.getElementById("b2").addEventListener("click", function () {
  loadData(2, 0);
});
// referente a postres
document.getElementById("b3").addEventListener("click", function () {
  loadData(3, 0);
});
// referente a bebidas
document.getElementById("b4").addEventListener("click", function () {
  loadData(4, 0);
});
// referente al carrito de compra
document.getElementById("ordenes").addEventListener("click", function () {
  loadData(null, 1);
});

function agregarProducto(element) {
  const parent = element.target.parentNode.parentNode;
  const eTarget = parent.children[2].textContent;
  for (let i = 0; i < diccionarioOrdenes.length; i++) {
    if (diccionarioOrdenes[i]["description"] === eTarget) {
      diccionarioOrdenes[i]["qty"] += 1;
      loadData(null, 1);
      sumarCarro();
    }
  }
}

function restarProducto(element) {
  const parent = element.target.parentNode.parentNode;
  const eTarget = parent.children[2].textContent;
  for (let i = 0; i < diccionarioOrdenes.length; i++) {
    if (diccionarioOrdenes[i]["description"] === eTarget) {
      diccionarioOrdenes[i]["qty"] -= 1;
      loadData(null, 1);
      restarCarro();
    }
  }
}

function aceptarCompra() {
  let ordenAImprimir = [];
  for (let i = 0; i < diccionarioOrdenes.length; i++) {
    conteo = 1;
    if (diccionarioOrdenes[i]["qty"] > 0) {
      let diccAMostrar = {
        item: conteo,
        quantity: diccionarioOrdenes[i]["qty"],
        description: diccionarioOrdenes[i]["description"],
        unitPrice: diccionarioOrdenes[i]["price"],
      };
      ordenAImprimir.push(diccAMostrar);
    }
  }
  // eslint-disable-next-line no-console
  console.log(ordenAImprimir);
}

function sumarCarro() {
  let numItems = document.getElementById("carroItems");
  let valor = numItems.textContent;
  num = Number(valor.substr(0, valor.indexOf(" ")));
  num += 1;
  numItems.innerHTML = num + " items";
}

function restarCarro() {
  let numItems = document.getElementById("carroItems");
  let valor = numItems.textContent;
  num = Number(valor.substr(0, valor.indexOf(" ")));
  num -= 1;
  numItems.innerHTML = num + " items";
}

function vaciarCarro() {
  let numItems = document.getElementById("carroItems");
  numItems.innerHTML = 0 + " items";
}

function anadirOrden(element) {
  let nombreProducto =
    element.target.parentElement.parentElement.children[1].textContent; // se busca la parte de la tarjeta con el nombre del producto
  for (let i = 0; i < diccionarioOrdenes.length; i++) {
    if (diccionarioOrdenes[i]["description"] === nombreProducto) {
      diccionarioOrdenes[i]["qty"] += 1;
      break;
    }
  }
  sumarCarro();
}

let btnCancel = document.getElementById("cancelar");
btnCancel.style.backgroundColor = "rgb(243,233,221)";
btnCancel.style.color = "black";

let btnContinue = document.getElementById("continuar");
btnContinue.style.backgroundColor = "rgb(251,86,90)";
btnContinue.style.color = "black";

btnCancel.addEventListener("click", function () {
  for (let i = 0; i < diccionarioOrdenes.length; i++) {
    if (diccionarioOrdenes[i]["qty"] > 0) {
      diccionarioOrdenes[i]["qty"] = 0;
    }
  }
  loadData(null, 1);
  vaciarCarro();
});
