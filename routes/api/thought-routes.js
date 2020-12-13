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
router.route('/').get(getAllThoughts);

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtsById).put(updateThought).delete(removeThought);

// api/thoughts/:userId
router.route('/:userId').post(addThought);

// api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId').delete(removeThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;
