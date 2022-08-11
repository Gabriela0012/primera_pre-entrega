# Primera pre-entrega
## consigna
.Crear un ApiProducts.
.Crear un ApiCarts que contenga carritos,dentro de que cada carrito agregar productos de la api de productos con validaciones.
.Restringir el acceso si no es un administrador.

## Proyecto

.Se realizo la creación de las rutas, las rutas principales son:
http://localhost:8080/api/carts
http://localhost:8080/api/products

Para realizar un buen testeo, se envia link de postman con todas las rutas del proyecto.
https://go.postman.co/workspace/Team-Workspace~9f658cc4-8b00-4215-8671-5751dcc9a926/collection/22122420-87914e90-eac1-4a4c-ae89-5c5263e186fe?action=share&creator=22122420
Para las rutas de ApiProducts(https://go.postman.co/workspace/Team-Workspace~9f658cc4-8b00-4215-8671-5751dcc9a926/collection/22122420-562c458f-f381-4bc1-a0ef-14d49cd71563?action=share&creator=22122420)
Para las rutas de ApiCarts(https://go.postman.co/workspace/Team-Workspace~9f658cc4-8b00-4215-8671-5751dcc9a926/collection/22122420-87914e90-eac1-4a4c-ae89-5c5263e186fe?action=share&creator=22122420)
.Para restringir el acceso se Creo una variable Admin en el archivo 'app.js',la cual si esta en (true), puede modificar el producto, y si esta en (false) lo restringe.
