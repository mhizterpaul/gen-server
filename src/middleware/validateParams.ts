import { Request, Response, NextFunction } from 'express';

const validateParams = (req: Request, res: Response, next: NextFunction) => {
    const {firstName, lastName, email, password, role } = req.body;
    const user = {firstName, lastName, email, password, role}
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

export default validateParams;