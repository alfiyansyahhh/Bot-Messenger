module.exports = {
  Hello: async function (context) {
    // response chat
    let session = context.session;
    console.log(context.session, 'ini sesion');
    console.log(session._state, 'ini state');
    console.log(session.lastActivity, 'ini ac');

    await context.sendText('Hi, whats your name?');
  },
};
