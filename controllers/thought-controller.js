const { Thought, User } = require('../models');

const thoughtController = {
    
    // add thought to User
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.json(err));
    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true }
        )
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete reaction from thought
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err));
    },

    // remove thought from user
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No Thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId }},
                    { new: true}
                );
            })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;