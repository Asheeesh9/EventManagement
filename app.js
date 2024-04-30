const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const talkRoutes = require('./routes/talkRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// view engine
app.set('view engine', 'ejs');

// database connection  mongodb+srv://iit2023255:<password>@cluster0.a95culf.mongodb.net/
const dbURI = 'mongodb+srv://iit2023260:n4Q2nm2gtodf1mih@cluster0.gjhwosx.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));


app.get('/index', requireAuth, (req, res) => res.render('index'));
app.get('/index2', requireAuth, (req, res) => res.render('index2'));
// app.get('/blogs', (req, res) => {
//   res.redirect('/blogs');
// });


//app.get('/navbar', requireAuth, (req, res) => res.render('navbar'));
app.get('/theme', requireAuth, (req, res) => res.render('theme'));
app.get('/blg2', requireAuth, (req, res) => res.render('blg2'));
// app.get('/letTalk', requireAuth, (req, res) => res.render('letTalk'));
app.get('/services', requireAuth, (req, res) => res.render('services'));
app.get('/ritual', requireAuth, (req, res) => res.render('ritual'));
app.use(authRoutes);
app.use('/blogs', blogRoutes);
app.use('/talk', talkRoutes);
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});