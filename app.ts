require('dotenv').config()
import express from 'express'
import routes from './infrastructure/http/routes/index.route'

const app = express();
app.use(express.json())
app.use(routes)
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});