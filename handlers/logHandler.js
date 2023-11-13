import logger from "../logs/log.js";

const logHandler = (req, res, next) => {
  const start = new Date();

  next();

  const ms = new Date() - start;
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  logger.info(
    `Timestamp: ${currentDate}, ${currentTime} Method: ${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`
  );
};

export default logHandler;
