//server initialization
//and server routes
//role based access to routes

import express, { Express, Request, Response } from "express";
import session from 'express-session'
import passport from 'passport'
import {renderToString} from 'react-dom/server'
import {Strategy as LocalStrategy} from 'passport-local'
import App from './views/App'
import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const store = new session.MemoryStore();
const dbInit = async () => await mongoose.connect(process.env.MONGO_URI as string);


app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store
})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  // Look up user id in database. 
  db.users.findById(id, function (err, user) {
    if (err) return done(err); 
    done(null, user);
  });
});

passport.use(new LocalStrategy((username, password, done) => {
  if(username === "admin" && password === "admin") {
    return done(null, {username: "admin"})
  } else {
    return done(null, false)
  }
}));


app.get(
  '/', (req: Request, res: Response) => {
    const html = renderToString(< App />);
    res.status(200).send(html)
  }
)

dbInit().then(() => 
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  })
).catch((error) => {
  console.error(error)
});
