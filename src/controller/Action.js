/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
var moment = require('moment');
const actionModel = require('../model/Action.model');
const { success, failed } = require('../helpers/respon');

const Action = {
  Main: async (context) => {
    // switch step
    switch (context.state.count) {
      case 0:
        var count = context.state.count + 1;
        context.setState({
          count,
        });
        // save to mysql
        actionModel.insert(context.session);

        // response chat
        await context.sendText(`Hi, whats your name?`);
        break;

      case 1:
        // state
        var nama = context.event.text;
        var count = context.state.count + 1;
        var chat = context.event.text;
        context.setState({
          count,
          nama,
          chat,
        });

        // save to mysql
        actionModel.insert(context.session);

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
        var chat = context.event.text;
        context.setState({
          count,
          bday,
          chat,
        });
        // save to mysql

        actionModel.insert(context.session);

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
        } else {
          know = context.event.text;
        }
        var bday = moment(context.state.bday).format('YYYY-MM-DD');
        var now = moment().format('YYYY-MM-DD');
        var chat = context.event.text;
        var count = context.state.count + 1;
        context.setState({
          know,
          count,
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
          await context.sendText(
            `It's ${dayleft} day(s) left till your next birthday at ${moment(
              bdayNow
            ).format('LL')}`
          );
          break;
        } else {
          context.setState({
            count: 1,
          });
          await context.sendText(`Ok then. Good bye ~`);
          break;
        }

      case 4:
        var count = 0;
        var chat = context.event.text;
        context.setState({
          count,
          chat,
        });

        context.setState({
          count: 0,
        });
        await context.sendText(`Ok then. Good bye ~ auto reset`);
        break;
    }
  },
  GetAll: (req, res) => {
    try {
      actionModel
        .getAllMessage()
        .then((result) => {
          success(res, result, 'succes');
        })
        .catch((err) => {
          failed(res, 500, err);
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  GetMsgUser: (req, res) => {
    const { id } = req.params;
    try {
      actionModel
        .getUserMessage(id)
        .then((result) => {
          success(res, result, 'succes');
        })
        .catch((err) => {
          failed(res, 500, err);
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
  DeleteMsg: (req, res) => {
    try {
      const { id } = req.params;
      actionModel
        .deleteMsg(id)
        .then((result) => {
          success(res, result, 'succes');
        })
        .catch((err) => {
          failed(res, 500, err);
        });
    } catch (error) {
      failed(res, 401, error);
    }
  },
};

module.exports = Action;
