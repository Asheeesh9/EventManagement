const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const talkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const talk = mongoose.model('talk', talkSchema);
module.exports = talk;