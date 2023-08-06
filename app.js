import express from 'express';
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import "dotenv/config"
import session from "express-session";
import AuthController from "./controllers/auth-controller.js";

const app = express()

app.use(
	cors({
			 credentials: true,
			 origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_LOCAL]
		 })
);

const sessionOptions = {
	secret: "any string",
	resave: false,
	saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true;
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
	};
}
app.use(session(sessionOptions));

app.use(express.json());
// app.options("*", cors());
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000)