require('dotenv').config();
import app from './Http/bootstrap/bootstrap';
import logger from './App/Infrastructure/Services/logger.service';

app.listen(4000, () => {
  logger.info('Server is listening on port 4000');
});
