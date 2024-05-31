import express, {Request, Response} from 'express'
import passport from 'passport'
import {renderToString} from 'react-dom/server'

const router = express.Router()

router.get('/', ((req,res) => {

    res.status(200).send(

    )
})
);

router.post(
    "/",
    passport.authenticate("local",{failureRedirect: "/login"}),
    (req: Request, res:Response) => {
      res.redirect("profile");
    }
  );


  export default router;

  