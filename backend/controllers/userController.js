const User = require('../models/UserModel.js')
const axios = require('axios');

const googleLogin = async (req, res, access_token) => {
    axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    }).then( async response => {
        const firstname = response.data.given_name
        const lastname = response.data.family_name
        const email = response.data.email
        const user = await User.findOne({ email })
        if (!user) {
            const newUser = await User.create({ firstname, lastname, email})
            const token = newUser.generateJWT()
            res.status(200).json({id: newUser._id, firstname, lastname, email, token})
        } else{
            const token = user.generateJWT()
            res.status(200).json({id: user._id, firstname, lastname, email, phone: user.phone, token })
        }
    }).catch(err => {
        console.log(err)
        res.status(400).json({message: 'Google Login Failed.'})
    })
}

const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        
        // Create a token
        const token = user.generateJWT()
        const {_id, firstname, lastname, phone} = user
        res.status(200).json({id: _id, firstname, lastname, email, phone, token})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}
    
const register = async (req, res) => {
    if (req.body.googleAccessToken){
        googleApi("Email already in use.")
    } else {
        const {firstname, lastname, phone, email, password} = req.body
        
        try {
            const user = await User.signup(firstname, lastname, email, password, phone)

        // Create a token
        const token = User.generateJWT()
        res.status(201).json({id: user._id, firstname, lastname, email, phone, token})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}

const getUserDetails = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.getUserDetails(id)
        const { firstname, lastname, email, phone } = user
        res.status(200).json({ id, firstname, lastname, email, phone })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const changePassword = async (req, res) => {
    const { id } = req.params
    const {password, newPassword, confirmPassword} = req.body
        
    try {
        const user = await User.changePassword(id, password, newPassword, confirmPassword)
        res.status(200).json({message: 'Password has successfully updated.'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const updateDetails = async (req, res) => {
    const { id } = req.params
    const { firstname, lastname, email, phone } = req.body

    try {
        const user = await User.updateDetails(id, firstname, lastname, email, phone)
        res.status(200).json({id, firstname, lastname, email, phone})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {googleLogin, login, register, getUserDetails, changePassword, updateDetails}
