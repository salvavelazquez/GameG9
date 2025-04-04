import React, { useState } from 'react';
import '../1_PriceComparison/components/estilo.css';
import Footer from '../components/Footer';

function PriceComparison() {
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    const guardarProducto = (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const precio = parseFloat(document.getElementById("precio").value);
        const comercio = document.getElementById("comercio").value;

        if (nombre && !isNaN(precio) && comercio) {
            const objProducto = { 
                nombre, 
                precio, 
                comercio,
                date: new Date().toLocaleDateString()
            };
            setProducts([...products, objProducto]);
            document.getElementById("formProducto").reset();
        } else {
            alert("Por favor, completa todos los campos correctamente.");
        }
    };

    const encontrarProductosMasBaratos = () => {
        const productosUnicos = {};
        products.forEach((producto) => {
            const { nombre, precio, comercio } = producto;

            if (!productosUnicos[nombre] || precio < productosUnicos[nombre].precio) {
                productosUnicos[nombre] = { nombre, precio, comercio, date: producto.date };
            }
        });

        return Object.values(productosUnicos);
    };

    const productosMasBaratos = encontrarProductosMasBaratos();

    return (
        <div className="game-theme">
            <main className="price-comparator-container">
                <div className="tool-header">
                    <h1 className="main-title">PRICE COMPARISON</h1>
                    <p>Choose the best places to buy. Help yourself for better control.</p>
                </div>
                
                <div className="comparator-card">
                    <form id="formProducto" className="product-form">
                        <div className="form-group">
                            <input 
                                type="text" 
                                id="nombre" 
                                placeholder="Product name" 
                                className="game-input"
                            />
                        </div>
                        
                        <div className="form-group">
                            <input 
                                type="number" 
                                id="precio" 
                                min="0" 
                                step="0.01" 
                                placeholder="Price" 
                                className="game-input"
                            />
                        </div>
                        
                        <div className="form-group">
                            <select id="comercio" className="game-select">
                                <option value="">Select store</option>
                                <option value="Comodin">Comodín</option>
                                <option value="Carrefour">Carrefour</option>
                                <option value="Vea">Vea</option>
                                <option value="Chango Mas">Chango Más</option>
                            </select>
                        </div>
                        
                        <button 
                            type="button" 
                            className="game-button primary" 
                            onClick={guardarProducto}
                        >
                            Add Product
                        </button>
                    </form>
                    
                    <div className="results-tabs">
                        <button 
                            className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            All Products
                        </button>
                        <button 
                            className={`tab-button ${activeTab === 'cheapest' ? 'active' : ''}`}
                            onClick={() => setActiveTab('cheapest')}
                        >
                            Best Prices
                        </button>
                    </div>
                    
                    <div className="results-container">
                        {activeTab === 'all' ? (
                            <>
                                <h2>All Products ({products.length})</h2>
                                {products.length > 0 ? (
                                    <table className="game-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Store</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((producto, index) => (
                                                <tr key={index}>
                                                    <td>{producto.nombre}</td>
                                                    <td>${producto.precio.toFixed(2)}</td>
                                                    <td>{producto.comercio}</td>
                                                    <td>{producto.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="no-results">No products added yet.</p>
                                )}
                            </>
                        ) : (
                            <>
                                <h2>Best Prices ({productosMasBaratos.length})</h2>
                                {productosMasBaratos.length > 0 ? (
                                    <table className="game-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Best Price</th>
                                                <th>Store</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productosMasBaratos.map((producto, index) => (
                                                <tr key={index} className="best-price">
                                                    <td>{producto.nombre}</td>
                                                    <td>${producto.precio.toFixed(2)}</td>
                                                    <td>{producto.comercio}</td>
                                                    <td>{producto.date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="no-results">No products to compare.</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default PriceComparison;