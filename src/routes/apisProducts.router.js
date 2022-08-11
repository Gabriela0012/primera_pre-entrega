import {Router} from 'express';
import fs from 'fs';

const router = Router();
const products=[];
const path = "src/files/products.json"

// router.get('/',async(req, res)=>{
//   let products = await productService.getAllProducts();
//   res.send(products);


// } )

router.post('/',async (req, res)=>{
  if(fs.existsSync(path)){
    let fileData = await fs.promises.readFile(path,'utf8')
    let product = req.body.JSON.parse(fileData);
    products.push(product);
    res.send({status: 'success', message: 'Product Adding'})
  }
})

router.put('/products',(req, res)=>{

})
router.delete('/products',(req, res)=>{
  
})

router.get('/',(req, res)=>{
  
})


export default router;