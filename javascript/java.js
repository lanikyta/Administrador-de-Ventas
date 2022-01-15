const btnNuevaVenta = document.getElementById('nuevaVenta')
const modalVenta = document.getElementById('modalNueva')
const cancelarVenta = document.querySelector('.cancelar')
/*let overlay = document.querySelector(".overlay")*/

btnNuevaVenta.addEventListener('click',()=>{
    modalVenta.classList.remove('hidden')
})

cancelarVenta.addEventListener('click',()=>{
    modalVenta.classList.add('hidden')
})

//traer datos
const tablaDeVentas=document.getElementById('tabla1')
const crearTablaVentas=()=>{
    for(let i=0; i<ventas.length; i++){
        const crearFilas=document.createElement('tr')
        tablaDeVentas.appendChild(crearFilas)
        for(let z=1; z<ventas[i].length; z++){
            crearFilas.innerHTML = `<td>${ventas[i][z]}</td>`
        }
    }
}