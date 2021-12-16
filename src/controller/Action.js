/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
var moment = require('moment');
const actionModel = require('../model/Action.model');
const { success, failed } = require('../helpers/respon');

const Action = {
  Main: async (context) => {
    var State = context.state;

    if (State.nama == '') {
      var nama = context.event.text;
      var chat = context.event.text;
      context.setState({
        nama,
        chat,
      });

      // save to mysql
      actionModel.insert(context.session);

      await context.sendText(
        `Hello ${nama}, when is your birthday? Please answer in YYYY-MM-DD format.`
      );
    } else if (State.nama !== '' && State.bday == '') {
      var now = moment();
      var bday = context.event.text;
      var chat = context.event.text;

      // save to mysql
      actionModel.insert(context.session);

      // calculate day differences
      bday = moment(bday, 'YYYY-MM-DD', true);

      // validasi bday
      if (bday.isValid()) {
        context.setState({
          bday,
        });
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
      } else {
        // response chat
        await context.sendText(
          `Sorry, your birthday is not valid. input again, Please answer in YYYY-MM-DD format.`
        );
      }
    } else if (State.bday !== '' && State.know == '') {
      var know;
      if (context.event.isPayload) {
        know = context.event.payload;
      } else {
        know = context.event.text;
      }
      var bday = moment(context.state.bday).format('YYYY-MM-DD');
      var now = moment().format('YYYY-MM-DD');
      var chat = context.event.text;
      var count = State.count + 1;
      context.setState({
        chat,
      });

      // save to mysql
      actionModel.insert(context.session);

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
        context.setState({
          know,
          count,
        });
        await context.sendText(
          `It's ${dayleft} day(s) left till your next birthday at ${moment(
            bdayNow
          ).format('LL')} ~ auto reset`
        );
      } else if (know.toUpperCase().startsWith('N')) {
        context.setState({
          count,
          know,
        });
        await context.sendText(`Ok then. Good bye ~ auto reset`);
      } else {
        await context.sendText(`Sorry, yes/no?`);
      }
    } else if (State.count == 1) {
      context.setState({
        count: 0,
        nama: '',
        bday: '',
        know: '',
      });
      await context.sendText('Hi, whats your name?');
    }
  },

  GetAll: (req, res) => {
    actionModel
      .getAllMessage()
      .then((result) => {
        success(res, result, 'succes');
      })
      .catch((err) => {
        failed(res, 500, err);
      });
  },
  GetMsgUser: (req, res) => {
    const { id } = req.params;

    actionModel
      .getUserMessage(id)
      .then((result) => {
        success(res, result, 'succes');
      })
      .catch((err) => {
        failed(res, 500, err);
      });
  },
  DeleteMsg: (req, res) => {
    const { id } = req.params;
    actionModel
      .deleteMsg(id)
      .then((result) => {
        success(res, result, 'succes');
      })
      .catch((err) => {
        failed(res, 500, err);
      });
  },
};

module.exports = Action;
