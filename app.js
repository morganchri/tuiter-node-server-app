import express from 'express';
import cors from 'cors';
import HelloController from "./controllers/hello-controller.js";
import UserController from "./controllers/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import "dotenv/config"
import session from "express-session";
import AuthController from "./controllers/auth-controller.js";

const app = express()

// app.set("trust_proxy", 1)
app.use(
	cors({
			 credentials: true,
			 origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_LOCAL]
		 })
);


// // https://stackoverflow.com/questions/54019064/condition-cors-access-control-allow-origin-in-express-js
// app.use((req, res, next) => {
// 	const allowedOrigins = ["http://localhost:3000", "https://a5--resilient-clafoutis-a7cc91.netlify.app"];
// 	const origin = req.headers.origin;
//
// 	if (allowedOrigins.includes(origin)) {
// 		res.header("Access-Control-Allow-Origin", origin);
// 	}
//
// 	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
// 	res.header("Access-Control-Allow-Credentials", "true");
// 	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
//
// 	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, access-control-allow-origin');
// 	next();
// });
//

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
app.options("*", cors());
TuitsController(app);
HelloController(app)
UserController(app)
AuthController(app);
app.listen(process.env.PORT || 4000)