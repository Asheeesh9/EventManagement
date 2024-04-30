const express = require('express');
const talkController = require('../controllers/talkController');

const router = express.Router();

router.get('/credentials', talkController.talk_create_get);
router.get('/', talkController.talk_index);
router.post('/', talkController.talk_create_post);
// router.get('/index2:id', talkController.talk_details);
// router.delete('/index2:id', talkController.talk_delete);

module.exports = router;