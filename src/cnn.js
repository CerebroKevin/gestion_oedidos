const pgPromise = require('pg-promise')
import { config } from 'dotenv'
   
const dbconfig={
    host:process.env.HOST || 'localhost',
    port:process.env.PORT || '5432',
    database:process.env.DATABASE || 'gestion_pedidos',
    user:process.env.USER || 'postgres',
    password:process.env.PASSWORD || 'root'
}
const pgp = pgPromise({})
const db = pgp(dbconfig)
exports.db=db