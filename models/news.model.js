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
    })
}
