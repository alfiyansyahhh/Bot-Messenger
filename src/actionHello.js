module.exports = {
  Hello: async function (context) {
    // response chat
    await context.sendText('Hi, whats your name?');
  },
};
