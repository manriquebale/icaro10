const fs = require('fs')

const readProducts = () => {
    const products = fs.readFileSync(__dirname + '/../database/products.json')
    return JSON.parse(products)
}


const readProduct = (id) => {
    const products = readProducts()
    const product = products.filter((product) => product.id == id)[0]
    return product;
}

const createProduct = (product) => {
    const products = readProducts();
    const lastId = products[products.length - 1].id;
    products.push({
        id: lastId + 1,
        ...product
    })
    fs.writeFileSync(__dirname + '/../database/products.json', JSON.stringify(products))
}

const productExists = (id) => {
    const products = readProducts();
    const product = products.filter((product) => product.id == id)
    if (!product)
    return false
    else return true;
}
const deleteProduct = (id) => {
    const products = readProducts();
    const newProducts = products.filter((product) => product.id != id)
    fs.writeFileSync(__dirname + '/../database/products.json', JSON.stringify(newProducts))
}

const updateProduct = (id, newProduct) => {

    const products = readProducts();
    const product = products.filter((p) => p.id == id)[0];
    product.price = newProduct.price;
    product.name = newProduct.name;
    product.description = newProduct.description;
    product.image = newProduct.image;
    fs.writeFileSync(__dirname + '/../database/products.json', JSON.stringify(products))
}

module.exports = {
    readProducts,
    readProduct,
    createProduct,
    productExists,
    deleteProduct,
    updateProduct
}