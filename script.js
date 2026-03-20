const productos = [

{
nombre:"Top Rosa",
precio:1500,
imagen:"images/top1.jpg",
talles:["S","M","L"]
},

{
nombre:"Top Beige",
precio:1300,
imagen:"images/top2.jpg",
talles:["S","M","L"]
},

{
nombre:"Top Arena",
precio:1800,
imagen:"images/top3.jpg",
talles:["S","M","L"]
},

{
nombre:"Top 4",
precio:1600,
imagen:"images/top4.jpg",
talles:["S","M","L"]
},


]

let carrito = []
let total = 0
function formatearPrecio(precio){

return "$" + precio.toLocaleString("es-UY")

}
const contenedor = document.getElementById("productos-container")

productos.forEach((p,i)=>{

let html = `
<div class="producto">

<img src="${p.imagen}">

<h3>${p.nombre}</h3>

<p>${formatearPrecio(p.precio)}</p>

<div class="talles">
${p.talles.map(t=>`<button onclick="agregar(${i},'${t}')">${t}</button>`).join("")}
</div>

</div>
`

contenedor.innerHTML += html

})

function agregar(i,talle){

let p = productos[i]

carrito.push({

nombre:p.nombre,
precio:p.precio,
talle:talle

})

total += p.precio

render()

}

function render(){

const lista = document.getElementById("cart-items")

lista.innerHTML = ""

carrito.forEach(p=>{

const li = document.createElement("li")

li.innerText = `${p.nombre} (${p.talle}) - ${formatearPrecio(p.precio)}`

lista.appendChild(li)

})

document.getElementById("total").innerText = total.toLocaleString("es-UY")

}

function toggleCart(){

const cart = document.getElementById("cart")
const overlay = document.getElementById("overlay")

cart.classList.toggle("open")
overlay.classList.toggle("active")

}
function scrollProductos(){

document.getElementById("productos").scrollIntoView({

behavior:"smooth"

})

}