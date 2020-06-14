const express = require ('express')
const cors = require('cors')
const app = express()


app.use(express.json());
app.use(cors());


// Database
const db = require('./config/database')
// Test DB 
db.sequelize.authenticate()
.then(()=>console.log('Connection has been established successfully.'))
.catch(error=>console.error('Unable to connect to the database:', error))
    
// Routes
app.use('/users', require('./routes/usersRouter'))

// Port
require('dotenv/config')
const Port = process.env.Port || 5000

app.listen(Port, (err)=>{
    if(err) console.log("Server is not Running")
    else console.log("Server is Running on Port : "+ Port)
})