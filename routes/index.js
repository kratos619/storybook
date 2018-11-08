const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureGuesst } = require('../helpers/auth');

router.get('/', ensureGuesst, (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('index/dashboard');
});

router.get('/about', (req, res) => {
  res.render('index/about');
});
module.exports = router;
