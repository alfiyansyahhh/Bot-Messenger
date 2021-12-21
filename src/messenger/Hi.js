module.exports = {
  Hello: async (context) => {
    var State = context.state;
    if (State.nama == '') {
      // response chat
      await context.sendText('Hi, whats your name?');
    } else if (State.nama !== '' && State.bday == '') {
      // response chat
      await context.sendText(
        `Hi, ${State.nama} when is your birthday? Please answer in YYYY-MM-DD format.`
      );
    } else if (State.nama !== '' && State.bday !== '') {
      // response chat
      await context.sendText(
        `Hi, ${State.nama} Your birthday is at ${State.bday.format(
          'LL'
        )}. Do you want to know how many days till your next birthday?`,
        {
          quickReplies: [
            {
              contentType: 'text',
              title: 'Yes',
              payload: 'YES',
            },
            {
              contentType: 'text',
              title: 'No',
              payload: 'NO',
            },
          ],
        }
      );
    }
  },
};
