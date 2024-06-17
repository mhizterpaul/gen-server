import express, { Router, Request, Response } from 'express'
import validateParams from '../middleware/validateParams';
import User from '../models/user.model';

//routes map endpoint to controller function
const router = express.Router();

router.post('/', validateParams, async (req: Request, res: Response) => {
    const {firstName, lastName, email, password} = req.body;
    if(!req.valid) {
        res.status(400).send('Invalid user data')
        return false;
    }
    const admin = new User({
        firstName, lastName, email, password, role: 'admin'
    })
    try{
        await admin.save();
        res.status(200).send(admin)
        return true;
    }catch(e){
        res.status(500).send('Internal server error')
        return false;
    }

})

export default router