const { Thought, User, Reaction } = require('../models');

const thoughtController = {
    
    // add thought to User
    addThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id }},
                    { new: true }
                )
                .then(dbUserData => {
                    if (!dbUserData) {
                        res.status(404).json({ message: 'No User found with this id!' });
                        return;
                    }
                    res.json(dbUserData);
                })
                .catch(err => res.json(err));
            })
            .catch(err => res.json(err));
    },

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // GET /api/thoughts/:id
    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({ path: 'reactions', select: '-__v' })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // PUT api/thoughts/:id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true }
        )    
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // POST /api/thoughts/:id/reactions
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // DELETE /api/thoughts/:id/reactions
    removeReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId }}},
            { new: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with thid id' });
                return;
            }
            res.json({ message: 'Successfully deleted the reaction' });
        })
        .catch(err => res.status(500).json(err));         
    },

    // DELETE /api/thoughts/:id
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No Thought with this id!' });
                }
                // delete the reference to deleted thought
                User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: params.id }}
                )
                .then(() => {
                    res.json({ message: 'Successfully deleted the thought' });
                })
                .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
    },
};

module.exports = thoughtController;