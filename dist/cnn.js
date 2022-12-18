"use strict";

var _dotenv = require("dotenv");
var pgPromise = require('pg-promise');
var dbconfig = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '5432',
  database: process.env.DATABASE || 'gestion_pedidos',
  user: process.env.USER || 'postgres',
  password: process.env.PASSWORD || 'root'
};
var pgp = pgPromise({});
var db = pgp(dbconfig);
exports.db = db;