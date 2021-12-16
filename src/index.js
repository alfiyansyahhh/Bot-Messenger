const { router, text, payload } = require('bottender/router');
const { Hello } = require('./messenger/Hi');
const Action = require('./messenger/action.messenger');

module.exports = async function App() {
  return router([
    payload('GET_STARTED', Hello),
    // call Hello action when receiving "hello"/"hi" (case-insensitive) text messages
    text(/^(hello|hi)$/i, Hello),
    // call Main action for any text except "hello/hi"
    text('*', Action.Main),
  ]);
};
