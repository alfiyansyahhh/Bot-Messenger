const express = require('express');
const actionController = require('../controller/Action');

const actionRouter = express.Router();
actionRouter
  .get('/message', actionController.GetAll)
  .get('/message/:id', actionController.GetMsgUser)
  .delete('/message/:id', actionController.DeleteMsg);

module.exports = actionRouter;
