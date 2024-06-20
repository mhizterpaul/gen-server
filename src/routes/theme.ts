import {Router, Request, Response} from 'express'
import multer from 'multer'
import fs from 'fs'
import AdmZip from 'adm-zip'
import theme from '../controllers/themes.controller'


const router = Router();
const storage = multer.diskStorage({
    destination: '/themes',
})

const upload = multer({ storage })


router.post('/themes', upload.single('theme'), (req: Request, res: Response)=> {
    try{
        const zip = new AdmZip(req.file.path)
        zip.extractAllTo('/themes/'+req.file?.filename, true)
        fs.unlink(req.file.path, ()=> res.status(200).send('Theme uploaded successfully')) 
    }catch(e){
        console.error(e)
        res.status(500).json({message: 'Error uploading theme'})
    }
   
})

router.get('/themes', async(req: Request, res: Response)=> {
    //get the uploaded themes
    let entries;
    await fs.readdir('/themes/', {}, (err, files)=>{
        if(err){
            console.error(err)
            return res.status(500).json({message: 'Error getting themes'})
        }
        entries = files;
    });
    const directories = entries.filter(entry => fs.lstatSync('/themes/'+entry).isDirectory())
    res.status(200).json(directories)
    
})

router.delete('/themes/:id', (res: Response, req: Request)=>{
    //delete the specified theme
    fs.rmdir('/themes/'+req.params.id, {recursive: true}, (err)=>{
        if(err){
            console.error(err)
            return res.status(500).json({message: 'Error deleting theme'})
        }
        res.status(200).json({message: 'Theme deleted successfully'})
    })
})

router.delete('/theme/current', (req: Request, res: Response)=>{
    theme.unload();
    res.send('Theme unloaded successfully');
})

export default router;