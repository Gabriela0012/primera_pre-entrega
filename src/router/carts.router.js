import { Router } from "express";
import cartContainer from '../container/cartContainer.js'
import productContainer from '../container/productContainer.js'


const productService = new productContainer();
const cartService = new cartContainer();
const router = Router();

async function validateID(req,res,next){
  try {
      req.params.cid = parseInt(req.params.cid)
  } catch (error) {
      console.log(error)
      return res.status(400).send({status:'error', error:'Invalid id'})
  }
  req.params.cart = await cartService.getById(req.params.cid)
  if(req.params.cart == null) return res.status(404).send({status:'error', error:'Cart not found'})
  next()
}
async function validateIDP(req,res,next){
  try {
      req.params.pid = parseInt(req.params.pid)
  } catch (error) {
      console.log(error)
      return res.status(400).send({status:'error', error:'Invalid id'})
  }
  req.params.product = await productService.getById(req.params.pid)
  if(req.params.product == null) return res.status(404).send({status:'error', error:'product not found'})
  next()
}


//crear un carrito y devuelve su id,el carrito tiene que estar vacio
router.post('/',async(req, res)=>{
  let cart = req.body
  console.log(cart)
  let newArray = await cartService.newCart(cart);
  res.send({status:'success', message: 'Cart successfully'});
})

//elimina el carrito
router.delete('/:cid',validateID, async (req,res)=>{
  await cartService.deleteByIdCart(req.params.cid)
  res.send(`Cart with id: ${req.params.cid} removed from carts`)
})


//mostrar todos los carritos
router.get('/',async(req, res)=>{
  let cartProducts = await cartService.getAllCarts();
  res.json(cartProducts);
})

//mostrar un carrito en especifico
router.get('/:cid',async(req, res)=>{
  try {

    let cart = await cartService.getById(parseInt(req.params.cid))
    if(cart === null) return res.status(404).send({status:'error', error:'Product not found'})
    res.send({cart})
    
} catch (error) {
    console.log('Router get products '+error)
    return res.status(400).send({status:'error', error:'Bad request'})
}
})

// agregar productos por Id
router.post('/:cid/products', async (req,res)=>{
  const {id, quantity} = req.body
  if(!id||!quantity){
      return res.status(300).send({status:'error', error:"blank spaces are NOT allowed"})
  }else{
      let cart = await cartService.getById(parseInt(req.params.cid))
      if(cart === null){
          return res.status(404).send({status:'error', error:"cart doesn't exist"})
      }else{
          try {
              await cartService.addProductCart(parseInt(req.params.cid), parseInt(id), parseInt(quantity))
              res.send({status:'success',message:'successfully saved into the cart'})
          } catch (error) {
              return res.status(500).send({status:'error', error:"it couldn't upload the product into the cart"})
          }
      }
  }
})

// eliminar productos del carrito 
router.delete('/:cid/products/:pid', async (req,res)=>{
  let cart = await cartService.getById(parseInt(req.params.cid))
  let product = await productService.getById(parseInt(req.params.pid))
  if(cart==null){
      return res.status(404).send({status:'error', error:"cart doesn't exist"})
  }else if(product == null){
      return res.status(404).send({status:'error', error:"product doesn't exist"})
  }else{
      try {
          await cartService.deleteProductCart(parseInt(req.params.cid),parseInt(req.params.pid))
          res.send({status:'success',message:'successfully deleted from cart'})
      } catch (error) {
          return res.status(500).send({status:'error', error:"it couldn't delete the product from the cart"})
      }
  }
})



export default router;