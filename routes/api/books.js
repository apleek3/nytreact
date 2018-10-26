const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;

////////////////////////////////////////////////////////////////////////
var helpers = {

  runQuery: function runQuery(term, start, end) {

    var term = term.trim();
    var start = start.trim() + "0101";
    var end = end.trim() + "1231";

    return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        'api-key': APIKey,
        'q': term,
        'begin_date': start,
        'end_date': end
      }
    }).then(function (results) {

      return results.data.response;
    });
  },

  getSaved: function getSaved() {

    return axios.get('/api/saved').then(function (results) {

      return results;
    });
  },

  postSaved: function postSaved(title, date, url) {

    var newArticle = { title: title, date: date, url: url };
    return axios.post('/api/saved', newArticle).then(function (results) {
      return results._id;
    });
  },

  deleteSaved: function deleteSaved(title, data, url) {

    return axios.delete('/api/saved', {
      params: {
        'title': title,
        'data': data,
        'url': url
      }
    }).then(function (results) {
      return results;
    });
  }

};

module.exports = helpers;