const { router, text } = require('bottender/router');
const { Hello } = require('./controller/Hi');
const { Action } = require('./controller/Action');

module.exports = async function App() {
  return router([
    // call Hello action when receiving "hello"/"hi" (case-insensitive) text messages
    text(/^(hello|hi)$/i, Hello),
    // call Main action for any text except "hello/hi"
    text('*', Action.Main),
  ]);
};
