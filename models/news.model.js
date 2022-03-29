const db = require('../db/connection')

exports.selectAllTopics = () => {
    return db.query('SELECT * FROM topics')
    .then(({rows}) => {
    return rows
    });
};

exports.lookupArticleById = (id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1', [id])
    .then (({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ msg: 'Invalid ID', status: 404})
        }
        return rows
    });
};

exports.updateVotesById = (articleInfo, articleID) => {
    const {inc_votes} = articleInfo
   if (typeof inc_votes !== 'number') {
       return Promise.reject({ msg: 'Is it that hard to just use numbers?', status: 404})
   }
     return db.query("SELECT votes FROM articles WHERE article_id = $1", [articleID]).then(({rows}) =>{
        let newVoteTotal = (rows[0].votes + inc_votes)
        if (newVoteTotal < 0) {
            newVoteTotal = 0
        }
        return db.query("UPDATE articles SET votes = $1 WHERE  article_id = $2 RETURNING*;", [newVoteTotal, articleID])
        .then(({rows}) => {
            return rows[0].votes
        })
    })
};
        return rows[0]
    })
}

