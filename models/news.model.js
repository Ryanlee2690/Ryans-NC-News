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
            return Promise.reject({ msg: "not found", status: 404 })
        }
        return rows
    });
};

exports.selectAllUsernames = () => {
    return db.query('SELECT username FROM users')
    .then(({rows}) => {
        return rows
    });
};
            return Promise.reject({ msg: 'Invalid ID', status: 404})
        }
        return rows[0]
    });
};

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

}
