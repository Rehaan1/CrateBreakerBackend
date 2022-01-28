const router = require('express').Router()
const Leaderboard = require('../../models/leaderboardModel')

router.get('/',(req,res) =>{
    res.status(200).json({
        status: 200,
        message: 'Ahoy Captain! LB API Up and Running. Refer documentation'
    })
})

router.post('/add', (req,res) => {
    if (!req.body.username) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    if (!req.body.score) {
        return res.status(400).json({
          status: 400,
          erroMessage: 'Missing required parameters. Refer documentation'
        })
    }

    new Leaderboard({
        username: req.body.username,
        score: req.body.score
    })
    .save()
    .then((newUser)=>{
        return res.status(200).json({
            status: 200,
            message: "User addedd succesfully"
        })
    })
    .catch((error) => {
        
        return res.status(400).json({
            status: 400,
            success: false,
            error: error
        })
    })
})

router.get("/lbrank",(req,res)=>{

    Leaderboard.find({},
        ['username','score'],
        {
            skip:0,
            limit:10,
            sort:{
                score: -1 //Sort by Score Added DESC
            }
        })
        .then((data) =>{
            return res.status(200).json({
                status: 200,
                data: data
            })
        })
        .catch((error) => {
        
            return res.status(400).json({
                status: 400,
                success: false,
                error: error
            })
        })
})



module.exports = router