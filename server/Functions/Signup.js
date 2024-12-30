import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import Person from "../Models/Person.js";

export async function Signup(req,res)
{   
    
    try
    {
        const{//Extracts user input (first name, last name, email, password, and picture path) from the request.
            firstName,
            lastName,
            email,
            password,
            picturePath,
        }=req.body;

        const salt=await bcrypt.genSalt();//bcrypt.genSalt() generates a salt, which is a random string of characters added to the password before it’s hashed.  and genSalt is asynchronous so we use await
        const hashPassword=await bcrypt.hash(password,salt);//bcrypt.hash(password, salt) combines the plain password (from req.body) with the generated salt and hashes them together.

        const newPerson=new Person({
            firstName,
            lastName,
            email,
            password:hashPassword,//Creates a new instance of Person in moongoDB with the hashed password.
            picturePath
        });

        const savePerson=await newPerson.save();//newPerson.save(): Saves the user to the database.
        res.status(201).json(savePerson);//Responds with a 201 status and returns the saved user data in JSON format.

    }
    catch(err)
    {
        res.status(500).json(err.message);
    }
}


export const login=async(req,res)=>{

   
    try
    {   
        const {email,password}=req.body;//Retrieves the email and password provided by the user.

        const person=await Person.findOne({email:email});
      

        if(!person)
        {
           return res.status(500).send({message:"User Not Found"});
        }

        const passwordMatch=await bcrypt.compare(password,person.password);//Uses bcrypt.compare() to check if the provided password matches the stored hashed password.

        if(!passwordMatch)
        {
            return res.status(400).json({ msg: "Invalid credentials. " });
        }

        const objectToSerialize = { id: person._id };//We create an object called objectToSerialize that includes the user’s unique identifier (id).
//we create a JWT (JSON Web Token) for the user after a successful login. 
//This token will allow the user to stay authenticated without needing to log in repeatedly.
        const accessToken = jwt.sign(
            objectToSerialize,//payload
            process.env.JWT_TOKEN_SECRET//signature  A secret key (JWT_TOKEN_SECRET) that ensures the token’s integrity.
        );
        //The token (accessToken) is then sent back to the user, 
        //allowing them to authenticate themselves in future requests without re-entering credentials.
//Each time the user makes a request that requires authentication, they can send this token, and the server will verify 
//it using the same secret key.

        delete person.password;//Deletes the password field from the person object (for security) before sending it.
        res.status(200).send({person:person,token:accessToken})
            

    }
    catch(err)
    {
        res.send({error_message:err.message})
    }
   
}