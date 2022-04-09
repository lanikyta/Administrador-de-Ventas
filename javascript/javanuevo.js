//VARIABLES GLOBALES
const btnNuevaVenta = document.getElementById('nuevaVenta')
const modalVenta = document.getElementById('modalNueva')
const cancelarBtn = document.querySelectorAll('.cancelar')
const modalEditar = document.getElementById('modalEdit')
const btnEditar = document.querySelectorAll('.verde')
const btnEliminar = document.querySelectorAll('.rojo')
const submitGuardar = document.getElementById('btnguardar')
const modalEliminar = document.getElementById('modalEliminar')//no funciona equisde
const vendedoraMejor = document.getElementById('vendMejor')
const prodEstrella = document.getElementById('prodEstr')
const tablaVentaSuc = document.getElementById('tablaSuc')
const overlay = document.querySelector(".overlay")
const thTabla = document.getElementById('encabezadoTabla')
const tablaVentas=document.getElementById('tbody')
//AUXILIARES
const { precios, ventas, vendedoras, sucursales} = local
const precioComponente = (componente) =>{
    for (const precio of precios){
        if(precio.componente === componente){
            return precio.precio
        }
    }
}
const contador = (array) =>{
    let totalGanado = 0
    for (const venta of array){
        totalGanado += precioMaquina(venta.componentes) 
    }
    return totalGanado
}
const cantidadVentasComponente = (componente) => {
    let cantidadComponente = 0;
    for (let venta of ventas){
        for (let parteVenta of venta.componentes){
        parteVenta === componente ? cantidadComponente += 1 : false
    }}
    return cantidadComponente
}
const ventasPorVendedora = (nombreVendedora)=> ventas.filter(venta => venta.nombreVendedora === nombreVendedora)
const ventasSucursal = (sucursal) => contador(ventas.filter(venta => venta.sucursal === sucursal))
const filtrarFecha = (mes, anio) => { 
        let filtradoPorFecha = ventas.filter(venta => {
        if(venta.fecha.getMonth() === (mes-1) && venta.fecha.getFullYear() === anio){
            return true
        }})
         return filtradoPorFecha
    }
//precio
const precioMaquina = (componentes)=>{
    let sumaPreciosComponentes = 0
    for (const componente of componentes){
        sumaPreciosComponentes += precioComponente(componente)
    }
    return sumaPreciosComponentes
}

//Producto estrella
const componenteMasVendido = ()=>{
    let componentes = []
    let cantidadComponenteVendido = 0
    let masVendido = ""
        for (let precio of precios) {
            !componentes.includes(precio.componente) ? componentes.push(precio.componente) : false
        }
        for (let componente of componentes){
            if(cantidadComponenteVendido < cantidadVentasComponente(componente)){
                cantidadComponenteVendido = cantidadVentasComponente(componente)
                masVendido = componente
            }
        } return masVendido
}
//la que mas vendio
const vendedoraHistorica = ()=> {
    let cantidadAcumulada = 0
    let vendedoraMayor =""
    for (let vendedora of vendedoras){
        if(cantidadAcumulada < contador(ventasPorVendedora(vendedora))){
            cantidadAcumulada = contador(ventasPorVendedora(vendedora))
            vendedoraMayor = vendedora
    } 
}return vendedoraMayor
}
//asdasdasd
/*const cambiarMap=()=> {
     const fechaModif = 
console.log(ventas)

console.log(fechaModif)
}
cambiarMap()*/
//Cargar datos tabla ventas por sucursal
const crearTablaVentasSucursal=()=>{
    /*ventas ventasCentro.innerHTML=""*/
    for (const sucursal of sucursales){
            tablaVentaSuc.innerHTML += `<td>${sucursal}</td>`+`<td>$${ventasSucursal(sucursal)}<td>`
    }
}
crearTablaVentasSucursal()
//Cargar datos Producto Estrella:
const cargarDatoProductoEstrella = ()=>{
    prodEstrella.innerHTML= `${componenteMasVendido()}`
}
cargarDatoProductoEstrella()
//Cargar datos mejor vendedora 
const mejorVendedora = ()=>{
    vendedoraMejor.innerHTML= `${vendedoraHistorica()}`
}
mejorVendedora()
//Cargar datos tabla VENTAS

const crearTablaVentas=()=>{
    tablaVentas.innerHTML=""
    for(let i = 0; i < ventas.length; i++){
        const crearFilasTabla=document.createElement('tr')
        tablaVentas.appendChild(crearFilasTabla);
            crearFilasTabla.innerHTML = `<td>${ventas[i].fecha.toLocaleDateString()}</td>` + `<td>${ventas[i].nombreVendedora}</td>` + `<td>${ventas[i].componentes}</td>` + `<td>${ventas[i].sucursal}</td>` + `<td>$${precioMaquina(ventas[i].componentes)}</td>`
    }
}
crearTablaVentas()

//funcionalidad botones
btnNuevaVenta.addEventListener('click',()=>{
    modalVenta.classList.remove('hidden')
    overlay.classList.remove('hidden')
})

const presionarCancelar = ()=>{
    modalVenta.classList.add('hidden')
    modalEditar.classList.add('hidden')
    overlay.classList.add('hidden')
}
for (let t=0; t<cancelarBtn.length;t++){
    cancelarBtn[t].addEventListener('click', presionarCancelar)
}
//tabla
//boton editar
const showEditar = ()=>{
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
let objNuevaVenta = {}
const agregarLaVenta=()=>{
    objNuevaVenta = {fecha: new Date (fecha), nombreVendedora: vendedora, componentes: componentesVenta, sucursal: sucursal}
   ventas.push(objNuevaVenta)
}

