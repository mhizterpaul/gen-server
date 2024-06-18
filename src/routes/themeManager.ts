import {Router} from 'express'

const router = Router();


router.get('/theme', ()=>{
    //get the current loaded theme
    
})

router.put('theme/:id', ()=>{
    //update the loaded theme
})

router.delete('/theme', ()=>{

    //unload the current theme
    //rollback to default theme
})
