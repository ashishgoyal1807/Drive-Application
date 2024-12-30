import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";//Multer is a Node.js middleware used for handling file uploads in web applications.
import cors from "cors";//By default, browsers block requests coming from a different origin than the server's origin. cors helps bypass this restriction by enabling specific or all origins to access your server.
import path from "path";
import { fileURLToPath } from "url";//helps convert a file URL to a file path
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import File from "./Models/File.js";
import { getFile, deleteFile } from "./Functions/Getfile.js";
import { Signup, login } from "./Functions/Signup.js";
import { verifytoken } from "./authentication/auth.js";
import Person from "./Models/Person.js";
import { shareFile, getSharedFiles, sharedWithInfo } from "./Functions/ShareFile.js";
import { fileTypeFromBuffer } from 'file-type';


const __filename = fileURLToPath(import.meta.url);//__filename store full path to the current file including its name
const __dirname = path.dirname(__filename);//function to get the directory path of the current file by removing the file name from __filename.

const app = express();//it's like setting up a server that will handle requests and send responses.
app.use(cors()); 
dotenv.config();
app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //This line tells Express to serve files from the public/assets folder whenever a request is made to /assets.
console.log("Static files served from:", path.join(__dirname, "public/assets"));

const storage = multer.memoryStorage()//storage: Sets up memory storage for uploaded files. This means that files will be temporarily stored in the server's RAM (memory) rather than saved to a file.
const upload = multer({ storage: storage })//upload: Creates a Multer instance using the storage setting. When you use upload in a route, it will handle file uploads and keep them in memory.


const storage2 = multer.diskStorage({  // Sets up disk storage, which saves uploaded files directly to a specified folder on the server.
  destination: function (req, file, cb) {
    return cb(null, "public/assets");//null tells there is no error
  },

  filename: function (req, file, cb) {//This function specifies what to name each file once it’s saved.
    return cb(null, file.originalname);
    //return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload2 = multer({ storage: storage2 });



app.get('/getfile/:userId', verifytoken, getFile);
app.get('/getsharedfile/:userId', verifytoken, getSharedFiles);
app.get('/getsharedwith/:fileId', verifytoken, sharedWithInfo);
app.post('/auth/login', login)
app.post('/auth/register', upload2.single('picture'), Signup)
app.delete('/deletefile/:id/:userId', verifytoken, deleteFile);
app.post('/sharefile', verifytoken, shareFile)









const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const access_key = process.env.ACCESS_KEY;
const secret_access_key = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_access_key
  },
  region: bucketRegion
})


const random = Date.now();
app.post("/api/posts", upload.array('images', 20), verifytoken, async (req, res) => {

  try {
    const uploadedFiles = req.files;

    for (const uploadedFile of uploadedFiles) {
      const buffer = uploadedFile.buffer;
      const typeInfo = await fileTypeFromBuffer(buffer);

      const file = new File({
        fileName: `${uploadedFile.originalname.split('.')[0]}_${random}.${uploadedFile.originalname.split('.')[1]}`,
        fileType: typeInfo?.ext || 'n/a',
        fileOwner: req.body.username,
        fileOwnerId: req.body.id,
        fileOwnerEmail: req.body.email,
        fileSize: uploadedFile.size
      });

      const savedFile = await file.save();

      await Person.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { userfilesId: savedFile._id } },
        { new: true }
      );

      const params = {
        Bucket: bucketName,
        Key: `${uploadedFile.originalname.split('.')[0]}_${random}.${uploadedFile.originalname.split('.')[1]}`,
        Body: uploadedFile.buffer,
        ContentType: uploadedFile.mimetype
      };
      const uploadCommand = new PutObjectCommand(params);
      

      await s3.send(uploadCommand);

      console.log(`File ${uploadedFile.originalname} uploaded successfully.`);
    }

    res.send({});//sab kuch sahi hone ke baad response bhej raha hai from backend to frontend (pehle fron se backend and abbb backend se frontend)
  }
  catch (err) {
    console.log("error :" + err.message);
  }
});



const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  })
  .catch((error) => console.log(`${error} did not connect`));