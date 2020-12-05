import express = require('express')
import add from './modules/add';
// Create a new express app instance
const app: express.Application = express()
const PORT = 3000

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`)
})

console.log(add(1, 1))