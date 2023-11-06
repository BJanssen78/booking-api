import express from "express";
import log from "./handlers/logHandler.js";
import loginRouter from "./routes/login.js";
import userRouter from "./routes/users.js";
import errorHandler from "./handlers/errorhandler.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(log);

app.use("/users", userRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello World!, here come my new hotel booking site");
});

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
