const express  =  require('express');
const router =  express.Router();	
const bcrypt = require('bcryptjs');
//User Model
const User = require('../models/User')
//login Page
router.get('/login',(req,res)=>{
	res.render("login");
});
//Register page
router.get('/register',(req,res)=>{
	res.render("register");
});
//register handle
router.post('/register',(req,res)=>{
// console.log(req.body);
// res.send(req.body);
const{name,email,password,password2}=req.body;
let errors = [];
//check required fields
if(!name || !email || !password2 || !password){
	errors.push({msg:'Please Fill in all fields'});
}
//check  password match
if(password!==password2){
		errors.push({msg:'password is not matching.'});
}
//check password length
if(password2.length<6 && password.length<6){
		errors.push({msg:'Please enter password atleat 6 length'});
}
if(errors.length>0){
	res.render('register',{
		errors,
		name,
		email,
		password,
		password2
	});
}else{
	//res.send('all set to fly');
	User.findOne({email:email}).then(user =>{
		if(user){
			//user already exits
			errors.push({msg:'user already exits'});
				res.render('register',{
		errors,
		name,
		email,
		password,
		password2
	});
		}else{
			const newUser= new User({
				name,
				email,
				password
			});
			//hash password
			bcrypt.genSalt(10,(err,salt)=>
				bcrypt.hash(newUser.password,salt,(err,hash)=>{
					if(err) throw err;
					//set password to hashed
					newUser.password=hash;
					newUser.save().then(user => {
						req.flash('success_msg','You are now register');
						res.redirect('/users/login');
					}).catch(err=>console.log(err));
			}))

		}
	});
}
});
module.exports= router;