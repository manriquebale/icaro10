const { readProducts, readProduct, createProduct, productExists, deleteProduct, updateProduct } = require("../services/product")

const products = require('../../models').products
const getAllView = async (req, res) => {

    const productsNew = await products.findAll()
    console.log(productsNew)
    return res.render('products', {productsNew})
}

const getAll = (req, res) => {
    return products.findAll()
    .then(products => res.status(200).send(products))
    .catch(error => res.status(404).send(error))

}

const getOne = (req, res) => {
    const { id } = req.params
    return products.findOne(
        {   where: { id: id} })
        
    .then(products => res.status(200).send(products))
    .catch(error => res.status(404).send(error))

}

const create = (req, res) => {
    const { name, description, price, image } = req.body
    return products.create({
        name: name, 
        description: description,
        price: price,
        image: image
    })
    .then(products => res.status(201).send(products))
    .catch(error => res.status(500).send(error))
}


const update = async (req, res) => {
    const { id } = req.params
    const { name, description, price, image } = req.body
    product = await products.findOne(
        {   where: { id: id} })
        
    if (!product) return res.status(404).json({ error: 'no se encuentra'})

    return products.update({ name: name, description: description, price: price, image: image},{
        where: { id: id }
    })
    .then(products => res.status(201).send(product))
    .catch(error => res.status(500).send(error))

}


const deleteOne = async (req, res) => {
    const { id } = req.params
    product = await products.findOne(
        {   where: { id: id} })
        
    if (!product) return res.status(404).json({ error: 'no se encuentra'})
    
    return products.destroy({
        where: { id: id}
    })
    .then(products => res.status(201).send(product))
    .catch(error => res.status(500).send(error))
}



module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    getAllView
}