//VARIABLES GLOBALES
const modalVenta = document.getElementById('modalNueva')
const modalEditar = document.getElementById('modalEdit')
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
//modificar fecha
const formatDateToString1 = (date) =>{
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var anio = date.getFullYear()
    var mm = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
              
    return `${dd}/${mm}/${anio}`
}
const formatDateToString2 = (date) =>{
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    var anio = date.getFullYear()
    var mm = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
              
    return `${anio}-${mm}-${dd}`
}
//Cargar datos tabla ventas por sucursal
const crearTablaVentasSucursal=()=>{
    tablaVentaSuc.innerHTML=""
    for (const sucursal of sucursales){
            tablaVentaSuc.innerHTML += `<td>${sucursal}</td>`+`<td>$${ventasSucursal(sucursal)}<td>`
    }
}

//Cargar datos mejor vendedora y Cargar datos Producto Estrella:
const cargarDatosRender = ()=>{
    prodEstrella.innerHTML= `${componenteMasVendido()}`
    vendedoraMejor.innerHTML= `${vendedoraHistorica()}`
}
//Cargar datos tabla VENTAS
const crearTablaVentas=()=>{
    tablaVentas.innerHTML=""
    for(let i = 0; i < ventas.length; i++){
        const crearFilasTabla=document.createElement('tr')
        tablaVentas.appendChild(crearFilasTabla);
            crearFilasTabla.innerHTML = `<td>${formatDateToString1(ventas[i].fecha)}</td>` + `<td>${ventas[i].nombreVendedora}</td>` + `<td>${ventas[i].componentes}</td>` + `<td>${ventas[i].sucursal}</td>` + `<td>$${precioMaquina(ventas[i].componentes)}</td>` + `<td><button id="${i}" class="btnacciones verde">&nbsp;<i class="fas fa-edit"></i>&nbsp;</button><button id="${i}" class="btnacciones rojo"><i class="fas fa-trash-alt"></i></button></td>`
    }
    crearTablaVentasSucursal()
    cargarDatosRender()
}
crearTablaVentas()
//limpiar formulario
const limpiarFormulario=()=> {
    document.getElementById('formEditVenta').reset()
    document.getElementById('formNuevaVenta').reset()
  }
//funcionalidad botones
const btnNuevaVenta = document.getElementById('nuevaVenta')
let cancelarBtn = document.querySelectorAll('.cancelar')
let submitGuardar = document.getElementById('btnguardar')

//NUEVA VENTA
btnNuevaVenta.addEventListener('click',()=>{
    modalVenta.classList.remove('hidden')
    overlay.classList.remove('hidden')
})
//CANCELAR
const presionarCancelar = ()=>{
    modalVenta.classList.add('hidden')
    modalEditar.classList.add('hidden')
    modalEliminar.classList.add('hidden')
    overlay.classList.add('hidden')
}
for (let t=0; t<cancelarBtn.length;t++){
    cancelarBtn[t].addEventListener('click', presionarCancelar)
}
// ABRIR EDITAR
let idBoton = ""
const recargarListaBotonesV = ()=>{
    let btnEditar = document.querySelectorAll('.verde')
    for (let r=0; r<btnEditar.length;r++){
        btnEditar[r].addEventListener('click', (e)=>{
            modalEditar.classList.remove('hidden')
            overlay.classList.remove('hidden')
            idBoton = btnEditar[r].getAttribute("id")
            showEditarVenta(idBoton)
        })
        
}}
recargarListaBotonesV()
//BOTON EDITAR
let submitEditar = document.getElementById('btneditar')
submitEditar.addEventListener('click', (e)=>{
    getDataEditVenta()
    editarVenta(idBoton)    
    modalEditar.classList.add('hidden')
    overlay.classList.add('hidden')
    crearTablaVentas()
    limpiarFormulario()
    recargarListaBotonesV()
    recargarListaBotonesR()
})
//Boton Abrir Eliminar
const recargarListaBotonesR = ()=>{
    let btnBasurero = document.querySelectorAll('.rojo')
    for (let r=0; r<btnBasurero.length;r++){
        btnBasurero[r].addEventListener('click', (e)=>{
            modalEliminar.classList.remove('hidden')
            overlay.classList.remove('hidden')
            idBoton = btnBasurero[r].getAttribute("id")
        })
}}
recargarListaBotonesR()
//BOTON ELIMINAR
const btnEliminar = document.getElementById('btneliminar')
btnEliminar.addEventListener('click', (e)=>{
    modalEliminar.classList.add('hidden')
    overlay.classList.add('hidden')
    ventas.splice(idBoton,1)
    crearTablaVentas()
    recargarListaBotonesR()
    recargarListaBotonesV()
})
//boton guardar
submitGuardar.addEventListener('click', (e)=>{
    getData()
    agregarLaVenta()
    modalVenta.classList.add('hidden')
    overlay.classList.add('hidden')
    crearTablaVentas()
    recargarListaBotonesV()
    limpiarFormulario()
})
//FUNCIONALIDAD
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
//Pushear Nueva Venta
let objNuevaVenta = {}
const agregarLaVenta=()=>{
    objNuevaVenta = {fecha: new Date (fecha), nombreVendedora: vendedora, componentes: componentesVenta, sucursal: sucursal}
   ventas.push(objNuevaVenta)
}
//MODAL EDITAR VENTAS
var selectVendedoraE = document.getElementById('vendedoraE')
var selectComponentesE = document.getElementById('componentesE')
var selectSucursalE = document.getElementById('sucursalE')
var selectFechaE = document.getElementById('fechaE')
let vendedoraE, sucursalE, componentesVentaE, fechaE;
const showEditarVenta = (id)=>{
        selectFechaE.value = `${formatDateToString2(ventas[id].fecha)}`
        for(const option of selectVendedoraE){
            if(option.value===ventas[id].nombreVendedora){
                option.selected = true
            }}
        for(const option of selectSucursalE){
            if(option.value===ventas[id].sucursal){
                option.selected = true
            }}
        for(const option of selectComponentesE){
            for(const componente of ventas[id].componentes){
                if(option.value===componente){
                option.selected = true 
                }
            }
        }}
//EDITAR(modificar) VENTA
const getDataEditVenta = () =>{
    vendedoraE = selectVendedoraE.value
    //componentescompra
    componentesVentaE = []
    for (let x = 0; x < selectComponentesE.selectedOptions.length; x++) {
            componentesVentaE[x]=(selectComponentesE.selectedOptions[x].value)
    }
    sucursalE = selectSucursalE.value
    fechaE = selectFechaE.value
}
let objEditVenta = {}
const editarVenta = (id) =>{
    objEditVenta = {fecha: new Date (fechaE), nombreVendedora: vendedoraE, componentes: componentesVentaE, sucursal: sucursalE}
    ventas[id]=objEditVenta
}
