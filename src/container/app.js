import express from 'express';
import productContainer from './productContainer.js'



const app = express();
const PORT = 8080;
const productService = new productContainer();


const server = app.listen(PORT,()=>{
  console.log(`listening port ${PORT}`);
});

app.get('/',(req, res)=>{
  res.send("hola Bienvenido")
})
// para ver la lista de productos en la url agregue "/products"
app.get('/products',async(req, res)=>{
  let products = await productService.getAllProducts();
  res.json(products);
})
// para ver los productos por id en la url agregue "/products/Random?role='y el numero que desee'
app.get('/products/Random',async(req, res)=>{
  let role = req.query.role; 
  if(role >3){
    return res.send('Porfavor enviar un numero menor o igual que 3')
  } 
  else {// el producto encontrado se muestra por consola
    let id = await productService.getById(role);
    res.json(id);
  }
})