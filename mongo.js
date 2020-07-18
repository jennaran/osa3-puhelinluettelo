const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://JER:${password}@cluster0-y4iwh.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

person.save().then(response => {
  console.log(`Added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
})

if (process.argv.length === 3) {
    Person.find({}).then(result =>{
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
