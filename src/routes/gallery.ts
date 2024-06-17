import {Router, Request, Response, NextFunction} from 'express';
import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer'
import GridFs from 'gridfs-stream';
import mongoose from 'mongoose';

const router = Router();

const photosStorage = new GridFsStorage({ 
    process.env.MONGO_URI + "/gallery",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return {
        bucketName: 'photos',       // Setting bucketName to 'photos'
        filename: file.originalname // The name of the file as in the user's machine
      }
    }

});

const videosStorage = new GridFsStorage({ 
    process.env.MONGO_URI + "/gallery",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return {
        bucketName: 'videos',       // Setting bucketName to 'photos'
        filename: file.originalname // The name of the file as in the user's machine
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
    const videos = await gfs.files.find({ bucketName: 'videos' }).toArray();
    return videos; // Return an array of video objects
})

router.get('/images/:id', async(req: Request, res: Response)=> {
    const video = await gfs.files.findOne({ name: req.params.id });
    return video; // Return the video object

})


router.get('/videos', async (req: Request, res: Response)=> {
    const videos = await gfs.files.find({ bucketName: 'videos' }).toArray();
    return videos; // Return an array of video objects
})

router.get('/videos/:id', async(req: Request, res: Response)=> {
    const video = await gfs.files.findOne({ name: req.params.id });
    return video; // Return the video object

})

router.delete('/videos', (req, res)=> {

})
router.delete('/photos', (req, res) => {
    //takes an array of names  to delete
})
export default router;
