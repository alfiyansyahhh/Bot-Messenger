/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-redeclare */

const actionModel = require('../model/Action.model');
const { success, failed } = require('../helpers/respon');

const Action = {
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
