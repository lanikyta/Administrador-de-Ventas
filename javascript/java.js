const btnNuevaVenta = document.getElementById('nuevaVenta')
const modalVenta = document.getElementById('modalNueva')
const cancelarBtn = document.querySelectorAll('.cancelar')
const modalEditar = document.getElementById('modalEdit')
const btnEditar = document.querySelectorAll('.verde')
const btnEliminar = document.querySelectorAll('.rojo')
const submitGuardar = document.getElementById('btnguardar')
const modalEliminar = document.getElementById('modalEliminar')//no funciona equisde
const ventasCaballito = document.getElementById('ventasCaballito')
const ventasCentro = document.getElementById('ventasCentro')
const overlay = document.querySelector(".overlay")
const thTabla = document.getElementById('encabezadoTabla')

//Cargar datos tabla

const tablaVentas=document.getElementById('tbody')
const crearTablaVentas=()=>{
    tablaVentas.innerHTML=""
    for(let i = 0; i < ventas.length; i++){
        const crearFilas=document.createElement('tr')
        tablaVentas.appendChild(crearFilas);
        for (let z = 1; z < ventas[i].length; z++) {
            crearFilas.innerHTML+= `<td>${ventas[i][z]}</td>`

        }
    }
}
crearTablaVentas()

//funcionalidad botones
btnNuevaVenta.addEventListener('click',()=>{
    modalVenta.classList.remove('hidden')
    overlay.classList.remove('hidden')
})

let presionarCancelar = ()=>{
    modalVenta.classList.add('hidden')
    modalEditar.classList.add('hidden')
    overlay.classList.add('hidden')
}
for (let t=0; t<cancelarBtn.length;t++){
    cancelarBtn[t].addEventListener('click', presionarCancelar)
}
//tabla
//boton editar
let showEditar = ()=>{
    modalEditar.classList.remove('hidden')
    overlay.classList.remove('hidden')
}
for (let r=0; r<btnEditar.length;r++){
    btnEditar[r].addEventListener('click', showEditar)
}

//Guardar info
var selectVendedora = document.getElementById('vendedora')
var selectComponentes = document.querySelector('#componentes')
var selectSucursal = document.getElementById('sucursal')
var selectFecha = document.getElementById('fecha')

let vendedora, sucursal, componentesVenta, fecha;

const getData=()=>{
    vendedora = selectVendedora.value
    //componentescompra
    componentesVenta = []
    for (let x = 0; x < selectComponentes.selectedOptions.length; x++) {
            componentesVenta[x]=(selectComponentes.selectedOptions[x].value)
    }
    sucursal = selectSucursal.value
    fecha = selectFecha.value
}

//boton guardar
submitGuardar.addEventListener('click', (e)=>{
    /*e.preventDefault()*/
    getData()
    agregarLaVenta()
    modalVenta.classList.add('hidden')
    overlay.classList.add('hidden')
    crearTablaVentas()
   
})

//recorrer y pushear ventas
let arrayVenta = []
const agregarLaVenta=()=>{
    const arrayVenta = [(ventas.length+1), new Date (fecha), vendedora, sucursal, componentesVenta]
   ventas.push(arrayVenta)
}
//precio
/*const arrPreciosVenta=[]
const mostrarPrecio=(componente)=>{
    const producto = precios.find(arr=> arr[0] === componente)
    if (producto) {
        arrPreciosVenta.push(producto[1])
    }
    let precio=arrPreciosVenta.reduce((first, second)=>(first+second))
}

for(let i = 0; i < ventas.length; i++){
let compVenta = ventas[i][4]
        mostrarPrecio(compVenta)
}*/

//Producto estrella
//productos
let productos = []
for (let p=0; p<precios.length;p++) {
    productos.push(precios[p][0])
}

const cantidadCadaProducto = (producto) =>{
    let cadaComponente=[]
        for (let c = 0; c < ventas.length; c++) {
            if(ventas[c][4].includes(producto)){
                cadaComponente.push(ventas[c][4].filter(element => element === producto))
             
               }}
    return cadaComponente.length
   
}

/*const componenteMasVendido = () =>{
    
}
*/