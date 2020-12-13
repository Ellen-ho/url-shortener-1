import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

// Create a new express app instance
const app: express.Application = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
// setting static files
app.use(express.static('public'))

app.use(routes)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`)
})
