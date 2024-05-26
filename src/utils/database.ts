import mongoose, {Schema} from 'mongoose';
import validateDb from './validateDB'
import {upload, delete, retrieve} from './fileManager'

const collection = {};
let databaseInstance = {};

const update = () => {
    
}

const destroy = ()=> {

}

const database = (db: string) => {

    const validatedDb = validateDb(db);
    //create model from config
    if(validatedDb.isSuccessful){

        (async () => {

            try {
                //connect to database
                const mongo = await mongoose.connect();  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
                for(const key in validatedDb.parsedDb){

                    const schema = new mongo.Schema(validatedDb.parsedDb[key]);
                    //add methods to schema;
                    collection[key] = mongo.model(key, schema);
                    
                }


            } catch (error) {
                throw new Error(error);
            }    
        })();

    }else{
        throw new Error(validatedDb.error)
    }

    //add support for saving files(videos, images, mp3) to the database
    //use the upload, delete, retrieve function to manage files in the db 
    //update to update the databaseScheme
    //instantiate database
    //database contains update function.
    databaseInstance = {update, destroy, delete, upload, retrieve, ...collection}
    return databaseInstance;
}

export default database