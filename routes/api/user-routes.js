const router = require('express').Router();

const { 
    createUser, 
    getAllUsers, 
    updateUser, 
    getUserById, 
    deleteUser 
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



module.exports = router;
