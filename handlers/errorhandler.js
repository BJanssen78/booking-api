const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Error code 500 : Server error" });
};

export default errorHandler;
