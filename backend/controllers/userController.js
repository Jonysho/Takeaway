const User = require('../models/UserModel.js')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

const login = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // Create a token
        const id = user._id
        const token = createToken(user._id)
        const {firstname, lastname, phone} = user
        res.status(200).json({id, firstname, lastname, email, phone, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const register = async (req, res) => {
    const {firstname, lastname, phone, email, password} = req.body
    
    try {
        const user = await User.signup(firstname, lastname, email, password, phone)

        // Create a token
        const id = user._id
        const token = createToken(id)
        res.status(201).json({id, firstname, lastname, email, phone, token})
    } catch (error) {
        res.status(400).json({error: error.message})
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


module.exports = {login, register, getUserDetails, changePassword, updateDetails}
