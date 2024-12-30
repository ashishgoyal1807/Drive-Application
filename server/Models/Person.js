import mongoose from "mongoose";//This imports the Mongoose library, which is used for modeling and interacting with MongoDB data in a structured way.
import File from './File.js'

const PersonSchema=new mongoose.Schema({//This line creates a new schema for Person, defining the structure and rules for each Person document stored in MongoDB.
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        min: 5,
      },
      picturePath: {//type: String: The path to the user's profile picture should be a string.
                         //default: If no picture path is provided, it defaults to an empty string.
        type: String,
        default: "",
      },
      userfilesId: [{//Yeah ek array jo store karta unn file ki id jinke tum owner ho
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File', // Assuming you have a File model defined
    }],
    sharedFilesIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File', // Assuming you have a File model defined
    }],

});

const Person=mongoose.model('Person',PersonSchema);
export default Person;
