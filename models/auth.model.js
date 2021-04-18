const mongoose = require('mongoose')
const crypto = require('crypto'); //Encryption

//User Schema
const userSchema = new mongoose.Schema({
    email: {
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },
    name: {
        type:String,
        trim:true,
        required:true
    },
    hashed_password: {
        type:String,
        replace:true
    },
    salt:String,
    role:{
        type:String,
        default:'Normal' //Admin etc..
    },
    resetPasswordLink: {
        data: String,
        default:''
    }
},{timestamp:true})

//Virtual Password
userSchema.virtual('password')
    .set(function (password){
        this.password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function (){
        return this._password
    })

//Methods
UserSchema.methods = {
    //Generate Salt
    makeSalt: function(){
        return Math.round(new Date().valueOf()*Math.random()) + ''
    },
    //EncryptPassword
    encryptPassword: function(password){
        if(!password) return ''
        try {
            return crypto
                .createHmac('sha1',this.salt)
                .update(password)
                .digest('hex')
        }catch(err){
            return ''
        }
    },
    // Compare password between plain get from user and hashed
    authenticate: function(plainPassword) {
        return this.encryptPassword(plainPassword) === this.hashed_password
    } 
}

module.exports = mongoose.model("User",userSchema)
