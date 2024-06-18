import {Router, Request, Response, NextFunction} from 'express';
import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer'
import GridFs from 'gridfs-stream';
import mongoose from 'mongoose';
import makeTempFile from '../utils/makeTempFile';

const router = Router();

const photosStorage = new GridFsStorage({ 
    url: process.env.MONGO_URI + "/gallery",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return {
        bucketName: 'photos',       // Setting bucketName to 'photos'
        filename: file.originalname // The name of the file as in the user's machine
      }
    }

});
const videosStorage = new GridFsStorage({
    url: process.env.MONGO_URI + "/gallery",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'videos',
            filename: file.originalname
        }
    }

});

const uploadPhotos = multer({ storage: photosStorage });
const uploadVideos = multer({ storage: videosStorage });
const connection = mongoose.connection;
let gfs;

connection.once('open', () => {
    gfs = GridFs(connection.db, mongoose.mongo);
    gfs.collection('photos');
    gfs.collection('videos');
})


router.post('/upload/images', uploadPhotos.array('photos', 12), (req: Request, res: Response)=> {
    //files are in req.files
    res.status(200).json({message: 'Images uploaded successfully'})
})

router.post('/upload/videos', uploadVideos.array('videos', 12), (req: Request, res: Response)=> {
    res.status(200).json({message: 'Videos uploaded successfully'})
})

router.get('/images', async (req: Request, res: Response)=> {
    const photos = await gfs.files.find({ bucketName: 'photos' }).toArray();
    const paths = [];
    for(const photo of photos) {
        try{
            paths.push(await makeTempFile(photo, gfs));
        }catch(e){
            console.error('Error making temporary file:', e);
        }
    }
    res.status(200).send(paths);
})

router.get('/images/:id', async(req: Request, res: Response)=> {
    const file = await gfs.files.findOne({ name: req.params.id });
    if (!file) {
        return res.status(404).send({ message: 'File not found' });
    }

    try{
        const tempFilePath = await makeTempFile(file, gfs);
        res.status(200).sendFile(tempFilePath);

    }catch(e){
        res.status(500).send({message: 'internal server error'})
    }
    

})


router.get('/videos', async (req: Request, res: Response)=> {
    const videos = await gfs.files.find({ bucketName: 'videos' }).toArray();
    const paths = [];
    for(const video of videos) {
        try{
            paths.push(await makeTempFile(video, gfs));
        }catch(e){
            console.error('Error making temporary file:', e);
        }
    }
    res.status(200).send(paths);
})

router.get('/videos/:id', async(req: Request, res: Response)=> {
    const file = await gfs.files.findOne({ name: req.params.id });
    if (!file) {
        return res.status(404).send({ message: 'File not found' });
    }

    try{
        const tempFilePath = await makeTempFile(file, gfs);
        res.status(200).sendFile(tempFilePath);
        
    }catch(e){
        res.status(500).send({message: 'internal server error'})
    }

})

router.delete('/videos', (req, res)=> {
    req.body.forEach(async (videoName) => {
        const video = await gfs.files.findOne({ name: videoName });
        if (!video) {
            return res.status(404).send({ message: 'File not found' });
        }
        gfs.remove({ _id: video._id }, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });
    })

})
router.delete('/photos', (req, res) => {
    //takes an array of names  to delete
    req.body.forEach(async (videoName) => {
        const video = await gfs.files.findOne({ name: videoName });
        if (!video) {
            return res.status(404).send({ message: 'File not found' });
        }
        gfs.remove({ _id: video._id }, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });
    })
})
export default router;


