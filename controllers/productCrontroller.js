const Product = require("../models/Product");

//Add a product(admin/farmer)

exports.addProduct = async(req,res) => {
    try{
        const { name, description, price, category, stock, imageUrl } = req.body;
        const product = new Product({
            name, 
            description, 
            price, 
            category,
            stock, 
            imageUrl,
            createdBy: req.user.id,
        });

        await product.save();
        res.status(201).json({message: "Product created", product});

    } catch(err)
    {
        res.status(500).json({message: "Server error", error: err.message});

    }
};

//get all products
exports.getAllProducts = async(req,res) =>{
    try{
        const products = await Product.find().populate("createdBy", "name");
        res.status(200).json(products);
    } catch(err){
        res.status(err).json({message: "Server error", error: err.message});

    }

    
};

exports.updateProduct = async(req,res) =>
{
    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
    );
    if (!product) return res.status(404).json({message:"Product not found"});
    res.json({message: "Product update", product});
    } catch (err){
        res.status(500).json({message: "Server error", error: err.message});

    }

    
};

//Delete Product
exports.deleteProduct = async (req,res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({message});
        res.json({message : "Product deleted"});
    }
    catch(err)
    {
        res.status(500).json({message: "Server Error", error: err.message});

    }
};