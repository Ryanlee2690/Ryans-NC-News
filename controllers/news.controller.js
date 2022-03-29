const { selectAllTopics, updateVotesById } = require("../models/news.model");

exports.getTopics = (req, res, next) => {
    selectAllTopics()
    .then((topics) => {
     res.status(200).send({topics})
    })
    .catch((err) => {
        next(err);
    })
  };

  exports.patchVotesById = (req, res, next) => {
    const articleID = req.params.article_id;
    const articleInfo = req.body;
    updateVotesById(articleInfo, articleID)
    .then((newVotesTotal) => {
      res.status(200).send({newVotesTotal})
    })
    .catch((err) => {
        next(err);
    })
  };