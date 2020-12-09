import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';
import add from './modules/add';
// Create a new express app instance
const app: express.Application = express()
const PORT = 3000

require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))

app.use(routes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
})

console.log(add(1, 1))