const AscaoriginUser = require("../models/AscaoriginUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createAccount = async (req, res) => {
    bcrypt.hash(req.body.password, 10).then(async (hash) => {
        const newAca = new AscaoriginUser({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hash
        })

        await newAca.save().then((res) => {
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


exports.login = async (req, res) => {
    let userData;

    await AscaoriginUser.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            return res.status(500).json({
                error: "Invalid email"
            });
        }

        userData = user;

        return bcrypt.compare(req.body.password, user.password)

    }).then((result) => {
        if (!result) {
            return res.status(500).json({
                error: "Invalid password"
            });
        }

        const token = jwt.sign({ email: userData.email, ascaUserId: userData._id }, process.env.JWT_KEY_ASCA, { expiresIn: "48h" });

        res.status(200).json({
            token:token,
            expiresIn: 172800
          })
    })
}