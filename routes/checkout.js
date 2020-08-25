require("dotenv").config(".env");

const { Router } = require("express");
const router = Router();
const Order= require('../models/cart');

// /checking if user is loggedin 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}




router.get("/", isLoggedIn, async(req,res,next)=> {
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    let cart = await new Order(req.session.cart);
    res.render('shop/checkout', {total: cart.totalPrice});

});





  


module.exports = router;