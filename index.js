import express from "express";
import "dotenv/config";

const app = express();
app.get("/", (req, res) => {
  res.send("Hello World!, here come my new hotel booking site");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
