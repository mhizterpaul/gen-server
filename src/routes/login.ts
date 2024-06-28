import express, {Request, Response} from 'express'
import passport from 'passport'


const router = express.Router()


router.post(
    "/",
    passport.authenticate("local",{failureRedirect: "/login"}),
    (req: Request, res:Response) => {
      res.redirect("/dashboard");
    }
  );

router.get(
  '/isAuthenticated', (req: Request, res: Response) => {
    res.send(req.isAuthenticated());
  })

router.get(
  '/user', (req:Request, res:Response)=>{
    res.send(req.user)
  })


export default router;

  