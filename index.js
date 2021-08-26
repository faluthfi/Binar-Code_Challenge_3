const express=require('express');
const app=express();

const users=[
    {
        "email":"default@123.com",
        "password":"default"
    }
];

const port=3000

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/media', express.static(__dirname + '/media'));

function postRegister(req,res){
    users.push({
        email:req.body.email,
        password:req.body.password
    });
    res.redirect('/');
}
function getUser(req,res){
    res.json({
        jumlahUser:users.length,
        data:users
    });
}


function userCheck(req,res){
    let emailInput=users.find(email=>email.email===req.body.email);
    if (emailInput!=null){
        if(emailInput[`password`]==req.body.password){
            res.send(`Success Login as ${emailInput["email"]}`)
        }else{
            res.status(400).send(`wrong password`)
        }
    }else{
        res.status(400).send(`cannot find user `+ req.body.email);
    }
}


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});

app.get('/game',(req,res)=>{
    res.sendFile(__dirname+'/game/index.html')
});

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/register/index.html')
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/login/index.html')
});

app.post('/login',userCheck);

app.get('/users',getUser);

app.post('/register',postRegister);

app.listen(port,(req,res)=>{
    console.log(`Server Running on port ${port}`)
});
