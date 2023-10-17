import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [products, setProducts] = useState([]);

  // Obtener productos del backend cuando se carga la página
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    }

    fetchData();
  }, []);

  const addProduct = async () => {
    try {
      await axios.post("/api/productos", {
        nombre: productName,
        descripcion: productDescription,
        precio: parseFloat(productPrice),
      });
      // Refrescar la lista de productos después de agregar uno nuevo
      const response = await axios.get("/api/productos");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <div>
      <h1>Productos CRUD</h1>

      <form onSubmit={addProduct}>
        <label>Nombre:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <label>Descripción:</label>
        <input
          type="text"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <label>Precio:</label>
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <button type="submit">Agregar Producto</button>
      </form>

      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.nombre} - {product.descripcion} - ${product.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
