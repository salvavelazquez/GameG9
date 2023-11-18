import React, { useState } from 'react';

function PriceComparison(){
    const [products, setProducts] = useState([]);
    
    const guardarProducto = () => {
      const nombre = document.getElementById("nombre").value;
      const precio = parseFloat(document.getElementById("precio").value);
      const comercio = document.getElementById("comercio").value;
  
      if (nombre && !isNaN(precio) && comercio) {
        const objProducto = { nombre, precio, comercio };
        setProducts([...products, objProducto]);
        document.getElementById("formProducto").reset();
        alert("Producto guardado exitosamente.");
      } else {
        alert("Por favor, completa todos los campos correctamente.");
      }
    };
  
    const listarProductos = () => {
      const listaCompleta = document.getElementById("listaProductos");
      listaCompleta.innerHTML = "";
  
      products.forEach((producto) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.comercio}</td>
        `;
        listaCompleta.appendChild(row);
      });
    };
  
    const encontrarProductosMasBaratos = () => {
      const productosUnicos = {};
      products.forEach((producto) => {
        const { nombre, precio, comercio } = producto;
  
        if (!productosUnicos[nombre] || precio < productosUnicos[nombre].precio) {
          productosUnicos[nombre] = { nombre, precio, comercio };
        }
      });
  
      const resultado = Object.values(productosUnicos);
      return resultado;
    };
  
    const listarProductosBaratos = () => {
      const listaCompleta = document.getElementById("productosBaratos");
      listaCompleta.innerHTML = "";
  
      const productosMasBaratos = encontrarProductosMasBaratos();
      productosMasBaratos.forEach((producto) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.comercio}</td>
        `;
        listaCompleta.appendChild(row);
      });
    };
  
    return (
      <div className="form">
        <form id="formProducto">
          <h1>Comparador de precios</h1>
          <input type="text" id="nombre" placeholder="Nombre del producto" />
          <input type="number" id="precio" min="0" step="0.01" placeholder="Precio del producto" />
          <select name="comercio" id="comercio">
            <option value="">Nombre del comercio</option>
            <option value="Comodin">Comodín</option>
            <option value="Carrefour">Carrefour</option>
            <option value="Vea">Vea</option>
            <option value="Chango Mas">Chango Más</option>
          </select> <br />
          <button type="button" onClick={guardarProducto}>Guardar Producto</button>
          <button type="button" onClick={listarProductos}>Listar Productos</button>
          <button type="button" onClick={listarProductosBaratos}>Productos Más Baratos</button>
  
          <div id="mensajes">
          <h2>Listado de Productos</h2>
            <table id="tablaProductos">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Comercio</th>
                </tr>
              </thead>
              <tbody id="listaProductos">
              </tbody>
            </table>

            <div>
            <h2>Productos con Menor Precio</h2>
            <table id="tablaProductos">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Comercio</th>
                </tr>
              </thead>
              <tbody id="productosBaratos"></tbody>
            </table>
            </div>
          </div>
  
        </form>
      </div>
    );
}
export default PriceComparison;