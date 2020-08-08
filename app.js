////////////////////////////////////////////////////
/////////////// Basic Initialization ///////////////
////////////////////////////////////////////////////

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

//Helper Functions
const { ErrorHandler, handleError } = require('./helpers/error')

//Const
const PORT = 5000 || process.env.PORT

//GET
//Test Function
app.get('/', (req, res) => {
    res.end(`${Date.now()}`)
})

//POST
//Login Function
app.post('/login', async (req, res, next) => {
    res.setHeader("Content-Type", "application/json")

    try {
        const { email, password } = req.body
        if (!email || !password) {
            throw new ErrorHandler(404, "Missing required email and password fields")
        }
        let user = db.user.findOne({ email: email, password: password})
        if (!user) {
            throw new ErrorHandler(404, 'User with the specified email does not exists')
        }
        //Handle your normal scenario
        return res.status(200).end("success")
    } catch (error) {
        next(error)
    }

});

app.use((err, req, res, next) => {
    if (err) {
        handleError(err, res);
    }
});

app.listen(PORT);