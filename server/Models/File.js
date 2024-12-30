import mongoose from "mongoose";
import Person from "./Person.js";

const FileSchema=mongoose.Schema(
    {
        fileName:String,
        fileType:String,
        fileOwner:String,
        fileOwnerId:String,
        fileOwnerEmail:String,
        fileSize:Number,
        sharedWithIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person', // Assuming you have a person model defined
        }],
    }
)

const File=mongoose.model("File",FileSchema);//This creates a Mongoose model called Person based on the schema PersonSchema. 
export default File;