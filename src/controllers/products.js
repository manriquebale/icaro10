const { readProducts, readProduct, createProduct, productExists, deleteProduct, updateProduct } = require("../services/product")

const getAllView = (req, res) => {
    const products = readProducts();
    return res.render('products', {products})
}

const getAll = (req, res) => {
    const products = readProducts();

    if (products.length <= 0) {
        return res.status(500).json({
            status: 'hubo un error',
            message: 'no se encontraron productos'
        })
    }

    return res.status(200).json(products)

}

const getOne = (req, res) => {
    const { id } = req.params
    const product = readProduct(id)

    if (!product) {
        return res.status(500).json({
            status: 'hubo un error',
            message: 'no se encontraro el producto'
        })
    }

    return res.status(200).json(product)
}

const create = (req, res) => {
    const { name, description, price, image } = req.body
    const product = {
        name,
        description,
        price,
        image
    }

    createProduct(product)

    return res.status(201).json({
        status: 'exito',
        message: 'el producto ha sido creado',
        product
    })

}


const update = (req, res) => {
    const { id } = req.params
    const { name, description, price, image } = req.body

    const product = {
        name, description, price, image
    }

    if (!productExists(id)) {
        return res.status(404).json({
            status: 'hubno un error',
            message: 'no se encontro el prod'
        })
    }

    updateProduct(id, product)

    return res.status(200).json({
        status: "exito",
        message: "se actualizo"
    })


}


const deleteOne = (req, res) => {
    const { id } = req.params
    if (!productExists(id)) {
        return res.status(404).json({
            status: 'hubno un error',
            message: 'no se encontro el prod'
        })
    }

    deleteProduct(id)

    return res.status(200).json({
        status: "exito",
        message: "se elimino"
    })


}



module.exports = {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
    getAllView
}