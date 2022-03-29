const express = require('express');

const { getTopics, getUsernames } = require('./controllers/news.controller')

const app = express();

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api/users', getUsernames)

app.use('/*', (req, res) => {
    res.status(404).send({ msg: '404: Page Not Found.' });
});

app.use((err, req, res, next) => {
    if(err.status === 400) res.status(400).send({ message: '400: Bad Request.' })
    else next(err);
});

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({ message: '500: Internal Server Error.'})
})

module.exports = app