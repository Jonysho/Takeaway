const mongoose = require('mongoose');

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL, connectionParams)
        console.log('Database connected.')
    } catch (error) {
        console.log(error)
        console.log('DB connection error.')
    }
}

module.exports = {db}