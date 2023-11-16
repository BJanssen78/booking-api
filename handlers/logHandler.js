import logger from "../logs/log.js";

const logHandler = (req, res, next) => {
  const start = new Date();

  // Store the original end method
  const originalEnd = res.end;

  // Create a function to replace res.end
  res.end = function (chunk, encoding) {
    // Call the original end method
    originalEnd.apply(res, arguments);

    // Log the response status code after the response has been sent
    const ms = new Date() - start;
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    logger.info(
      `Timestamp: ${currentDate}, ${currentTime} Method: ${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`
    );
  };

  // Continue passing the request to the next middleware
  next();
};

export default logHandler;
