import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";

const app = express();

//gonna use the json middleware so that i can pass json body requests
app.use(express.json());
app.use(morgan("dev"));

// set up kinda a test route
app.get("/", (req, res) => res.send("Hello World"));

app.listen(5000, async () => {
  console.log("Server running at http://localhost:5000");

  try {
    await createConnection();
    console.log("Database Connected!");
  } catch (err) {
    console.log(err);
  }
});
