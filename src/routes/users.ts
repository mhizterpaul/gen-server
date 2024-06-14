import express, {Router, Request, Response, NextFunction} from 'express'
import {User as UserType} from '../types/user'

const router = Router();

import mongoose, {Schema} from 'mongoose'

const user = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String
})

const User = mongoose.model('User', user)

const validateParams = (req: Request, res: Response, next: NextFunction) => {
    const {firstName, lastName, email, password, role } = req.body;
    const user: UserType = {firstName, lastName, email, password, role}
    const test = {
        firstName: /^[a-zA-Z]{4,}$/,
        lastName: /^[a-zA-Z]{4,}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        password: /^[a-zA-Z0-9]{8,}$/,
        role: /^(admin|writer|manager)$/

    }

    for (let key in user) {
        if(!test[key].test(user[key])) req.valid = false;
    }else{
        req.valid = true;
    }

    next()
}

const findUser = (req: Request, res: Response, next: NextFunction)=> {
    User.find({email: req.body.email}, (err, data) => {
        if(err) {
            req.error = true;
        }else{
            req.user = data.length > 0;
        }
        next()
    })
}

router.post('/', validateParams, findUser, async (req: Request, res: Response) => {
    //request should be from user 
    //request can be from admin
    if (req.error) {
        res.status(500).send('Internal server error')
        return false;    
    }
    if (!req.valid) {
        req.status(400).send('Invalid user data')
        return false;
    }
    if(req.user) {
        res.status(400).send('User already exists')
        return false;
    }

    const {firstName, lastName, email, password, role} = req.body;
        
    const newUser = new User({
        firstName, lastName, email, password, role
    })
    try{
        await newUser.save();
        res.status(200).send(newUser)
        return true;
    }catch(err) {
        res.status(500).send('Internal server error')
        return false;
    }

});

router.put('/', validateParams, findUser, (req: Request, res: Response, )=> {
    const {firstName, lastName, email, password, role} = req.body;

    if (req.error) {
        res.status(500).send('Internal server error')
        return false;    
    }
    if (!req.valid) {
        req.status(400).send('Invalid user data')
        return false;
    }
    if(!req.user) {
        res.status(400).send('User does not exist')
        return false;
    }
    let status;
    User.updateOne({email}, {
        firstName, lastName, email, password, role
    }, (err, data) => {
        if(err) {
            res.status(500).send('Internal server error')
            status = false;
        }
        res.status(200).send('User updated')
        status = true;
    })
    return status;
})

router.delete('/', validateParams, findUser, (req: Request, res: Response) => {
    const {email} = req.body;
    if (req.error) {
        res.status(500).send('Internal server error')
        return false;    
    }
    if (!req.valid) {
        req.status(400).send('Invalid user data')
        return false;
    }
    if(!req.user) {
        res.status(400).send('User does not exist')
        return false;
    }
    let status;
    User.deleteOne({email}, (err, data) => {
        if(err) {
            res.status(500).send('Internal server error')
            status = false;
        }
        res.status(200).send('User deleted')
        status = true;
    })
    return status;
})




