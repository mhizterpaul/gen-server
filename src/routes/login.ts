import express, {Request, Response} from 'express'
import passport from 'passport'
import {renderToString} from 'react-dom/server'
import Login from '../views/pages/Login'

const router = express.Router()


router.post(
    "/",
    passport.authenticate("local",{failureRedirect: "/login"}),
    (req: Request, res:Response) => {
      res.redirect("/dashboard");
    }
  );


export default router;

  