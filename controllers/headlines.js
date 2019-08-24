const scrape = require('../scripts/scrape');
const makeDate = require('../scripts/date');

const Headline = require('../models/Headline');

module.exports = {
    fetch: cb => {
        scrape(data => {
            let articles = data;
            for (let i = 0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }

            Headline.collection.insertMany(articles, { ordered: false }, (err, docs) => {
                cb(err, docs);
            });
        });
    },
    delete: (query, cb) => {
        Headline.remove(query, cb);
    },
    get: (query, cb) => {
        Headline.find(query)
            .sort({
                _id: -1
            })
            .exec((err, doc) => {
                cb(doc);
            });
    },
    update: (query, cb) => {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
};