import * as express from "express";
import { Application } from "express";
import * as bodyParser from "body-parser";
import { TodoRoute } from "./Routes/createToDo";
import * as mongoose from "mongoose";
import { Connection } from "mongoose";
import { UserRoute } from "./Routes/userRoute";
mongoose.connect("mongodb://localhost/todotest", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db: Connection = mongoose.connection;

const app: Application = express();
app.use(bodyParser.json());

app.use("/", TodoRoute);
app.use("/user", UserRoute);
app.listen(5000, () => {
  console.log("Listening in port 5000");
});

db.on("error", () => {
  console.log("error took place while connecting");
});

db.once("open", () => {
  console.log("Conneting to mongoose sucessfull");
});
