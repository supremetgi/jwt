const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017',{dbName:process.env.db_name})
.then(() => {
    console.log('mongodb connected')
})
.catch((err) => console.log(err.message))
   
 


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db')
})




mongoose.connection.on('error', (err) => {
    console.log(err.message)
})


mongoose.connection.on('disconnected', () => {
     console.log('Mongoose connection is disconnected.')
})



process.on('SIGINT', async() => {
    await mongoose.connection.close()
    console.log('closing')
    process.exit(0)
})
