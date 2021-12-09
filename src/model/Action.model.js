/* eslint-disable no-undef */
const db = require('../config/db');

const actionModels = {
  insert: (session) =>
    db.query(
      `INSERT INTO message (lastActivity,userID,chat,user_name) 
        VALUE ('${session.user._updatedAt}','${session.user.id}','${session._state.chat}','${session._state.nama}')`
    ),

  getUserMessage: (id) =>
    new Promise((resolve, reject) => {
      db.query(
        `select id,chat,lastActivity from message where userID='${id}'`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    }),
  getAllMessage: () =>
    new Promise((resolve, reject) => {
      db.query(`select id,chat,lastActivity from message`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),
  deleteMsg: (id) =>
    new Promise((resolve, reject) => {
      db.query(`delete from message where id='${id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    }),
};

module.exports = actionModels;
