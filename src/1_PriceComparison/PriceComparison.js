import React, { useState } from 'react';


function PriceComparison() {
    const [products, setProducts] = useState([]);

    const backgroundStyle = {
        backgroundImage: 'url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.pngtree.com%2Ffreebackground%2Findoor-environment-of-vegetable-market-and-aisle-of-fruit-and-vegetable-stalls_1714849.html&psig=AOvVaw1gfZ99lOGy5PlZXAW_mS70&ust=1700359672834000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCXocS7zIIDFQAAAAAdAAAAABAJ")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Esto asegura que la imagen ocupe al menos el 100% del alto de la pantalla
        padding: '20px', // Ajusta según sea necesario
    };

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
        <div className="container mt-5" style={backgroundStyle}>
            <form id="formProducto" className="mb-5">
                <h1 className="text-primary">Comparador de precios</h1>
                <br />
                <input type="text" id="nombre" className="me-2" placeholder="Nombre del producto" />
                <input type="number" id="precio" min="0" step="0.01" className="me-2" placeholder="Precio del producto" />
                <select name="comercio" id="comercio" className="btn btn-success">
                    <option value="">Nombre del comercio</option>
                    <option value="Comodin">Comodín</option>
                    <option value="Carrefour">Carrefour</option>
                    <option value="Vea">Vea</option>
                    <option value="Chango Mas">Chango Más</option>
                </select>
                
                <button type="button" className="btn btn-primary me-2 mt-2" onClick={guardarProducto}>Guardar Producto</button>
                <button type="button" className="btn btn-primary me-2 mt-2" onClick={listarProductos}>Listar Productos</button>
                <button type="button" className="btn btn-primary me-2 mt-2" onClick={listarProductosBaratos}>Productos Más Baratos</button>

                <div id="mensajes">
                    <br />
                    <h2 className="text-secondary">Listado de Productos</h2>
                    <table id="tablaProductos" className="table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Comercio</th>
                            </tr>
                        </thead>
                        <tbody id="listaProductos"></tbody>
                    </table>
                    <br />
                    <div >
                        <h2 className="text-secondary">Productos con Menor Precio</h2>
                        <table id="tablaProductos" className="table">
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