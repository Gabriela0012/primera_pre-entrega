import fs from 'fs'

const path = "src/files/products.json"
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
          products.push(product);
          await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
      }else{
          product.id = products[products.length-1].id+1;
          products.push(product);
          await fs.promises.writeFile(path,JSON.stringify(products,null,'\t'));
      }
    }catch(error){
      console.log("Cannot write file: "+error)

    }
  }
  getById = async(id) => {
    try {
      let objetId = await this.getAllProducts()
      const leak = objetId.find((item) =>{
      if(id == item.id){
        return item
      }else{
        return null
      }
      })
      return console.log("GetByID: ", leak)
    } catch (error) {
      console.log('Id not found: ', error)
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
    console.log("Product correctly removed")
    return newArray
}catch(error){
    console.log('Cannot be deleted: ', error)
}
}   

deleteAll = async() => {
  try{
    await fs.promises.writeFile(path, '[]')
  } catch (error) {
    console.log(error)
  }
}
    
}
    


  


  
 





export default ProductContainer;