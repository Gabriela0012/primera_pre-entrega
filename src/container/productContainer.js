import fs from 'fs'
import moment from 'moment'


const path = "src/files/products.json"
const moments = moment().format('YYYY-MM-DD HH:mm:ss');

class ProductContainer {
  getAllProducts = async() =>{
    try{
      if(fs.existsSync(path)){
        let fileData = await fs.promises.readFile(path,'utf8')
        let products = JSON.parse(fileData);
        return products;
      }else{
        return [];
      }
    }catch(error){
      console.log("Cannot read File: "+error)
    }
  }
  saveProduct = async(product) =>{
    try{
      let products = await this.getAllProducts();
      if(products.length===0){
          product.id=1;
          product.timestamp= moments;
          products.push(product);
          await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
      }else{
          product.id = products[products.length-1].id+1;
          product.timestamp= moments;
          products.push(product);
          await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
      }
    }catch(error){
      console.log("Cannot write file: "+error)

    }
  }
  getById = async(id) => {
    try {
      let products = await this.getAllProducts()
      let product = null
      for(const item of products){
          if(item.id===id){
              product =item
          }
      }
      return product
  } catch (error) {
      console.log('GetById: '+error)
      return null
  }
  }

  deleteById = async(id) =>{
    try{
      let remove = await this.getAllProducts()
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

  deleteAll = async() => {
    try{
      await fs.promises.writeFile(path,JSON.stringify([], null, '\t'))
    } catch (error) {
      console.log(error)
    }
  }


  updateProduct = async(id, newData, newData1)=>{
    let productsArray = await this.getAllProducts()
    for(const item of productsArray){
        if(item.id === id){
            item.name = newData1,
            item.price = newData
        }
    }
    console.log(`id: ${id}, newData: ${newData}`)
    console.log(productsArray)
    await fs.promises.writeFile(path,JSON.stringify(productsArray, null, '\t'))
}


    
}
    


  
// product{ id, name, price, timestamp,description,code,thumbnail(url),stock}

  
 





export default ProductContainer;