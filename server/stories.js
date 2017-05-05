'use strict';

const router = require('express').Router()
    , HttpError = require('./utils/HttpError') //TODO: pull these
    , gatekeeper = require('./utils/gatekeeper')
    , db = require('APP/db')
    , Story = db.model('stories')
    , User = db.model('users');

module.exports = router;

// param middleware to set id param to 'story';
router.param('storyId', (req, res, next, storyId) => {
  Story.findById(storyId)
  .then(story => {
    if (!story) throw HttpError(404);
    req.story = story;
    next();
    return null;
  })
  .catch(next);
});
// get all stories
router.get('/', function (req, res, next) {
  Story.findAll({})
  .then(function (stories) {
    res.json(stories);
  })
  .catch(next);
});
// view one story by id; should get included scenes via eager loading (see defaultScope on model)
router.get('/:storyId', function (req, res, next) {
  req.story.reload(Story.options.scopes.populated())
  .then(function (story) {
    res.json(story);
  })
  .catch(next);
});
// create a story
router.post('/', (req, res, next) => {
  Story.create({
    title: req.body.title,
    // scenes: [{paragraphs: [req.body.textBody]}]
  }, {
    // include: [{
    //   model: db.model('scenes'), as: 'scenes'
    // }]
  })
  .then(story => {
    res.status(201).json(story);
  })
  .catch(next);
});
// edit a story
router.put('/:id', function (req, res, next) {
  if (!req.user.isAdmin) delete req.body.author_id;
  req.story.update(req.body)
  .then(function (story) {
    return story.reload(Story.options.scopes.populated());
  })
  .then(function (storyIncludingAuthor) {
    res.json(storyIncludingAuthor);
  })
  .catch(next);
});
// delete a story
router.delete('/:id', function (req, res, next) {
  req.story.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

router.use('/:storyId/scenes', (req, res, next) => {
  req.foundStory = req.story;
  next()
}, require('./scenes'))
