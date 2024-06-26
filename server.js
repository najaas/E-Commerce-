const express=require('express')
const app=express()
const path=require('path')
const port=9889
const databaseconnection=require('./config/db')
const session=require('express-session');


databaseconnection().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on ${port}`)
    })
})

const loginrouter=require('./Router/loginsignup')
const signuprouter=require('./Router/loginsignup')
const adminrouter=require('./Router/adminrouter')
const userrouter=require('./Router/userrouter')


app.use(session({
    secret:'helloGFIOHKJHJKEhkjh',
    resave:false,
    saveUninitialized:false,
}) )

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.set('views',path.join(__dirname,"view"))
app.set('view engine','ejs')


app.use('/',loginrouter)
app.use('/signup',signuprouter)
app.use('/admin',adminrouter)
app.use('/',userrouter)
