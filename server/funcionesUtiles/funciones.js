const generadorId = (array, inicioPosicion) => {
   const id = array.reduce((idmax, producto) => idmax.id > producto.id ? idmax +1: producto.id +1, inicioPosicion)
   
   return id === undefined ? 1 : id 

}

const obtenerIndice = (array,id) => {
   const result = array.findIndex(producto => producto.id === +id )

   return result
}

module.exports = {generadorId, obtenerIndice}