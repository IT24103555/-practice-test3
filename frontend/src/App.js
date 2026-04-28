import React, { useState, useEffect } from 'react';
import api from './api';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/items');
      setItems(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError('Item name is required');
      return;
    }

    try {
      const response = await api.post('/api/items', formData);
      setItems([...items, response.data]);
      setFormData({
        name: '',
        description: '',
        quantity: 0,
        price: 0,
      });
      setError('');
    } catch (err) {
      setError('Failed to add item');
      console.error(err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await api.delete(`/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete item');
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Item Manager</h1>
        <p>Manage your items efficiently</p>
      </header>

      <main className="main-content">
        <div className="form-section">
          <h2>Add New Item</h2>
          <form onSubmit={handleAddItem} className="item-form">
            <input
              type="text"
              name="name"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
            />
            <button type="submit" className="btn btn-primary">Add Item</button>
          </form>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="items-section">
          <h2>Items List</h2>
          {loading ? (
            <p className="loading">Loading items...</p>
          ) : (
            <ItemList items={items} onDelete={handleDeleteItem} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
