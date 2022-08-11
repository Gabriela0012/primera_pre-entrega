let productForm = document.getElementById('productForm');

const handleSubmit = (evt,form,route) => {
  evt.preventDefault();
  let formData = new FormData(form);
  let product = {};
  formData.forEach((value, key) => product[key] = value);
  fetch(route,{
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    }

  }).then(res=>res.json()).then(json=>console.log(JSON.stringify(product)));

}
// console.log(result);
productForm.addEventListener('submit', (e)=>handleSubmit(e,e.target,'/api/products'))
