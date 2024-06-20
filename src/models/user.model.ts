import { Schema } from "mongoose"
import mongoose from "mongoose";



const connectionString = process.env.MONGO_URI + "/gallery"; // Replace with your details

mongoose.connect(connectionString)
.then(() => {
  console.log('MongoDB database connected successfully!');

  // Access the Mongoose connection instance here (if needed)
  console.log('Mongoose connection:', mongoose.connection);
})
.catch(err => {
  console.error(err);
});


const user = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String
})

const User = mongoose.model('User', user)

export default User