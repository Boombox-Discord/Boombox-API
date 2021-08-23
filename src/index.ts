import express, { Express } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import Router from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggetDocument from "./public/swagger.json";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(express.static("public"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggetDocument));

app.use(Router);

app.listen(PORT, () => console.log(`Running on ${PORT}`));
