const apiRoutes = require('./api');
const router = require('./api/user-routes');

router.use('/api', apiRoutes);


module.exports = router;