import mongoose from "mongoose";
import { Schema } from "mongoose";
import fs from 'fs'
import { Router, Request, Response} from 'express'
import validateDB from "../utils/validateDB";

const router = Router();

const connectionString = process.env.MONGO_URI + "/app", // Replace with your details
Models = {}
mongoose.connect(connectionString)
.then(() => {
    fs.readFile('/dist/config.json', 'utf8', (err, data) => {
        const models = JSON.parse(data).models;
        models.forEach((model: any) => {

            if(validateDB(model).isSuccessful) return;
            const schema = new Schema(model);
            Models[model.name] = mongoose.model(model.name, schema);
        
        })
    })
})
.catch(err => {
  console.error(err);
});

//implement jwt to access the following routes

router.get('/collections', (req: Request, res: Response) => {
    res.send(Object.keys(Models));
})

router.get('/collection/:id', (req: Request, res: Response) => {
    const collection = Models[req.params.id];
    collection.find({}, (err, data) => {
        if(err) return res.status(500).send('could not find collection');
        res.send(data);
    })
});

router.get('/collection/:col/document/:id', (req: Request, res: Response)=> {
    const collection = Models[req.params.col];
    collection.findById(req.params.id, (err, data) => {
        if(err) return res.status(500).send('could not find document');
        res.send(data);
    })
})

router.post('/collection/:col/document/:id', (req: Request, res: Response)=> {
    const collection = Models[req.params.col];
    collection.create(req.params.id, (err, data) => {
        if(err) return res.status(500).send('could not create document');
        res.send(data);
    })
})

router.put('/collection/:col/document/:id', (req: Request, res: Response)=> {
    const collection = Models[req.params.col];
    collection.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
        if(err) return res.status(500).send('could not update document');
        res.send(data);
    })
})

router.delete('/collection/:id', (req: Request, res: Response) => {
    const collection = Models[req.params.id];
    mongoose.connection.db.dropCollection(req.params.id, function(err, result) {
        if(err) {
          console.log('Error in dropping collection: ', err);
        } else {
          console.log('Collection dropped');
        }
      });
})

router.delete('/collection/:col/document/:id', (req: Request, res: Response)=> {
    const collection = Models[req.params.col];
    collection.findByIdAndDelete(req.params.id, (err, data) => {
        if(err) return res.status(500).send('could not delete document');
        res.send(data);
    })
})


router.post('/collection/:id', (req: Request, res: Response) => {
    const schema = new Schema(req.body);
    Models[req.params.id] = mongoose.model(req.params.id, schema);
    res.send('collection created');
});

