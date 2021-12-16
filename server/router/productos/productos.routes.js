const express = require('express');
const Memoria = require('../../class/memoria');

const router = express.Router();
const memoria = new Memoria;

router.get('/', (req,res) => {
  
    res.json( memoria.getProduct());
});

router.get('/:id', (req,res) => {
    const {id} = req.params;
    const producto = memoria.getProductId(id)
    if(!producto){

       return res.status(404).send({error: 'producto no encontrado'})
    }
    res.status(200).json(producto)
});

router.post('/', (req,res) => {
    const newProduct = req.body;
    console.log(newProduct)
    if( !newProduct.title || !newProduct.price || !newProduct.thumbnail){

        return  res.status(404).send({error: 'producto no encontrado'})
    }
    res.json(memoria.addProduct(newProduct))
    
});

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const newProduct = req.body
    const producto = memoria.getProductId(id)
    if(!producto || !newProduct.title || !newProduct.price || !newProduct.thumbnail){

        return  res.status(404).send({error: 'producto no encontrado'})
    }
    res.json(memoria.updateProduct(newProduct, id))
});

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    const producto = memoria.getProductId(id)
    if(!producto){

        return res.status(404).send({error: 'producto no encontrado'})
    }
    memoria.deleteProduct(id)

    res.json('producto eliminado correctamente')
});

module.exports = router;