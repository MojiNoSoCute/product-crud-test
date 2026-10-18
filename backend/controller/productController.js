import Product from "../model/productModel.js";

const createProduct = async (req, res, next) => {
    try {
        const { name, price, description, image } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "Name and Price are required"});
        }
        const newProduct = await Product.create({
            name,
            price: Number(price),
            description,
            image,
        })
        return res.status(201).json(newProduct);
    } catch (error) { 
        return next(error);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        return next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { id } =req.params;
        if (!id) {
            return res.status(400).json({ message: "Productid is required"});
        }
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found"});
        }
        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const { id } =req.params;
        if (!id) {
            return res.status(400).json({ message: "Productid is required"});
        }
        const { name, price, description, image } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "Name and Price can not be empty"});
        }
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found"});
        }
        const updates = {};
        if (name != undefined) updates.name = name;
        if (price != undefined) updates.price = Number(price);
        if (description != undefined) updates.description = description;
        if (image != undefined) updates.image = image;
        await product.update(updates);
        return res.status(200).json(product);
    } catch (error) {
        return next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } =req.params;
        if (!id) {
            return res.status(400).json({ message: "Productid is required"});
        }
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found"});
        }

        await product.destroy();
        return res.status(200).json({
            message: "Product deleted successfully",
            deletedProduct: product,
        });
    } catch (error) {
        return next(error);
    }
}

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}