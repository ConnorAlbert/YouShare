const  {Router} = require('express');

const router = Router();

router.get('/google', (req, res) => res.send(200));

module.exports = router;