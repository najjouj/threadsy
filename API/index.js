const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const nodemailer = require('nodemailer');




const app = express();
const port = 3100;
const cors = require('cors');
app.use(cors());
console.log('appuse first use');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://jouta:najia@cluster0.bi08jee.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true }

).then(() => console.log('connected to mongoDB')).catch((err => console.log(err)));
app.listen(port, () => {
    console.log(' server is running on port 3100');
});
const User = require("./Models/User");
const Post = require("./Models/post");


//endpoint to register a user in the backend


app.post('/register', async (req, res) => {
    console.log('we are here');
    try {

console.log('apppost entered!!!');
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('email already registered');
          
            return res.status(400).json({ message: 'email already registered' });
        } else {
            //create a new user
            const newUser = new User({ name, email, password });

            //create and store the verificaation token

            newUser.verificationToken = crypto.randomBytes(20).toString('hex');
            //save the user to the backend

            await newUser.save();
            //send the verification email to the user

            sendVerficationEmail(newUser.email, newUser.verificationToken);
            console.log('Registration successful, please check your email for verification');
            res.status(200).json({ message: 'Registration successful, please check your email for verification' });


        }

    } catch (error) {
        console.log('error regisering a user:' + error);
        res.status(500).json({ message: 'error registering a user' });
    }
})
const sendVerficationEmail = async (email, verificationToken) => {
    //create an nodemailer transporter
     
    const transporter = nodemailer.createTransport({
      
        service: 'gmail',
        secure:false,
        auth: {
          
            email: 'najia.elouaer@gmail.com',
            pass: 'asma cinh flxe brsg'
        }
    });
    //compose the email message

    const mailOptions = {
        from: 'threadsy.com',
        to: email,
        subject: 'Email verification',
        text: 'Please click the following link to verify your email http://192.168.78.223:3100/verify/${verificationToken}'
    }
    try {

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.log('error sending verification email,' + error);
    }

}


app.get('/verify/:token', async (req, res) => {
    try {

        const token = req.params.token;
        const user = User.findOne({ verificationToken: token });
        if (!user) {
            res.status(404).json({ message: 'Invalid token' });
        }
        user.verified = true;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.log('error getting token,' + error);
        res.status(500).json({ message: 'Email verification failed' })
    }
});


app.post('/login', async (req, res) => {
    console.log('we are here login' );
   
    
    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        const user = await User.findOne({ email });
        if (!user) {
            
         return   res.status(404).json({ message: 'Invalid email' });

        }
        console.log('valid email');
        if (user.password !== password) {
            
          return  res.status(404).json({ message: 'Invalid password' });
        }
        console.log(user._id);
        
        const token =jwt.sign({userId:user._id},'JWT_SECRET');
        console.log('token:');
        console.log(token);
        
        res.status(200).json({token});

    } catch (e) {
        console.log('login failed', +e);
        res.status(500).json({ message: 'Login failed' });
    }

});



//endpoint to access all the users except the logged in the user
app.get('/users/:userId',(req,res)=>{
    try{
       
        
        const loggedInUserId=req.params.userId;
       
        User.findOne({
            _id:{$ne:loggedInUserId}
        }).then((users)=>{
           
            res.status(200).json(users);
        }).catch((error)=>{
            console.log('Error:',error);
            res.status(500).json('Error');
        })

    }catch(err){
        res.status(500).json({message:'error getting the users'});
    }
})
