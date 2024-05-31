import { renderToString } from 'react-dom/server'
import express, { Router } from 'express'


//routes map endpoint to controller function
const router = express.Router();

router.post('/signup', (req, res) => {
    res.send('Sign up route')
})

export default router