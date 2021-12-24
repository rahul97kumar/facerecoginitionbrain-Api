const express = require('express');

const bodyParser = require('body-parser')

const bcrypt = require('bcrypt-nodejs')

const cors  = require('cors')

const knex = require('knex')

const register = require('./controllers/register')

const signin = require('./controllers/signin')

const image = require('./controllers/image')

const profile = require('./controllers/profile')


const db = knex ({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
  }
})


const app = express(); 

app.use(express.json())
app.use(cors())


app.get('/',(req,res) => {res.send(db.users)})

app.get('/profile/:id',(req,res) => {profile.profileHandle(req,res,db)})

app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)})


app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})


app.put('/image',(req,res) => {image.imageHandle(req,res,db)})

app.post('/imageurl',(req,res) => {image.handleAPI(req,res)})

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})

/*
/res-working
/sigin-post-success-fail
/register-post-user
/image-put-user
/profile/userid--get/user
*/