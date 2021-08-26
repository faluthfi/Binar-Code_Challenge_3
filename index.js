const express=require('express');
const app=express();

const users=[
    {
        "email":"default",
        "password":"default"
    }
];

const port=3000

app.use(express.urlencoded({extended:false}))
app.use(express.json())

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
            res.send(`Success Login as ${emailInput["email"]}`);
        }else{
            res.send(`wrong password`)
        }
    }else{
        res.status(400).send(`cannot find user `+ req.body.email);
    }
}


// app.get('/register',(req,res)=>{
//     res.render('register')
// });

// app.get('/login',(req,res)=>{
//     res.render('login')
// });

app.post('/login',userCheck);

app.get('/users',getUser);

app.post('/register',postRegister);

app.listen(port,(req,res)=>{
    console.log(`Server Running on port ${port}`)
});
