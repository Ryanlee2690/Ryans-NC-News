const db = require('../db/connection')

exports.selectAllTopics = () => {
    return db.query('SELECT * FROM topics')
    .then(({rows}) => {
        if (rows.length === 0) {
            return Promise.reject({ msg: "not found", status: 403 })
        }
        return rows
    });
};