const express  =  require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const expressLayouts  =  require('express-ejs-layouts');
const db = require('./config/db.js');
const app = express();
//EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
//Body-Parser
app.use(express.urlencoded({extended:false}));
//express session midleware
app.use(session({
  secret: 'does not matter',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }//he remove
}));

// connect flash
app.use(flash());

//Global Variables
app.use((req,res,next)=>{
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next();
})
// Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server is running at port: ${PORT}`));