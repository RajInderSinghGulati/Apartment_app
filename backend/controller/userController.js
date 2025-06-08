const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req,res) => {
    try{
        const {name,avatar,email,phoneNum,password,status,house} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,avatar,email,phoneNum,password:hashedPassword,status,house});
        await newUser.save();
        const newUserObj = newUser.toObject();
        delete newUserObj.password;
        res.status(201).json(newUserObj);
    }catch(err){
        if (err.code === 11000) { // MongoDB duplicate key error
            return res.status(400).json({error: "Email or phone number already exists" });
        }
        res.status(500).json({error : err.message});
    }
};

exports.getUserById = async (req,res) => {
    try{
        const {userId} = req.params;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error : "User not found"});
        const userObj = user.toObject();
        delete userObj.password;
        res.status(200).json(userObj);
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.deleteUser = async (req,res) => {
    try{
        const {userId} = req.params;
        const deleted = await User.deleteOne({_id : userId});
        if(deleted.deletedCount == 0){
            return res.status(404).json({message : "User not found"});
        }
        res.status(200).json({message : "User deleted successfully"});
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.updateUser = async (req,res) => {
    try{
        const { userId } = req.params;
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        );
        if(!user) return res.status(404).json({error : "User not found"});
        const userObj = user.toObject();
        delete userObj.password;
        res.status(200).json(userObj);
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.loginUser = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user) return res.status(404).json({error : "User not found"});
        const isUser = bcrypt.compare(password,user.password);
        if(!isUser) return res.status(401).json({error : "Invalid credentials"});
        const token = jwt.sign({userId : user._id, email : user.email},process.env.JWT_SECRET,{expiresIn : '1h'});
        res.status(200).json(token);
    }catch{
        res.status(500).json({error : err.message});
    }
};