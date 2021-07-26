const queryString = require('query-string');
const express = require('express');
const path = require('path');
const config = require('./config');
const app = express();
const DIST_DIR = path.join(__dirname, 'dist');

app.set('view engine', 'ejs');
app.set('views', path.join(DIST_DIR, 'templates'))
app.disable('x-powered-by');

// MIDDLEWARE
app.use(express.static(DIST_DIR));
app.use('/bootstrap', express.static(path.resolve(__dirname, 'node_modules', 'bootstrap', 'dist')));

// ROUTES
app.get('/healthcheck', (req, res) => {
	res.sendStatus(200);
});
app.get('/:locale?/subscribe', (req, res) => {
	res.redirect(301, `${config.checkout_web_server.host}/plus`);
});
app.get('/:locale?/subscribe/insights', (req, res) => {
	res.redirect(301, `${config.checkout_web_server.host}/insights`);
});
app.get('*', (req, res) => {
	res.render('index', { config });
});

// ERROR HANDLERS
app.use(function (req, res, next) {
	res.status(404).render('index', { config });
});
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).render('index', { config });
});

config.ports.map((port) => {
	app.listen(port, () => console.log(`App listening on port ${port}`));
});
