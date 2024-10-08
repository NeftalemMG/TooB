import { redis } from '../lib/redis.js';
import Product from '../models/productModel.js';
import cloudinary from '../lib/cloudinary.js';


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).json({ message: "Server Error", error: error.message })
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        let isFeatRedisOrDb = await redis.get("featured_products");
        if (isFeatRedis) {
            return res.json(JSON.parse(isFeatRedis));
        }

        isFeatRedisOrDb = await Product.find({ isFeatured:true}).lean();
        if (!isFeatRedisOrDb) {
            return res.status(404).json({ message: "No featured products found" });
        }

        // store in redis for future use
        await redis.set("featured_products", JSON.stringify(isFeatRedisOrDb));

		res.json(isFeatRedisOrDb);
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, isFeatured } = req.body;
        let cloudinaryRes = null;
        
        if (image) {
            cloudinaryRes = cloudinary.uploader.upload(image, {folder: "products"});
        }
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryRes?.secure_url ? cloudinaryRes.secure_url: "",
            category
        });
        res.status(201).json(product);
    } catch (error) {
        console.log("Error in the product_controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }

}

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found " })
        }
        if (product.image) {
            const publicId = product.image.split('/').pop().split('.')[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("deleted image from cloud storage");
            } catch (error) {
                console.log("deleting image didn't go as planned", error)
            }
        }
        await Product.findByIdAndDelete(productId);

    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({message: "Server Error", error: error.message});
    }
}


export const getRecommendedProducts = async (req, res) => {
	try {
		const products = await Product.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					image: 1,
					price: 1,
				},
			},
		]);

		res.json(products);
	} catch (error) {
		console.log("Error in getRecommendedProducts controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const getProductsByCategory = async(req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.json(products);
    } catch (error) {
        console.log("Error in the getproductsbyid controller", error.message)
        res.status(500).json({message:"Server error", error: error.message});
    }
}



export const toggleFeatProd = async(req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            product.isFeatured = !product.isFeatured;
            const updateProduct = await product.save();
            await updateFeaturedProductsCache();
			res.json(updatedProduct);
        } else {
			res.status(404).json({ message: "Product not found" });
		}

    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
    }
};

async function updateFeaturedProductsCache() {
	try {
		const featuredProducts = await Product.find({ isFeatured: true }).lean();
		await redis.set("featured_products", JSON.stringify(featuredProducts));
	} catch (error) {
		console.log("error in update cache function");
	}
}