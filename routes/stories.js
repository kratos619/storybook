const express = require('express');
const router = express.Router();

const {
    ensureAuthenticated,
    ensureGuesst
} = require('../helpers/auth');

//stories index
router.get('/', (req, res) => {
    res.render('stories/index');
});

// stories add
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});

// stories Edit
router.get('/edit', ensureAuthenticated, (req, res) => {
    res.render('stories/edit');
});

// stories Edit
// router.get('/', (req, res) => {
//     res.render('stories/edit');
// });

module.exports = router;