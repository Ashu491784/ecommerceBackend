const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
    try{
            const token = req.header('Authorization')?.replace('Bearer ',''); //token ekath ekka spaces thiyenwa nm ewa  ain karanna 'Bearer' pawichchi karanawa
    if(!token){
        return res.status(401).json({message: "Please provide a token"});    
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const role = (...role) => { //onama role ekak ganna plwn wenna
    return (req, res, next) => {
        if(req.user.role !== role){
            return res.status(401).json({ error: "Unauthorized" });
        }

    }
    }
 module.exports = { auth, role }