//server initialization
//and server routes
//role based access to routes

import express, { Express, Request, Response } from "express";


const app: Express = express();
const port = process.env.PORT || 3000;


app.get("/", home);

app.get("/cp", isAuthenticated, isAuthorized, login);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


export default app;