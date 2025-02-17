const express=require('express');
const mongoose=require('mongoose');
const BrandName=require('./model');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(express.json())
mongoose.connect('your mongodb connect script').then(
    ()=>console.log("DB connected ...")
).catch(err=>console.log(err))


app.post('/addbrand',async (req,res)=>{
    const {brandname}=req.body;
    try{
        const newData=new BrandName({brandname});
        await newData.save();
        return res.send(await BrandName.find())
    }
    catch(err0){
        console.log(err.message);
    }
    
})

app.get('/getallbrands',async (req,res)=>{
    try{
        const allbrands=await BrandName.find();
        return res.json(allbrands);

    }
    catch(err){
        console.log(err.message);
    }
})

app.get('/getallbrands/:id',async (req,res)=>{
    try{
        const data=await BrandName.findById(req.params.id);
        res.json(data);

    }
    catch(err){
        console.log(err.message);
    }
})

app.delete('/deletebrand/:id',async (req,res)=>{
    try{
        await BrandName.findByIdAndDelete(req.params.id);
        res.json(await BrandName.find());

    }
    catch(err){
        console.log(err.message);
    }
})

app.listen(3000,()=>console.log("server running ..."));