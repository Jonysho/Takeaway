const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    lastname: {
        type: String,
        trim: true,
        default: ''
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        trim: true,
        collation: { locale: 'en', strength: 2 } // specify a case-insensitive collation
    },
    verified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        trim: true,
    },
    favourites: {
        type: [Number],
        default: [],
    },
    recents: {
        type: [Number],
        default: [],
    },
    dishes: {
        type: [Number],
        default: [],
    },
})

// static signup method
UserSchema.statics.signup = async function (firstname, lastname, email, password, phone){
    // Validation
    if (!firstname || !lastname|| !phone || !email || !password){
        throw Error('All fields are required.')
    } 
    if (!validator.isEmail(email)){
        throw Error('Email is invalid.')
    }
    if (!validator.isMobilePhone(phone, 'en-GB')){
        throw Error('Invalid Phone number')
    }
    // Check for min length 8, 1 uppercase, 1 lowercase letter, 1 number, 1 symbol
    if (!validator.isStrongPassword(password)) {
        throw Error('Password does not meet the requirements.')
    }
    
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ firstname, lastname, email, password: hash, phone})
    return user
}

// static login method
UserSchema.statics.login = async function(email, password){
    // Validation
    if (!email || !password){
        throw Error('All fields are required.')
    } 

    const user = await this.findOne({ email })
    if (!user) {
        throw Error('Email does not exist.')
    }
    if (!user.password) {
        throw Error('Please login through Google.')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }
    return user
}

UserSchema.statics.changePassword = async function(userId, password, newPassword, confirmPassword) {
    // Validation
    if (!userId || !password || !newPassword || !confirmPassword){
        throw Error('All fields are required.')
    }

    // Find user by ID
    const user = await this.findById(userId)

    if (!user) {
        throw Error('User does not exist.')
    }
    
    // Check if google account first
    if (!user.password){
        throw Error('Please update your password through Gmail.')
    }

    // Verify passwords
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password')
    }

    if (!validator.isStrongPassword(newPassword)) {
        throw Error('Password does not meet the requirements.')
    }

    if (newPassword !== confirmPassword){
        throw Error('Passwords do not match.')
    }

    if (password === newPassword){
        throw Error('Please choose a different password.')
    }

    // Update password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)
    user.password = hash
    await user.save()
    return user
}

UserSchema.statics.updateDetails = async function(userId, firstname, lastname, email, phone) {
    // Validation
    if (!userId || !firstname || !lastname || !email || !phone){
        throw Error('All fields are required.')
    }

    // Find user by ID
    const user = await this.findById(userId)

    if (!user) {
        throw Error('User does not exist.')
    }
    
    // Validate Email & Password
    if (!validator.isEmail(email)){
        throw Error('Email is invalid.')
    }
    
    if (email !== user.email) {
        const exists = await this.findOne({ email })
        if (exists) {
            throw Error('Email already in use.')
        }
    }

    if (!validator.isMobilePhone(phone, 'en-GB')){
        throw Error('Invalid Phone number')
    }

    user.set({
        ...user,
        firstname,
        lastname,
        email,
        phone
    });
    await user.save()
    return user
}

UserSchema.methods.generateJWT = function() {
    const token = jwt.sign({ 
        _id: this._id,
        isAdmin: this.isAdmin
    }, process.env.secret, { expiresIn: '12hr' });
    return token;
  };

module.exports = mongoose.model('User', UserSchema)