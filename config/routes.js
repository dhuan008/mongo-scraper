const scrape = require('../scripts/scrape');

const headlinesController = require('../controllers/headlines');
const notesController = require('../controllers/notes');

module.exports = app => {
    // Render homepage 
    app.get('/', (req, res) => {
        res.render('home');
    });

    // Render saved handlebars page
    app.get('/saved', (req, res) => {
        res.render('saved');
    });

    app.get('/api/fetch', (req, res) => {
        headlinesController.fetch((err, docs) => {
            if(!docs || docs.insertedCount === 0) {
                res.json({
                    message: 'No new articles'
                });
            }
            else {
                res.json({
                    message: `Added ${docs.insertedCount} new articles`
                });
            }
        });
    });

    app.get('/api/headlines', (req, res) => {
        const query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlinesController.get(query, data => {
            res.json(data);
        });
    });

    app.delete('/api/headlines/:id', (req, res) => {
        const query = {};
        query._id = req.params.id;
        headlinesController.delete(query, (err, data) => {
            res.json(data);
        });
    });

    app.patch('/api/headlines', (req, res) => {
        headlinesController.update(req.body, (err, data) => {
            res.json(data);
        });
    });

    app.get('/api/notes/:headline_id?', (req, res) => {
        const query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }

        notesController.get(query, (err, data) => {
            res.json(data);
        });
    });

    app.delete('/api/notes/:id', (req, res) => {
        const query = {};
        query._id = req.params.id;
        notesController.delete(query, (err, data) => {
            res.json(data);
        });
    });

    app.post('/api/notes', (req, res) => {
        notesController.save(req.body, data => {
            res.json(data);
        });
    });
}