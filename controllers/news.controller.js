
const { selectAllTopics, selectAllUsernames, lookupArticleById} = require("../models/news.model");


exports.getTopics = (req, res, next) => {
    selectAllTopics()
    .then((topics) => {
     res.status(200).send({topics})
    })
    .catch((err) => {
        next(err);
    })
  };


  exports.getUsernames = (req, res, next) => {
    selectAllUsernames()
    .then((usernames) => {
     res.status(200).send({usernames})
    })
    .catch((err) => {
        next(err);
    })
  };

  exports.getArticleById =(req, res, next) => {
      const id = req.params.article_id;
      lookupArticleById(id)
      .then((article) => {
          res.status(200).send({article})
      })
      .catch((err) => {
          next(err)
      })

  }

