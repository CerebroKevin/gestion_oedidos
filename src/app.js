import express  from "express";
import morgan from "morgan";
import router from "./routes/index";

const app= express();

//Settings
app.set("port",process.env.PORT || 4000);

//Middelwares
app.use(morgan("dev"));
app.use(express.json());
//Routers
app.use(router);

export default app;