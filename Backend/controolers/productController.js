import { Product } from "../models/productModel.js"
import cloudinary from "../clodinaryConfig/cloudinary.js";

export const createProduct = async (req, res) => {
    try {

        const { productName, description, category, subCategory, price, sizes, bestseller } = req.body



        if (!productName || !description || !category || !subCategory || !price || !sizes) {
            return (
                res.status(400).json({
                    success: false,
                    message: "All fields are required"
                })
            )
        }

        const imageUrls = [];
        for (const file of req.files) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "products" },
                    (error, result) => {
                        if (result) resolve(result.secure_url);
                        else reject(error);
                    }
                );
                stream.end(file.buffer);
            });
            imageUrls.push(result);
        }

        const product = await Product.create({
            productName,
            description,
            price,
            category,
            subCategory,
            sizes: JSON.parse(req.body.sizes),
            images: imageUrls,
            bestseller
        })

        res.status(200).json({
            success: true,
            responseData: product
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Product creation failed",
        });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()

        if (!products) {
            return res.status(401).json({
                success: false,
                message: "No products found"
            })
        }

        return res.status(200).json({
            success: true,
            responseData: products
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }

}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch (error) {

        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
        });
    }
}