const router = require('express').Router();

const { 
    createUser, 
    getAllUsers, 
    updateUser, 
    getUserById, 
    deleteUser ,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// found at api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


// found at api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// found at api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;
