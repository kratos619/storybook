const express = require('express');
const router = express.Router();

//stories index
router.get('/', (req, res) => {
    res.render('stories/index');
});

// stories add
router.get('/add', (req, res) => {
    res.render('stories/add');
});

// stories Edit
router.get('/edit', (req, res) => {
    res.render('stories/edit');
});

// stories Edit
router.get('/edit', (req, res) => {
    res.render('stories/edit');
});

module.exports = router;