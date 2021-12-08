import express from 'express';
import routes from '../routes/index.route';
import session from 'express-session';
import config from '../../App/Infrastructure/Config/auth';

const app = express();
app.use(express.json());
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
);
app.use(routes);

export default app;
