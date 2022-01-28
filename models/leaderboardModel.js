const mongose = require('mongoose')

const Schema = mongose.Schema

const leaderboardSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    }
})

const Leaderboard = mongose.model('leaderboard', leaderboardSchema)
module.exports = Leaderboard