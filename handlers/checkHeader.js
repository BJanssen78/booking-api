import express from "express";

const checkHeader = (req, res, next) => {
  const authHeader = req.get("X-Auth");

  console.log(authHeader);
  if (authHeader === undefined || authHeader !== "admin") {
    res.status(400).send("Missing or incorrect header X-Auth");
  } else {
    next();
  }
};

export default checkHeader;
