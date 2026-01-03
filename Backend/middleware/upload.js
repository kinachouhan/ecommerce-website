
import multer from "multer";
import cloudinary from "../clodinaryConfig/cloudinary.js"; // your v2 config

const storage = multer.memoryStorage(); // store files in memory
export const upload = multer({ storage });

export const uploadProductImages = async (req, res) => {
    try {
        const urls = [];
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
            urls.push(result);
        }

        // urls now contains Cloudinary URLs
        res.json({ urls });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Upload failed" });
    }
};

