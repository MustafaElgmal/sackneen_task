import express, { urlencoded, json } from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { connection } from "./db/connectionDB";
import userRouter from './routes/user'
import movieRouter from './routes/movie'

const app = express();


config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use('/api/users',userRouter)
app.use('/api/movies',movieRouter)
app.get("*", (req, res) => {
  res.status(401).send({ error: "Api not found!" });
});
const port = process.env.PORT || 4000;
app.listen(port,() => {
   connection(port);
});




