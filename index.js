import express from "express";
import logHandler from "./handlers/logHandler.js";
import loginRouter from "./routes/login.js";
import userRouter from "./routes/users.js";
import bookingRouter from "./routes/bookings.js";
import errorHandler from "./handlers/errorhandler.js";
import "dotenv/config";
import checkHeader from "./handlers/checkHeader.js";
import hostRouter from "./routes/hosts.js";

const app = express();

app.use(express.json());
app.use(logHandler);
app.use(checkHeader);

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/bookings", bookingRouter);
app.use("/host", hostRouter);

app.get("/", (req, res) => {
  res.send("Hello World!, here come my new hotel booking site");
});

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
