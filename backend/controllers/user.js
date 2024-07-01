const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        });

        await user.save().then((res) => {
            res.status(200).json({
                message: "User Created!",
                result: res
            });
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        })

    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    })
}

exports.login =  async(req,res)=>{

    let userData;

    await User.findOne({email:req.body.email}).then((user)=>{
        if(!user){
           return res.status(500).json({
                error: "Invalid email"
            });
        }

        userData =  user;

       return bcrypt.compare(req.body.password,user.password)
    }).then((result)=>{
        if(!result){
            return res.status(500).json({
                error: "Invalid password"
            });
        }

      const token = jwt.sign({email:userData.email,userId:userData._id}, process.env.JWT_KEY,{expiresIn:"1h"});

      res.status(200).json({
        token:token,
        expiresIn: 3600
      })

    }).catch(()=>{
        return res.status(500).json({
            error: "Auth error"
        });
    })
}