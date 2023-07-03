const {Router} = require('express');
const { createCarts, bdgetCartId, deleteProductToCart, emptyToCart, updateToQuantityProduct, updateToProductsToCart, pucharse } = require('../controller/carts.controller.bd');
const { userPermission } = require('../utils/middleware/isUser');
const passportCustom = require('../utils/passportCall');
const { JWT_STRATEGY } = require('../config/config');

const router =  Router();

router.post('/', passportCustom(JWT_STRATEGY),userPermission,createCarts)
router.get('/:cid', bdgetCartId)
router.delete('/:cid/product/:pid', deleteProductToCart);
router.delete('/:cid', emptyToCart);
router.put('/:cid/product/:pid', updateToQuantityProduct);
router.put('/:cid', updateToProductsToCart);
router.post('/:cid/purchase', pucharse);

module.exports = router;