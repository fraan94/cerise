const productos = [
    {
        nombre: "Top Rosa",
        precio: 1500,
        imagen: "images/top1.jpg",
        talles: ["S", "M", "L"]
    },
    {
        nombre: "Top Beige",
        precio: 1300,
        imagen: "images/top2.jpg",
        talles: ["S", "M", "L"]
    },
    {
        nombre: "Top Arena",
        precio: 1800,
        imagen: "images/top3.jpg",
        talles: ["S", "M", "L"]
    },
    {
        nombre: "Top 4",
        precio: 1600,
        imagen: "images/top4.jpg",
        talles: ["S", "M", "L"]
    },
]

let carrito = []
let total = 0

function formatearPrecio(precio) {
    return "$" + precio.toLocaleString("es-UY")
}
const contenedor = document.getElementById("productos-container")
productos.forEach((p, i) => {
    let html = `
<div class="producto">
<img src="${p.imagen}">
<h3>${p.nombre}</h3>
<p>${formatearPrecio(p.precio)}</p>
<div class="talles">
${p.talles.map(t => `<button onclick="agregar(${i},'${t}')">${t}</button>`).join("")}
</div>
</div>
`
    contenedor.innerHTML += html
})
function actualizarIndicador(){

    const dot = document.getElementById("cart-dot")

    dot.innerText = carrito.length

    if(carrito.length > 0){
        dot.classList.add("active")
    }else{
        dot.classList.remove("active")
    }

}
function agregar(i, talle) {
    let p = productos[i]
    carrito.push({
        nombre: p.nombre,
        precio: p.precio,
        talle: talle,
        imagen: p.imagen
    })
    total += p.precio
    document.getElementById("cart-dot").classList.add("active")
    actualizarIndicador()
    render()
}
function render(){

    const lista = document.getElementById("cart-items")

    lista.innerHTML = ""

    carrito.forEach((p,index)=>{

        const li = document.createElement("li")

        li.className = "cart-item"

        li.innerHTML = `
            <img src="${p.imagen}" class="cart-thumb">

            <div class="cart-info">
                <strong>${p.nombre}</strong><br>
                Talle: ${p.talle}<br>
                ${formatearPrecio(p.precio)}
            </div>

            <button class="delete-item"
                onclick="eliminarProducto(${index})">
                ✕
            </button>
        `

        lista.appendChild(li)

    })

    document.getElementById("total").innerText =
        total.toLocaleString("es-UY")

    actualizarIndicador()

}
function eliminarProducto(index){

    total -= carrito[index].precio

    carrito.splice(index,1)

    render()

}
function vaciarCarrito(){

    carrito = []

    total = 0

    render()

}
function scrollProductos() {
    document.getElementById("productos").scrollIntoView({
        behavior: "smooth"
    })
}
const tituloOriginal = document.title
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        document.title = "Volvé, tenemos algo para ti💕"
    } else {
        document.title = tituloOriginal
    }
})

const menu = document.getElementById("menu")
const cart = document.getElementById("cart")
const overlay = document.getElementById("overlay")

function abrirMenu(){
menu.classList.add("open")
cart.classList.remove("open")
overlay.classList.add("active")
document.body.style.overflow = "hidden"
}
function abrirCarrito(){
cart.classList.add("open")
menu.classList.remove("open")
overlay.classList.add("active")
document.body.style.overflow = "hidden"
}
function cerrarTodo(){
menu.classList.remove("open")
cart.classList.remove("open")
overlay.classList.remove("active")
document.body.style.overflow = "auto"
}

let startX = 0
menu.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
})
menu.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX
    if(startX - endX > 50){ // swipe hacia la izquierda
        cerrarTodo()
    }
})
let startXcart = 0
menu.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
})
menu.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX
    if(startX - endX > 50){ // swipe hacia la izquierda
        cerrarTodo()
    }
})
