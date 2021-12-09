module.exports = {
  Hello: async function (context) {
    // response chat
    let session = context.session;
    console.log(context.session, 'ini sesion');
    console.log(session._state, 'ini state');

    await context.sendText('Hi, whats your name?');
  },
};
