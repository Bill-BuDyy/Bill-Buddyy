import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: __dirname.replace("build", ".env"),
});
import connectDatabase from "./utils/connectDatabase";
import config from "./config/config";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from './routes/user/user.routes';
import groupRouter from './routes/group/group.routes';
import activityRoutes from './routes/activity/activity.routes';

connectDatabase(config.db);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:3000", process.env.FRONTEND_URL as string],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(express.static("public"));

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRouter);
app.use('/api/activities', activityRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
