const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const Todouser=require('./todouser')
const jwt=require('jsonwebtoken')
const Todomodel=require('./todomodel')
const middleware=require('./middleware') 
require('dotenv').config()

const app=express()
const PORT=process.env.port || 5000

mongoose.connect(process.env.MONGODB_URL).then(()=>console.log(`Connected to DB....`)).catch((err)=>console.log(err))

app.use(express.json())
app.use(cors({origin:'*'}));

app.get('/', (req, res)=>{
    return res.send('<h1>Hello, world !! This is a todo list app</h1>')
})

app.post('/register',async (req,res)=>{
  try{
    const {fullname,email,password,confirmpassword}=req.body;
    const exist=await Todouser.findOne({email})
    if(exist){
        return res.status(400).send('User Already Registered')
      }
      if(password!==confirmpassword){
        return res.status(403).send('Password Invalid');
      }
      let newUser=new Todouser({
        fullname,email,password,confirmpassword
      })
      newUser.save();
      return res.status(200).send('User registered successfully')

  } catch(err){
    console.log(err)
    return res.status(500).send('Server Error')
  }   
})


app.post('/login',async (req,res)=>{   
    try{
      const {email,password}=req.body;
      let exist=await Todouser.findOne({email});
      if(!exist){
        return res.status(400).send('User not found')
      }
      if(exist.password!=password){
        return res.status(400).send("Invalid password")
      }
      //creating a schema for token
      let payload={
       user:{
        id:exist.id
       }
      }
      jwt.sign(payload,'jwtPassword',{expiresIn:3600000},
        (err,token)=>{
            if(err) throw err;
            return res.json({token})
        })
    }catch(err){
        console.log(err)
        return res.status(500).send('Server Error')
    }
})

app.get('/mytodo',middleware,async (req,res)=>{
  try{
    let user = await Todouser.findById(req.user.id);
    return res.json(user);
}
catch(err){
  console.log(err);
  return res.status(500).send('Server Error')
}  
})

app.post('/addtodo', async (req, res) => {
  try {
    const { email, task } = req.body;
    let newTask = new Todomodel({
      email,
      task
    });
    await newTask.save(); // Wait for the task to be saved to the database
    return res.status(200).send('Todo added successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error');
  }
});


//Deleting an todo with id
app.delete('/delete/:id',async(req,res)=>{
    try{
        await Todomodel.findByIdAndDelete(req.params.id);
        return res.status(200).send(true)
    }
    catch(err){
        console.log(err)
        return res.status(500).send('Server Error') 
    }
});


app.get("/getalltodos", async (req, res) => {
  try {
    const { email } = req.query;

    // Retrieve all todos based on the provided email
    const tasks = await Todomodel.find({ email });

    return res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});


app.listen(PORT,()=> console.log(`Listening on: ${PORT}`))

