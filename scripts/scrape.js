const axios = require('axios');
const cheerio = require('cheerio');

const scrape = cb => {
    axios.get('http://www.nytimes.com', (error, response, body) => {

        const $ = cheerio.load(body);

        const articles = [];

        $('.theme-summary').each((i, element) => {
            const head = $(this).children('.story-heading').text().trim();
            const sum = $(this).children('.summary').text().trim();

            if (head && sum) {
                const headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                const sumNeat = des.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                const dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;