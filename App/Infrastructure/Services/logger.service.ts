const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export default logger;
