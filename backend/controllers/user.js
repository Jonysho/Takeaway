const { default: mongoose } = require('mongoose')
const UserSchema = require('../models/UserModel.js')

const getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: 'Server Error'}) 
    }
}

const getUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await UserSchema.findById(id)
        if (user){
            res.status(200).json(user)
        } else{
            res.status(400).json({message: 'User does not exist.'})
        }
    } catch (error) {
        res.status(500).json({message: "Server error"}) 
    }
}

const addUser = async (req, res) => {
    const {firstname, lastname, phone, email, password} = req.body
    const phoneNumberRegex = /^(?:\+44|0)[1-9]\d{8,12}$/;
    const user = UserSchema({
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        password: password,
    })
    try {
        // Validation 
        if (!firstname || !lastname|| !phone || !email || !password){
            return res.status(400).json({message: 'All fields required'})
        }
        // Valid Email
        try{
            const user = await UserSchema.findOne({email})
            if (user) {
                return res.status(400).json({ error: 'Email is already in use.' });
            }
        } catch (err) {
            console.log("Email is unique")
        }
        // Valid Password
        if (password.length < 8){
            return res.status(400).json({message: 'Password is too short'})
        } 
        // Valid UK Phone Number
        if (!phoneNumberRegex.test(phone)) {
            return res.status(400).json({ error: 'Invalid UK mobile phone number.' });
        }
        await user.save()
        res.status(200).json({message: 'User Added'})
    }catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
    console.log(user)
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    UserSchema.findByIdAndDelete(id)
        .then((user) => {
            res.status(200).json({ message: `User ${user.firstname} deleted`})
        })
        .catch((error) => {
            res.status(500).json({message: 'Server Error'})
        })
}

const updateUser = async (req, res) => {
    const { id } = req.params

    // Check all fields are valid
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User does not exist.'})
    }
    
    const user = await UserSchema.findByIdAndUpdate(id, {...req.body})
    if (!user){
        return res.status(404).json({error: 'User does not exist.'})   
    }
    console.log(user)
    res.status(200).json(user)
}

module.exports = {addUser, getUser, deleteUser, getAllUsers, updateUser}
