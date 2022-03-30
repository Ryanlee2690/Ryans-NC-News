const express = require('express');

const { getTopics, getArticleById, patchVotesById, getUsernames } = require('./controllers/news.controller')

const app = express();

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api/articles/:article_id', getArticleById);

app.patch('/api/articles/:article_id', patchVotesById)

app.get('/api/users', getUsernames)


app.use('/*', (req, res) => {
    res.status(404).send({ msg: '404: Page Not Found.' });
});

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({msg: err.msg})
    } else {
        next (err)
    }
})

app.use((err, req, res, next) => {
    if(err.status === 400) res.status(400).send({ message: '400: Bad Request.' })
    else next(err);
});

app.use((err, req, res, next) => {
    console.log(err, 'Is it logging this')
    res.status(500).send({ message: '500: Internal Server Error.'})
})

module.exports = app