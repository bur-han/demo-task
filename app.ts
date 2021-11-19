require('dotenv').config()
import app from './infrastructure/http/bootstrap/bootstrap'

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});