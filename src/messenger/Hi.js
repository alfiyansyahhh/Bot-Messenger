module.exports = {
  Hello: async (context) => {
    // response chat
    await context.sendText('Hi, whats your name?');
  },
};
