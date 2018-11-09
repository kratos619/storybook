const express = require('express');
const router = express.Router();
//const Story = require('../models/Story');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
const {
    ensureAuthenticated,
    ensureGuesst
} = require('../helpers/auth');

//stories index
router.get('/', (req, res) => {
    Story.find({
            status: 'public'
        }).populate('user')
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            });
        })

});

// stories add
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('stories/add');
});

// process to post stories 
router.post('/', ensureAuthenticated, (req, res) => {
    let allowComments;

    if (req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }
    //  console.log(req.body);
    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }
    // create story

    new Story(newStory)
        .save()
        .then(story => {
            res.redirect(`/stories/show/${story.id}`);
        });
})

// stories Edit
router.get('/edit', ensureAuthenticated, (req, res) => {
    res.render('stories/edit');
});

// stories Edit
// router.get('/', (req, res) => {
//     res.render('stories/edit');
// });

module.exports = router;