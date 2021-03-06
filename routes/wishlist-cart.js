const { Router } = require("express");
const router = Router();
const Cart= require('../allCarts/wishlistCart')
const middleware = require('./middleware');

//get wishlist cart befroe creating wishlist
router.get("/", middleware.isLoggedIn,async(req,res,next) => {
    
    if(!req.session.wishlistcart){
        return res.render('shop/wishlist-cart', {items: null});
    }
    let cart = await new Cart(req.session.wishlistcart);
    
    res.render('shop/wishlist-cart', {items: cart.getItems()});
    
})





module.exports = router;