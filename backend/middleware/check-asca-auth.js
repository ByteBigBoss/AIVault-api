const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,"this_asca_yasith_&&_nethmina_dev_x")
        req.ascaUser = {email:decodedToken.email,id:decodedToken.ascaUserId}
    } catch (error) {
        res.status(401).json({ message: "Auth failed!" })
    }
}