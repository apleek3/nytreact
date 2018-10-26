// const axios = require("axios");
// const router = require("express").Router();

// router.get("/recipes", (req, res) => {
//   axios
//     .get("http://www.recipepuppy.com/api/", { params: req.query })
//     .then(({ data: { results } }) => res.json(results))
//     .catch(err => res.status(422).json(err));
// });

// module.exports = router;


const axios = require("axios");
const router = require("express").Router();
var APIKey = process.env.API_KEY

console.log(process.env.API_KEY)
router.get("/recipes", (req, res) => {
  axios
    .get("https://api.nytimes.com/svc/search/v2/articlesearch.json", { 
      params: { 
        'api-key': APIKey,
        'q': req.params,
        'begin_date': req.params,
        'end_date': req.params
      } 
    }).then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

module.exports = router;

// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "f707e238b7c84937921cc8933b487379",
//   'q': "obama",
//   'begin_date': "20141101",
//   'end_date': "20151101"
// });
// $.ajax({
//   url: url,
//   method: 'GET',
// }).done(function(result) {
//   console.log(result);
// }).fail(function(err) {
//   throw err;
// });

////////////////////////////////////////////////////////////////
// request.get({
//   url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
//   qs: {
//     'api-key': "f707e238b7c84937921cc8933b487379",
//     'q': "obama",
//     'begin_date': "20141101",
//     'end_date': "20151101"
//   },
// }, function(err, response, body) {
//   body = JSON.parse(body);
//   console.log(body);
// })

////////////////////////////////////////////////////////////////
// var helpers = {

//   runQuery: function runQuery(term, start, end) {

//     var term = term.trim();
//     var start = start.trim() + "0101";
//     var end = end.trim() + "1231";

//     return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
//       params: {
//         'api-key': APIKey,
//         'q': term,
//         'begin_date': start,
//         'end_date': end
//       }
//     }).then(function (results) {

//       return results.data.response;
//     });
//   },

//   getSaved: function getSaved() {

//     return axios.get('/api/saved').then(function (results) {

//       return results;
//     });
//   },

//   postSaved: function postSaved(title, date, url) {

//     var newArticle = { title: title, date: date, url: url };
//     return axios.post('/api/saved', newArticle).then(function (results) {
//       return results._id;
//     });
//   },

//   deleteSaved: function deleteSaved(title, data, url) {

//     return axios.delete('/api/saved', {
//       params: {
//         'title': title,
//         'data': data,
//         'url': url
//       }
//     }).then(function (results) {
//       return results;
//     });
//   }

// };

// module.exports = helpers;