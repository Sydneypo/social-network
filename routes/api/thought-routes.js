const router = require('express').Router();

const {
    addThought,
    getAllThoughts,
    getThoughtsById,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// api/thoughts/:thoughtId
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThought)
    .delete(removeThought);


// api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction);


module.exports = router;
