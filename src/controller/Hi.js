module.exports = {
  Hello: async function (context) {
    // response chat
    let session = context.session;
    console.log(context.session);
    console.log(session._state);

    await context.sendText('Hi, whats your name?');
  },
};
