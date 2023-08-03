import express from 'express';
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";

const app = express()
app.use(express.json());
app.use(
	cors({
			 credentials: true,
			 origin: process.env.FRONTEND_URL,
		 })
);

console.log("Frontend URL")
console.log(process.env.FRONTEND_URL)

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

TuitsController(app);
HelloController(app)
UserController(app)
AuthController(app);
app.listen(process.env.PORT || 4000)