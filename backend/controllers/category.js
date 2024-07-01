const Category = require("../models/Category");

exports.addCategory = async (req,res)=>{

   const {name}  = req.body;

   const newCategory = new Category({
    name:name
   })

   await newCategory.save().then((category)=>{
    res.status(200).json({
        message:"category added",
        category:{
            name:category.name,
            id:category._id,
        }
    })

    console.log(category)
   }).catch((err)=>{
    console.log(err)
   })

}

exports.getAll = async (req,res)=>{
    await Category.find().then((categories)=>{
        res.status(200).json({
            message:"sucess",
            categories:categories
        })
    }).catch(()=>{})
}