import fs from 'fs';
import productContainer from './productContainer.js'
import moment from 'moment'

const productService = new productContainer();
const path = "src/files/carts.json"
const moments = moment().format('YYYY-MM-DD HH:mm:ss');


class cartContainer {

  // todos los carritos
  getAllCarts = async() =>{
    try{
      if(fs.existsSync(path)){
        let fileData = await fs.promises.readFile(path,'utf8')
        let carts = JSON.parse(fileData);
        return carts;
      }else{
        return [];
      }
    }catch(error){
      console.log("Cannot read File: "+error)
    }
  }

  // crear carrito
  newCart = async(cart) =>{
    try{
      let carts = await this.getAllCarts();
      if(carts.length===0){
          cart.id=1;
          cart.timestamp= moments;
          cart.products=[];
          
          carts.push(cart);
          await fs.promises.writeFile(path,JSON.stringify(carts,null,'\t'));
      }else{
          cart.id = carts[carts.length-1].id+1;
          cart.products=[];
          cart.timestamp= moments;
          carts.push(cart);
          await fs.promises.writeFile(path,JSON.stringify(carts,null,'\t'));
      }
    }catch(error){
      console.log("Cannot write file: "+error)

    }
  }

  // buscar Id de carrito
  getById = async (id) => {
    try {
        let carts = await this.getAllCarts()
        let cart = null
        for (const item of carts) {
            if (item.id === id) {
                return item
            }
        }
        return cart
    } catch (error) {
        console.log('cart manager error, getCardById()')
        console.log(error)
    }
  }

  // eliminar carrito
  deleteByIdCart = async(id) =>{
    try{
      let remove = await this.getAllCarts()
      const removes = remove.filter((item) =>{
          if(id != item.id){
            return item
          }else{
            return null
          }
      })
      const newArray = fs.promises.writeFile(path, JSON.stringify(removes, null, '\t'))
      console.log(newArray)
      return newArray
    }catch(error){
      console.log('Cannot be deleted: ', error)
    }
  }   

  // añadir un producto al carrito
  addProductCart = async (cid, pid, quantity) => {
    let product = await productService.getById(pid)
  
    if(product === null){
      throw new Error("the product doesn't exist")
    }else{
      try {
        let cart = await this.getById(cid)
        if(cart.products.some(e =>e.id === pid)){
            for (const item of cart.products){
                if(item.id === pid){
                    let condition = (item.quantity += quantity)
                    if(condition < 1){
                        item.quantity = 1
                    }else{
                        item.quantity = condition
                    }
                }
            }
        }else{
            if(quantity < 1){
                throw new Error("Cart manager error:{addProductCart} invalid quantity")
            }else{
                cart.products.push({id:pid, quantity})
            }
        }
      await this.updateCarts(cart)
      } catch (error) {
        console.log("Cart manager error:{addProductCart} could be cart doesn't exist yet")
        console.log(error)
      }   
    }
  }

  // actualizar carrito
  updateCarts = async (cart)=>{
    try {
      let arrayCarts = await this.getAllCarts()
      let newCarts = []
      for(const item of arrayCarts){
        if(item.id===cart.id){
          newCarts.push(cart)
          continue
        }
        newCarts.push(item)
          
      }
      await fs.promises.writeFile(path,JSON.stringify(newCarts,null,'\t'));
    
        
    } catch (error) {
        console.log('cart manager error, UpdateCarts')
        console.log(error)
    }
  }

  //  borrar un producto del carrito
  deleteProductCart = async (cid, pid) => {
    let cart = await this.getById(cid)

    let newCartProduts = []

    if(cart.products.some(e =>e.id === pid)){
        for (const item of cart.products){
            if(item.id === pid){
                continue
            }
            newCartProduts.push(item)
        }
    }
    cart.products = newCartProduts
    await this.updateCarts(cart)
    
}
  

}





    
    


  


  
 





export default cartContainer;