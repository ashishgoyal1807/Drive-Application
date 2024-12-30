import File from "../Models/File.js";
import Person from "../Models/Person.js";
import {
  S3Client,//This is the main class that lets you connect to Amazon S3.
  GetObjectCommand,//This is a specific command that retrieves (downloads) a file from an S3 bucket.
  DeleteObjectCommand//This command deletes a file from an S3 bucket.
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";//This function generates a temporary
// , pre-signed URL for a file in your S3 bucket .tempo URL to access somethin(File)




export const getFile = async (req, res) => {

  const bucketName = process.env.BUCKET_NAME;  //Name if the clloud storage bucket
  const bucketRegion = process.env.BUCKET_REGION;// Location where the storage bucket is hosted
  const access_key = process.env.ACCESS_KEY;// access key used for authentication , its like username
  const secret_access_key = process.env.SECRET_ACCESS_KEY;//its like password

  const {userId}=req.params;

  const user=await Person.findById(userId);


  const s3 = new S3Client({  //This client allows your application to interact with S3, enabling actions 
  // like uploading, downloading, and deleting files.
    credentials: {
      accessKeyId: access_key,
      secretAccessKey: secret_access_key,//accessKeyId and secretAccessKey are your login credentials for AWS.
    },
    region: bucketRegion,//AWS has servers all around the world, so you must tell it which region to connect to.

  });

  try {
    // const files = await File.find({});

    const userFilesIds = user.userfilesId;//user ki Files ki Id ka array hai

    const files = await File.find({ _id: { $in: userFilesIds } });// files ki details  ka array hai 

    const filesWithUrls = await Promise.all(files.map(async (file) => { //file ka name de rahe hai
    //  and s3 files ka url de raha hai
        const getObjectParams = {// temp url
          Bucket: bucketName, //Kon konsi file chahiy-e
          Key: file.fileName,
        };
          const command = new GetObjectCommand(getObjectParams);//files ko retrive(mangna) kara hai .
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });// Har file ko temp url di hai
        //  through which we can retrive it from Bucket AWS s3
  
        // Create a new object with the additional fileurl property
        return {
          ...file.toObject(), // Convert Mongoose document to plain JavaScript object
          fileurl: url,
        };
      }));
    
    res.status(201).json(filesWithUrls);
  } catch (err) {
    console.log({ error_message: err.message });
  }
};


export const deleteFile=async(req,res)=>{

    const bucketName = process.env.BUCKET_NAME;
    const bucketRegion = process.env.BUCKET_REGION;
    const access_key = process.env.ACCESS_KEY;
    const secret_access_key = process.env.SECRET_ACCESS_KEY;
  
    const s3 = new S3Client({
      credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_access_key,
      },
      region: bucketRegion,
    });
    
    try
    {
        const id = req.params.id;
        const userId=req.params.userId;
        const file=await File.findById(id);//files ki details mil gai

        if(!file)
        {
            res.status(404).send("File Not Found");
            return;
        }

        if(file.fileOwnerId!=userId)
        {
          return res.status(401).send('YOU CANNOT DELETE A FILE YOU DONT OWN')
        }

        const sharedWithIds = file.sharedWithIds || [];//The variable sharedWithIds contains the IDs of people
        //  with whom the file has been shared. If the file has not been shared, it defaults to an empty array.

        const personsToUpdate = await Person.find({ _id: { $in: sharedWithIds } });
       
        for (const person of personsToUpdate) {// Remove the File from Shared Users

  
          const updatedSharedFilesIds = person.sharedFilesIds.filter(fileId => fileId != id);
          
        
          // Update the Person document
          await Person.findByIdAndUpdate(person._id, {
            $set: { sharedFilesIds: updatedSharedFilesIds },
          });
        }

        await Person.findByIdAndUpdate(file.fileOwnerId, {//Remove the File from the Owner's Files
          $pull: { userfilesId: id },
        });

        

        const params={
            Bucket:bucketName,//jonsi file delete karni hai uska format ready kar rahe hai
            Key:file.fileName
        }

        
        const command = new DeleteObjectCommand(params)
        await s3.send(command);
        await File.deleteOne({_id:id});
        res.status(200).json({ message: 'File deleted successfully' });
    }
    catch(err)
    {
        console.log({message:err.message})
    }

}


