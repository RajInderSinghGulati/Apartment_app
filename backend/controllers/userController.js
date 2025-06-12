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

// controllers/userController.js
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ error: "User not found" });
    }

    // Log the hashed password for debugging
    console.log("User found. Hashed password in DB:", user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid?", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Log JWT secret for debugging (remove in production)
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: "User" },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log("Generated token:", token);

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersByHouseId = async(req,res) => {
    try{
        const {houseId} = req.params;
        const members = await User.find({house : houseId});
        res.status(200).json(members);
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.addMemberToHouse = async (req,res) => {
    try{
        const { houseId, userId } = req.params;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error : "user not found"});
        if(user.house) return res.status(400).json({error : "User is already in house " + user.house});
        user.house = houseId;
        await user.save();
        res.status(200).json({message : user.name + " added to house " + houseId});
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.searchUser = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) return res.status(400).json({ error: "No name entered" });
        const users = await User.find({ name: { $regex: name, $options: 'i' } });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.removeMemberFromHouse = async (req,res) => {
    try{
        const {userId} = req.params;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({error : "User not found"});
        if(!user.house) return res.status(400).json({message : "User is not in any house"});
        user.house = null;
        await user.save();
        res.status(200).json({message : "User is removed from house"});
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.signupUser = async (req, res) => {
    try {
        const { name, email, phoneNum, password } = req.body;
        
        if (!name || !email || !phoneNum || !password) {
            return res.status(400).json({ error: "All fields (name, email, phone, password) are required" });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phoneNum }] });
        if (existingUser) {
            return res.status(400).json({ error: "Email or phone number already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            name,
            email,
            phoneNum,
            password: hashedPassword,
            status: "Owner",
            avatar: req.body.avatar || "" 
        });

        await newUser.save();
        
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phoneNum: newUser.phoneNum,
                avatar: newUser.avatar
            }
        });

    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: "Server error during signup" });
    }
};

exports.getCurrentUser = async (req, res) => {
  try {
    // Get first user for testing (not recommended for production)
    const user = await User.findOne().select('-password');
    
    if (!user) {
      return res.status(404).json({ error: "No users found" });
    }
    
    res.status(200).json(user);
  } catch (err) {
    console.error('getCurrentUser error:', err);
    res.status(500).json({ error: err.message });
  }
};
