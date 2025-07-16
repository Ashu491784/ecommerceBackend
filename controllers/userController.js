const { hash } = require("bcryptjs");
const User = require("../models/userSchema.js");
const jwt =require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    try{
        const userExist = await User.findOne({email: req.body.email});
        if(userExist){
            return res.status(400).json({message: "user already exist"});
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status,
        });
 
        await user.save(); //await dnne nattam then dnna plwn
        res.status(201).json({message: "user created successfully"});

    }catch(error){
        res.status(500).json({error: error.message});
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await user.compare(password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        { expiresIn: '2h' }
        res.status(200).json({token, "msg": "Login successful",user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPropile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); //mona hari deyak ain karanna oni unoth .select kiyala adu karanwa
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {register, login,getPropile}
