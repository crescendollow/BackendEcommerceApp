const { ExplainVerbosity } = require("mongodb");
const { productServices, cartsServices } = require("../service/index");

const {mapProductCart,calculateQuantityTotal, calculateCartTotal } = require ('../utils/calculosCarts')

  const createCarts = async (req,res)=>{
  try {
    const {products = []} = req.body
    
    let {productCartList, productsNotFound} = await mapProductCart(products)
    const cart = {
      priceTotal: calculateCartTotal(productCartList),
      quantityTotal: calculateQuantityTotal(productCartList),
      products:productCartList,
    }
    await cartsServices.createCart (cart)
    
    return res.json({
      msg:"Carrito Creado",
      playload: {cart, productsNotFound},
    })
    
  } catch (error) {
    return res.status(500).json({
      msg:"Error",
      playload: error.message,
    })     
  }
}

const bdgetCartId = async (req, res) => {
  try {
         const {cid} = req.params
          const cart = await cartsServices.getCartsId(cid);
      if(cart){
        return res.json({
          msg:"Carrito Encontrado",
          playload: cart,
        })

      }
      
    } catch (error) {
      return res.status(500).json({
        msg:"error",
        playload:error.message,
       })
    }
    

}

const  emptyToCart = async(req, res)=>{
  try {
    const {cid} = req.params;        
    const Cart = await cartsServices.getCartsId(cid);
     Cart.products = [];
     Cart.quantityTotal = 0
    Cart.priceTotal = 0
    await cartsServices.updateToCart(cid,Cart)
    return res.json({
       msg:"Carrito Vacio",
     })
  
  } catch (error) {
    return res.status(500).json({
      msg:"error",
      playload:error.message,
     })
  }

}

const deleteProductToCart = async (req, res)=>{
   try {
     const { cid, pid } = req.params;        
     const Cart = await cartsServices.getCartsId(cid);
     if(!Cart){
        return res.status(400).json({
          msg:"Carrito no encontrado",
          ok:false,
        }) 
     }
    
     const product = await productServices.getProductId(pid);
     if(!product){
      return res.status(400).json({
        msg:"Producto no encontrado en Base de Dato",
        ok:false,
      }) 
      }
     
      
     const findProductTocart = Cart.products.some(({product})=> product._id == pid) 
    
     if(!findProductTocart){
         return res.status(400).json({
         msg:"Producto no existe en el carrito",
         ok:false,
       })  
      }
        Cart.products = Cart.products.filter(({product})=> product._id != pid)
        Cart.quantityTotal = calculateQuantityTotal(productCartList)
        Cart.priceTotal = calculateCartTotal(Cart.products)
         await cartsServices.updateToCart(cid,Cart)
          return res.status(201).json({
            msg:"Producto Eliminado",
            Cart: Cart
          })  
       
   } catch (error) {
        return res.status(500).json({
         msg:"error",
         playload:error.message,
        })
   }
}  


const updateToQuantityProduct = async(req,res)=> {
try {
  const { cid, pid,} = req.params;
  const {quantity = 0} = req.body;
  
  const Cart = await cartsServices.getCartsId (cid);
    if (!Cart){
     return res.status(400).json({
       msg:"Carrito no encontrado",
       ok:false,
      })  
  }
  const product = await productServices.getProductId(pid);
  if (!product){
    return res.status(400).json({
      msg:"Producto no encontrado en base de Datos",
      ok:false,
     })  
 }
   const findProductTocart = Cart.products.findIndex(({product})=> product._id == pid)
  
  if (findProductTocart === -1){
    return res.status(400).json({
      msg:"Producto no encontrado en el Carrito",
      ok:false,
     })  
    }
    Cart.products[findProductTocart].quantity += quantity 
    Cart.priceTotal = calculateCartTotal(Cart.products)
    await cartsServices.updateToCart(cid,Cart)
    return res.status(201).json({
    msg:"Cantidad Actualizada",
    Cart: Cart
  })  
  
  
} catch (error) {
  return res.status(500).json({
    msg:"error",
    playload:error.message,
   })
}

}


const updateToProductsToCart = async(req, res)=>{

  try {
    const {cid} = req.params
    const Cart = await cartsServices.getCartsId(cid);
    if (!Cart){
      return res.status(400).json({
      msg:"Carrito Inexistente",
      ok:false,
    })  
  }
  const {products = []} = req.body
  let {productCartList, productsNotFound} = await mapProductCart(products)
 
  const upateCart = {
    priceTotal: calculateCartTotal(productCartList),
    quantityTotal: calculateQuantityTotal(productCartList),
    products:productCartList,
  }
  await cartsServices.updateToCart(cid, upateCart )

  return res.json({
    msg: "Carrito Actualizado",
    payload: { productCartList, productsNotFound },
    carts: Cart
  })

  } catch (error) {
    return res.status(500).json({
			msg: 'Error',
			payload: error.message,
		})
  }
}

const pucharse = async (req, res)=>{
  try {
    const {cid} = req.params

     const cart = await cartsServices.getCartsId(cid);
   if(!cart){
   return res.json({
     msg:"Carrito no Encontrado",
     playload: cart,
   })
   }
   const productStock = cart.products.filter(async (product) => {
       
      const productBd = await productServices.getProductId (product.product._id)
      if (console.log(productBd.stock) < console.log(product.quantity)){
        console.log("ok")
      }else{
        console.log("no")
      }
     
   })
   
 
} catch (error) {
 return res.status(500).json({
   msg:"error",
   playload:error.message,
  })
 }
}



module.exports = {
    createCarts, 
    bdgetCartId,
    deleteProductToCart,
    emptyToCart, 
    updateToQuantityProduct,
    updateToProductsToCart,
    pucharse,
}

