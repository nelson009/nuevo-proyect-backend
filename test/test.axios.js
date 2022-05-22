const logger = require('../logger/loggerConfig');
const axios = require('axios').default;

(async () => {
    try{
        /// AXIOS GET .Probando con base de datos mongo
        const responseGet = await axios.get('http://localhost:8080/api/productos') 
        logger.info(responseGet.status);
        logger.info(responseGet.data);

        ///AXIOS POST
        const producto = {
                nombre:"prueba",
                descripcion: "tv",
                codigo: 12,
                precio:2000,
                foto:"https://images.fravega.com/f300/654f64238a932795128e5445ad1f8ed6.jpg.webp",
                stock: 23
        }
        // ALTERNATIVA POST
        // const postAxios = await axios.request({
        //     baseURL: 'http://localhost:8080',
        //     url: '/api/productos',
        //     method: 'POST',
        //     data: {...producto1},
        // })
        // logger.info(postAxios.status);
        // logger.info(postAxios.data);
        const responsePost = await axios.post('http://localhost:8080/api/productos?admin=true',{...producto});
        logger.info(responsePost.status);
        logger.info(responsePost.data);
     
        /// AXIOS PUT
        const producto2 = {
                nombre:"prueba1",
                descripcion: "tv",
                codigo: 12,
                precio:2000,
                foto:"https://images.fravega.com/f300/654f64238a932795128e5445ad1f8ed6.jpg.webp",
                stock: 23
        }
        const id = `6289c2f5fa1b9c8a77c48fab`
        const responsePut = await axios.put(`http://localhost:8080/api/productos/${id}?admin=true`,{...producto2});
        logger.info(responsePut.status);
        logger.info(responsePut.data);

        /// AXIOS DELETE
        const i = `6289c2f5fa1b9c8a77c48fab`
        const responseDelete = await axios.delete(`http://localhost:8080/api/productos/${i}?admin=true`);
        logger.info(responseDelete.status);
        logger.info(responseDelete.data);
    }
    catch(error) {
       logger.error(error.message)
    }
})();