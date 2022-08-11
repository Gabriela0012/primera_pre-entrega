import { Router } from "express";
import productContainer from '../container/productContainer.js'


const productService = new productContainer();
const router = Router();
const admin = true;

async function validateID(req,res,next){
  try {
      req.params.pid = parseInt(req.params.pid)
  } catch (error) {
      console.log(error)
      return res.status(400).send({status:'error', error:'Invalid id'})
  }
  req.params.product = await productService.getById(req.params.pid)
  if(req.params.product == null) return res.status(404).send({status:'error', error:'Product not found'})
  next()
}


router.get('/',async(req, res)=>{
  let products = await productService.getAllProducts();
  res.json(products);
})

// para ver los productos por id en la url agregue "api/products/'y el numero que desee'
router.get('/:pid',async(req, res)=>{
  try {

    let product = await productService.getById(parseInt(req.params.pid))
    if(product === null) return res.status(404).send({status:'error', error:'Product not found'})
    res.send({product})
    
} catch (error) {
    console.log('Router get products '+error)
    return res.status(400).send({status:'error', error:'Bad request'})
}
})

router.post('/',async(req, res)=>{
  if(admin===false){
    return res.status(404).send({status:'error', description: 'ruta/api/products/ no autorizada'})

  }
  else{
    let product = req.body
  console.log(product)
  let newArray = await productService.saveProduct(product);
  res.json(newArray);

  }
 
})

router.put('/:pid',validateID, async (req,res)=>{
  if(admin===false){
    return res.status(404).send({status:'error', description: 'ruta/api/products/ no autorizada'})

  }else{
  await productService.updateProduct(req.params.pid, parseFloat(req.body.price),req.body.name)
  res.send(`producto con id: ${req.params.pid} actualizado`)}
})

router.delete('/:pid',validateID, async (req,res)=>{
  if(admin===false){
    return res.status(404).send({status:'error', description: 'ruta/api/products/ no autorizada'})

  }
  else{
  await productService.deleteById(req.params.pid)
  res.send(`Producto con id: ${req.params.pid} eliminado de productos`)}
})




export default router;