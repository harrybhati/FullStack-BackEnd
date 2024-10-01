const express=require('express');
 require('./Config');
const bcrypt=require('bcrypt');
// const crypto=require('crypto');
const Salt=12;
const cors=require('cors');
const app=express();
const PORT=4500;
const User=require('./UserSchema');
// const jwt=require('jsonwebtoken');
// const cookieParser=require('cookie-parser')

app.use(express.json());
app.use(cors( {
    origin: 'http://localhost:3000', // Specify your frontend URL
    credentials: true, // Allow credentials
}));
// app.use(cookieParser()); 

const Company=require('./CompanySchema');

// const SecurityKey= crypto.randomBytes(32).toString('hex');
const allowedRoles = ['IT_ADMIN', 'IT_USER_NORMAL'];

// register Api
app.post('/register',async(req,resp)=>{
const {name,password,email,role,username,mobile}=req.body;
if (!allowedRoles.includes(role)) {
    return resp.status(400).json({ message: 'Invalid role' });
}
try{
    const ExistUser= await User.findOne({ $or: [{ username }, { email }, { mobile }] });
if(ExistUser){
    return resp.status(409).json({message:"User with this username, email, or mobile already exists"})
}
const HashPass= await bcrypt.hash(password,Salt);
const newUser= new User({name,email,password:HashPass,role,username,mobile});

const Addnew= await newUser.save();
let redirectUrl = '';
if (Addnew.role === 'IT_ADMIN') {
    redirectUrl = '/list';  
} else {
    redirectUrl = '/userCompany';  
}

return resp.status(201).json({message:"Register",Addnew,role:Addnew.role,redirectUrl});
}
catch(err){
    console.log(err);
    return resp.status(500).json({message:"Internal Server Error"})
}})

// login api 

app.post('/login',async(req,resp)=>{
    const {username,password}=req.body;
    try{
        const UserExist=await User.findOne({username});
        if(!UserExist){
            return resp.status(401).json({message:"Invaid email"})
        }


            const PasswordEncrypt= await bcrypt.compare(password,UserExist.password);
            if(!PasswordEncrypt){
                return resp.status(401).json({message:"Invaid Password"})
            }
                
                return resp.status(200).json({ message: "Login Successful" , role: UserExist.role,username:UserExist.username});
            }catch(error){
        return resp.status(500).json({message:"Internal Server Error"})
    }
})


app.post('/user/company', async (req, res) => {
    const { username, role, companyName, companyAddress } = req.body;

    try {
        const newCompany = new Company({
            username,
            role,
            companyName,
            companyAddress
        });
        const companySave= await newCompany.save();
        res.status(200).json({ message: 'Company created successfully!',companySave });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ message: 'Failed to create company. Please try again later.' });
    }
});


app.get('/companies', async (req, res) => {
    try {
        const { username } = req.query; // Extracting username from query
        if (!username) {
            return res.status(400).json({ message: 'Username is required.' });
        }
        const companies = await Company.find({ username }); // Fetch companies created by this user
        if (!companies || companies.length === 0) {
            return res.status(404).json({ message: 'No companies found for this user.' });
        }
        return res.status(200).json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
});


app.get('/companylist', async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});








app.listen(PORT,()=>{console.log(`Running on port :${PORT}`)})
