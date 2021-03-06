const bodyParser = require('body-parser');
const express = require('express');
const { bottender } = require('bottender');

const actionRouter = require('./src/router/action.router.js');

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

// the request handler of the bottender app
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  const verify = (req, _, buf) => {
    req.rawBody = buf.toString();
  };

  server.use(bodyParser.json({ verify }));
  server.use(bodyParser.urlencoded({ extended: false, verify }));

  //action router
  server.use(actionRouter);

  // default route
  server.get('/', (req, res) => {
    res.json({ succes: true });
  });

  // route for webhook request
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
