"use strict";

var pgPromise = require('pg-promise');
var config = {
  host: 'localhost',
  port: '5432',
  database: 'gestion_pedidos',
  user: 'postgres',
  password: 'root'
};
var pgp = pgPromise({});
var db = pgp(config);
exports.db = db;