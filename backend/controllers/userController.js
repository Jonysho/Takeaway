const User = require('../models/UserModel.js')
const Token = require('../models/TokenModel.js')
const axios = require('axios');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail.js');

const createEmailToken = async (email, userId) => {
    const emailToken = await new Token({
        userId: userId,
        token: crypto.randomBytes(32).toString("hex")
    }).save()
    const url = `${process.env.BASE_URL}user/${userId}/verify/${emailToken.token}`
    console.log(email, url, emailToken)
    await sendEmail(email, "Verify Email", url);
}

const googleLogin = async (req, res, access_token) => {
    axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    }).then( async response => {
        const firstname = response.data.given_name
        const lastname = response.data.family_name
        let email = response.data.email.split("@")[0].toLowerCase()
        email += "@gmail.com"
        const user = await User.findOne({ email })
        
        if (!user) {
            const newUser = await User.create({ firstname, lastname, email, verified: true})
            const token = newUser.generateJWT()
            return res.status(200).json({id: newUser._id, token})
        } else{
            const token = user.generateJWT()
            return res.status(200).json({id: user._id, token })
        }
    }).catch(err => {
        console.log(err)
        return res.status(400).json({message: 'Google Login Failed.'})
    })
}

const login = async (req, res) => {
    let {email, password} = req.body
    email = email.toLowerCase()
    try {
        const user = await User.login(email, password)
        // Create New Email verification token (if expired) and not verified
        const userId = user._id

        if (!user.verified) {
            let emailToken = await Token.findOne({ userId })
            if (!emailToken) {
                createEmailToken(email, userId)
                return res.status(401).json({error: "A link has been sent to verify your email. "})
            }
            return res.status(402).json({error: "A link has already been sent, please check your inbox.", button: {text: "Click here to send again"}})
        }

        // Create a auth token
        const token = user.generateJWT()

        // Send back user id and auth token if login is successful
        return res.status(200).json({id: user._id, token})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: error.message})
    }
}
    
const register = async (req, res) => {
    if (req.body.googleAccessToken){
        googleApi("Email already in use.")
    } else {
        let {firstname, lastname, phone, email, password} = req.body
        email = email.toLowerCase()
        try {
            const user = await User.signup(firstname, lastname, email, password, phone)

            // Create Email verification token
            createEmailToken(email, user._id)

            return res.status(200).json({message: "Please verify your email, a link has been sent to you."})
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }
}

const getUserDetails = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.getUserDetails(id)
        const { firstname, lastname, email, phone } = user
        return res.status(200).json({ firstname, lastname, email, phone })
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const changePassword = async (req, res) => {
    const { id } = req.params
    const {password, newPassword, confirmPassword} = req.body

    try {
        const user = await User.changePassword(id, password, newPassword, confirmPassword)
        return res.status(200).json({message: 'Password has successfully updated.'})
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const updateDetails = async (req, res) => {
    const { id } = req.params
    let { firstname, lastname, email, phone } = req.body
    email = email.toLowerCase()

    try {
        await User.updateDetails(id, firstname, lastname, email, phone)
        res.status(200).json({message: "Successfully updated details."})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const resendEmail = async (req, res) => {
    console.log(req)
    console.log(req.body)
    let { email } = req.body
    if (!email){
        return res.status(200).json({error: "No email provided."})
    }
    email = email.toLowerCase()
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(200).json({error: "Email is invalid."})
        }
        if (user.verified) {
            return res.status(200).json({error: "Email is already verified."})
        }
        const userId = user._id
        let emailToken = await Token.findOne({ userId })
        if (!emailToken) {
            createEmailToken(email, userId)
            return res.status(200).json({error: "A new email has been sent."})
        }
        return res.status(200).json({error: "A link has already been sent, please check your inbox."})
    } catch(err) {
        console.log(err)
    }
}

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        if (!user) return res.status(404).json({message: "Invalid Link."})
        
        if (user.verified){
            return res.status(400).json({message: "Your email is already verified."})
        }
        const emailToken = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        if (!emailToken) return res.status(400).json({message: "Token has expired - Login to receive a new email."})

        await User.findOneAndUpdate({_id: user._id}, {verified: true})
        console.log("User is now verified")
        await Token.deleteOne({userId: user._id})

        return res.status(201).json({message: "Your email is now verified."})
    } catch (error) {
        return res.status(404).json({message: "Invalid Link."})
    }
}

module.exports = {googleLogin, login, register, getUserDetails, changePassword, updateDetails, verifyEmail, createEmailToken, resendEmail}
