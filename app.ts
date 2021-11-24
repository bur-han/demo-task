require('dotenv').config()
import app from './infrastructure/http/bootstrap/bootstrap'
import logger from './infrastructure/services/logger.service'

app.listen(3000, () => {
    logger.info("Server is listening on port 3000");
});


