import React from 'react';

function ItemList({ items, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No items yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="item-grid">
      {items.map((item) => (
        <div key={item._id} className="item-card">
          <h3>{item.name}</h3>
          {item.description && <p>{item.description}</p>}
          
          <div className="item-details">
            <div className="item-detail">
              <span className="item-detail-label">Quantity</span>
              <span className="item-detail-value">{item.quantity}</span>
            </div>
            <div className="item-detail">
              <span className="item-detail-label">Price</span>
              <span className="item-detail-value">${item.price?.toFixed(2) || '0.00'}</span>
            </div>
          </div>

          <div className="item-actions">
            <button
              onClick={() => onDelete(item._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
