/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
var moment = require('moment');

const Action = {
  Main: async (context) => {
    // switch step
    switch (context.state.count) {
      //   case 0:
      //     // state
      //     var nama = context.event.text;
      //     var count = context.state.count + 1;
      //     context.setState({
      //       count,
      //       nama,
      //     });
      //     // save to mongo

      //     // response chat
      //     await context.sendText(`Hello ${nama} it's your name?`);
      //     break;
      // state

      case 1:
        // state
        var nama = context.event.text;
        var count = context.state.count + 1;
        context.setState({
          count,
          nama,
        });
        // save to mongo

        // response chat
        await context.sendText(
          `Hello ${nama}, when is your birthday? Please answer in YYYY-MM-DD format.`
        );
        break;

      case 2:
        // state
        var now = moment();
        var bday = context.event.text;
        var count = context.state.count + 1;
        context.setState({
          count,
          bday,
        });
        // save to mongo

        // calculate day differences
        bday = moment(bday, 'YYYY-MM-DD', true);

        if (bday.isValid()) {
          // response chat
          await context.sendText(
            `Your birthday is at ${bday.format(
              'LL'
            )}. Do you want to know how many days till your next birthday?`,
            {
              quickReplies: [
                {
                  contentType: 'text',
                  title: 'Yes',
                  payload: 'BIRTHDAY_YES',
                },
                {
                  contentType: 'text',
                  title: 'No',
                  payload: 'BIRTHDAY_NO',
                },
              ],
            }
          );
          break;
        } else {
          // response chat
          var count = 2;
          context.setState({
            count,
          });
          await context.sendText(
            `Sorry, your birthday is not valid. input again, Please answer in YYYY-MM-DD format.`
          );
          break;
        }

      case 3:
        // state
        var know;
        if (context.event.isPayload) {
          know = context.event.payload;
          console.log(context.event, 'ini event');
          console.log(context.event.payload, 'ini payload');
          console.log(know, 'ini know');
        } else {
          know = context.event.text;
        }
        var bday = moment(context.state.bday).format('YYYY-MM-DD');
        var now = moment().format('YYYY-MM-DD');
        var count = 1;
        context.setState({
          know,
          count,
        });
        // save to mongo

        // calculate how many days till next birthday
        bdayNow = bday.split('-');
        bdayNow = `${now.split('-')[0]}-${bdayNow[1]}-${bdayNow[2]}`;
        bdayNow = moment(bdayNow).format('YYYY-MM-DD');
        var dayleft;
        if (bdayNow > now) {
          dayleft = moment(bdayNow).diff(moment(now), 'days');
        } else if (bdayNow < now) {
          bdayNow = moment(bdayNow).add(1, 'year').format('YYYY-MM-DD');
          bdayNow = moment(bdayNow).format('YYYY-MM-DD');
          dayleft = moment(bdayNow).diff(moment(now), 'days');
        } else {
          dayleft = 0;
        }
        // response chat
        if (know.toUpperCase().startsWith('Y')) {
          await context.sendText(
            `It's ${dayleft} day(s) left till your next birthday at ${moment(
              bdayNow
            ).format('LL')}`
          );
          break;
        } else {
          await context.sendText(`Ok then. Good bye ~`);
          break;
        }
    }
  },
};

module.exports = Action;
