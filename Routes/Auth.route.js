const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/User')
const {authSchema} = require('../helpers/validation_schema')//used for validation of credentials
const {signRefreshToken,signAccessToken} = require('../helpers/jwt_helper')




router.post('/register', async (req, res, next) => {
    console.log(req.body)
    try { 

        const result = await authSchema.validateAsync(req.body)

        const doesExist = await User.findOne({email:result.email})
        if (doesExist) throw createError.Conflict(`${result.email} already registered`)

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken =  await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)
        //a middle ware is fired everytime
        //an object is saved
        res.send({accessToken,refreshToken})
    } catch (error) {
        if(error.isJoi === true) error
        next(error)
    }
})





router.post('/login', async (req, res, next) => {
    // res.send('login route')
    try {
        const result = await authSchema . validateAsync(req.body)
        const user = await User.findOne({ email: result.email })
        if (!user) throw createError.NotFound('user not registered')
        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch) throw createError.Unauthorized('username/password not valid')
        const accessToken = await signAccessToken(user.id)
        res.send(accessToken)
    } catch (error) {
        if (error.isJoi === true)
        return next(createError. BadRequest('Invalid Username/Password'))
        next(error)
    }

})



router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError. BadRequest()
        await verifyRefreshToken (refreshToken)
    }
    
    catch (error) {
    next (error)
    }
})



router.post('/logout', async (req, res, next) => {
    res.send('logout route')
})


module.exports = router