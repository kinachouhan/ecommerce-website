
import express from "express"
import {createProduct} from "../controolers/productController.js"
import {upload} from "../middleware/upload.js"
import {getAllProducts , deleteProduct , getProduct} from "../controolers/productController.js"

const router = express.Router()

router.post("/add" , upload.array("images", 4)   ,createProduct)
router.get("/get", getAllProducts);
router.delete("/delete/:id", deleteProduct);
router.get("/product/:id", getProduct);

export default router