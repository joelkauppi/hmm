const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
var uniqueValidator = require('mongoose-unique-validator');


const URL = process.env.MONGODB_URL

console.log('Connect to', URL)
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
 .then( res => {
     console.log('Connected to MongoDB')
 })
 .catch((error) => {
     console.log('Error. dddd', error.message)
 })

const personSchema = new mongoose.Schema({
    name: {type: String, required:true, unique: true, minlength: 3},
    number: {type: String, minlength: 8}
})

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
