require('dotenv').config()
import app from './Http/bootstrap/bootstrap'
import logger from './App/Infrastructure/Helpers/logger'

app.listen(3000, () => {
    logger.info("Server is listening on port 3000");
});


