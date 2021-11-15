import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
let db:any
if(process.env.ORM === 'Sequelize')
{
    db = new Sequelize('todos', 'postgres', 'electric tomato', {
        host: 'localhost',
        dialect: 'postgres'
      });
    db.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err: any) => console.log('Error: ' + err))
}
if(process.env.ORM === 'Mongoose')
{
mongoose.connect(process.env.DATABASE_URL as any)
db = mongoose.connection
db.on('error', (error: any) => console.error(error))
db.once('open', () => console.log('Connected to database'))
}
export {db}