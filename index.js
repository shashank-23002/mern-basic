const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./db/User');
require('./db/config');
const Product = require('./db/Product');
const product = require('./db/Product');

const Jwt=require('jsonwebtoken')
const jwtKey='e-comm';

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    // res.send("api in progress....");
    let user = new User(req.body);
    let result = await user.save();
    result=result.toObject();
    delete result.password;
    // res.send(result);
    if (user) {
        Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
            if(err)
            {
                res.send({result:"Something went wrong..."})
            }
            res.send({result,auth:token})
        })
        // res.send(user);
    }
})

app.post("/login", async (req, res) => {
    // res.send('working....');
    if (req.body.password && req.body.email) 
    {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err)
                {
                    res.send({result:"Something went wrong..."})
                }
                res.send({user,auth:token})
            })
            // res.send(user);
        }

        else {
            res.send({ result: 'No User found' })
        }
    }

    else
    {
        res.send({result:"No User found"})
    }

})

app.post("/add-product",async(req,res)=>
{
    let product=new Product(req.body);
    let result=await product.save();
    res.send(result);
})

app.get("/products",async(req,res)=>{

    let products=await Product.find();
    if(products.length>0)
    {
        res.send(products);
    }

    else
    {
        res.send({result:"No Products found"})
    }

})


app.delete("/product/:id",async(req,res)=>{
    // res.send(req.params.id)
    const result=await Product.deleteOne({_id:req.params.id})
    res.send(result);
})

app.get("/product/:id",async(req,res)=>{
    const result=await Product.findOne({_id:req.params.id});
    if(result)
    {
        res.send(result);
    }

    else
    {
        res.send({result:"No result found"});
    }
})

app.put("/product/:id" ,async(req,res)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result);
})


app.get("/search/:key",async(req,res)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}}
        ]
    })
    res.send(result);
})


app.listen(5000);