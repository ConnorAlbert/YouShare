const  {Router} = require('express');
const passport = require('passport');


const router = Router();

router.get('/google', passport.authenticate('google'),(req,res)=>
res.send(200));

router.get('/google/redirect', passport.authenticate('google'),(req,res)=>
res.redirect('http://localhost:3000/home'));


module.exports = router;