const express = require("express");
const api = express();

const joi = require("joi");
// validation
const productSchema = joi.object({
    name:joi.string().required(),
    price:joi.number().required(),
    description:joi.string().required().min(10)
});
api.use(express.json());
api.use(express.urlencoded({extended:true}))

let products = [];

api.get('/',(req,res)=>{
    return res.status(200).json({
        message:"welcome"
    })
});
//creating a product 
api.post('/product',(req,res) => {
    const productCheck = productSchema.validate(req.body); // validation
    if(productCheck.error){
        return res.status(400).json({
            message:productCheck.error.message,
        });
    }
    //checking if a product already exit
    let productExit = products.find((prod)=>prod.name.toLowerCase()=== req.body.name.toLowerCase()
    );
    if(productExit) return res.status(400).json({
        message:`product ${req.body.name} already exit`
    });
    const newProduct = {id:products.length + 1,...req.body};
    products.push(newProduct);
    return res.status(201).json({
        message:"product created sucessfully",
        products:products
    })
})
api.get('/product',(req,res)=>{
    console.log(req.params);
    return res.status(200).json({
        message:"product retrieved successfully",
        products:products
    })
})
// create product with id
api.get('/product/:productId',(req,res)=>{
    console.log(req.params);
    const product = products.find((prod)=> prod.id == req.params.productId); 
    if(!product){
        return res.status(400).json({
            message:"product not found,no product exit with that id",
        })
    }
    return res.status(200).json({
        message:"product retreived",
        products:product
    })
});
// updating...
api.put('/product/:productId',(req,res)=>{
     updateProduct = req.body
    const product = products.findIndex((prod)=>prod.id == req.params.productId)
    if(product!== -1){
        products[product]={...products[product],...updateProduct}
        return res.status(200).json({
            message:"succwssfully updated",
           updateProduct : products[product]
         })
    }
    return res.status(400).json({message:"product does not exit"})
    // return res.status(200).json({
    //     message:"product doesnt exit"
    // })

});
//deleting.....
api.delete('/product/:productId',(req,res)=>{
    const productId = req.params.productId
    const product = products.findIndex((prod)=>prod.id == productId)
    if(product !== -1){
        products.splice(product)

        return res.status(200).json({
            message: "product successfully deleted"
        })
    }else{
        return res.status(400).json({message:"product doesnt exit"})
    }
})
api.patch('/product/:productId',(req,res)=>{
    const productId = req.params.productId
    const product = products.find((prod)=>prod.id == productId)
    if(product){
        Object.assign({product,...req.body})
        res.status(200).json({message:"found"})
    }else{
        return res.status(400).json({message:"product doesnt exit"})
    }
})

api.listen(4040,()=>{
    console.log("api connected to port 4040")
});