const talk = require('../models/talk');

const talk_index = (req, res) => {
  talk.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index2', { talk: result, title: 'All talk' });
    })
    .catch(err => {
      console.log(err);
    });
}

const talk_create_get = (req, res) => {
  res.render('credentials', { title: 'Create a new talk' });
}

const talk_create_post = (req, res) => {
  const talk = new talk(req.body);
  talk.save()
    .then(result => {
      res.redirect('/talk');
    })
    .catch(err => {
      console.log(err);
    });
}



module.exports = {
  talk_index,  
  talk_create_get, 
  talk_create_post
}