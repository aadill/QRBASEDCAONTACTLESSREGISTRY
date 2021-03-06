const mongoose = require('mongoose')

const connectDB = async () => {
    // console.log(process.env.MONGO_URL)
    const connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })

    console.log(`Monogo db connected: ${connection.connection.host}`)

}

module.exports = connectDB