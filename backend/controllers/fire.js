const Fire = require("../models/Fire");

exports.addFireItem = async (req,res)=>{
  

    const fire = new Fire({
        fireUser:req.ascaUser.id,
        tool:req.body.toolId
    })

    await fire.save().then((fire)=>{
        res.status(200).json({
            message:"added"
        })
    }).catch((err)=>{
        res.status(404).json({
            message:err
        })
    })

}

exports.getAllFireItems = async (req,res)=>{
    await Fire.findById(req.ascaUser.id).populate('tool').then((fireItems)=>{
        res.status(200).json({
            message:"added",
            tools:fireItems
        })
    }).catch((err)=>{
        res.status(404).json({
            message:err
        })
    })
}

exports.removeFireItem = async (req,res)=>{
    await Fire.deleteOne({ _id: req.params.id }).then((result) => {
        console.log(result);
        res.status(200).json({ message: "removed!" });
      });
}