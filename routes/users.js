const express = require('express');
const multer = require('multer');
const router = express.Router();
const db = require("../data/database")
const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})
const upload = multer({ storage: storageConfig });
router.get('/', async function (req, res) {
  const users = await db.getDb().collection('users').find().toArray();
  res.render('profiles', { users: users });
});

router.get('/new-user', function (req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), function (req, res) {
  const imguplode = req.file;
  const username = req.body;
  db.getDb().collection('users').insertOne({
    name: username.username,
    imagePath: imguplode.path
  })
  res.redirect('/')
})

module.exports = router;