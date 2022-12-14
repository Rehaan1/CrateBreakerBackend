require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const leaderboardRoute = require('./api/routes/leaderboardRoute')

const app = express()

const port = process.env.PORT

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(cors())

mongoose.connect(process.env.MONGODB_DB_URI, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(() =>{
        console.log('Connected to MongoDB Atlas')
    })
    .catch(err => {
        console.log('Error:' + err)
    })

app.use('/lb', leaderboardRoute)

app.get('/',(req,res)=>{
    res.status(200).json({
        status: 200,
        message: 'Ahoy Captain! CrateBreaker API Up and Running. Refer documentation'
    })
})

app.listen(port, () => {
    console.log("Server Up and Running at PORT: ", port)
})