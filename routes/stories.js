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

// show by id
router.get('/show/:id', (req, res) => {
    Story.findOne({
            _id: req.params.id
        }).populate('user')
        .then(story => {
            res.render('stories/show', {
                story: story
            });
        });
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
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Story.findOne({
            _id: req.params.id
        })
        .populate('user')
        .then(story => {
            res.render('stories/edit', {
                story: story
            });
        });
});

// update form process
router.put('/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    }).then(story => {
        let allowComments;

        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }

        // new Values 
        story.title = req.body.title;
        story.status = req.body.status;
        story.allowComments = allowComments;
        story.body = req.body.body;

        story.save().then(story => {
            res.redirect('/dashboard');
        })
    })
})

module.exports = router;