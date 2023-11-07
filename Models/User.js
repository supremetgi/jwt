const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    }
})




UserSchema.pre('save', async function (next) {
    try {
        // console.log('called before saving user')

        console.log(this)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password,salt)
        this.password = hashedPassword 
        next()
    } catch (error) {
        next(error)
    }
})




UserSchema.methods.isValidPassword = async function (password) {//using async functino instead of arrow 
    try{                                                            //because thsih key word cant be used in arrow function   
         return await bcrypt.compare(password, this.password)
    }
    catch (error) {
         throw error
    }
}




UserSchema.post('save', async function (next) {
    try {
        console.log('called after saving user')
        
    } catch (error) {
        next(error)
    }
})




const User = mongoose.model('user',UserSchema)
module.exports = User  