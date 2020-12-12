const { User } = require('../models');

const userController = {
    createUser({ body }, res) {
        User.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
            })
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts'
            })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'There is no user with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.id })
            .then(dbUser => {
                if (!dbUser) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = userController;