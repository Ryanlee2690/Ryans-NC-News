const db = require('../db/connection')

exports.selectAllTopics = () => {
    return db.query('SELECT * FROM topics')
    .then(({rows}) => {
    return rows
    });
};

exports.lookupArticleById = (id) => {
    return db.query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes,
    COUNT(comments.article_id) AS comment_count FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1 GROUP BY articles.article_id`, [id])
    .then (({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ msg: 'Invalid ID', status: 404})
        }
        return rows[0]
    })
}

exports.updateVotesById = (articleInfo, articleID) => {
    const {inc_votes} = articleInfo
   if (typeof inc_votes !== 'number') {
       return Promise.reject({ msg: 'Please use numbers only.', status: 400})
   }
     return db.query("SELECT votes FROM articles WHERE article_id = $1", [articleID]).then(({rows}) =>{
        let newVoteTotal = (rows[0].votes + inc_votes)
        return db.query("UPDATE articles SET votes = $1 WHERE  article_id = $2 RETURNING*;", [newVoteTotal, articleID])
        .then(({rows}) => {
            return rows[0].votes
        })
    })

};

exports.selectAllUsernames = () => {
    return db.query('SELECT username FROM users')
    .then(({rows}) => {
        return rows
    });
};

