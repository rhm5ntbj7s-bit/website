import React, { useState } from 'react';
// import { addProduct } from '../utils/firebaseUtils';

const AdminPanel = () => {
  // const [message, setMessage] = useState('');
  // const [loading, setLoading] = useState(false);

  // COMMENTED OUT - Add a single product example
  // const handleAddSingleProduct = async () => {
  //   setLoading(true);
  //   setMessage('Adding product...');
  //   try {
  //     const newProduct = {
  //       name: "New Product",
  //       description: "This is a new product added from the admin panel",
  //       price: 99.99,
  //       image: "https://via.placeholder.com/300x200",
  //       category: "Electronics"
  //     };
  //     const id = await addProduct(newProduct);
  //     setMessage(`✅ Product added successfully with ID: ${id}`);
  //   } catch (error) {
  //     setMessage('❌ Error adding product: ' + error.message);
  //   }
  //   setLoading(false);
  // };

  return (
    <div style={styles.container}>
      <h2>Admin Panel</h2>

      <div style={styles.section}>
        <h3></h3>
        <p style={styles.noticeText}>
          You cannot add items to the website through this panel as you are not authorized.
        </p>
        <p style={styles.instructionText}>
          Admin accounts have authorisation.
        </p>
      </div>

      {/* COMMENTED OUT - Add product functionality */}
      {/* 
      <div style={styles.section}>
        <h3>Add Single Product (Example)</h3>
        <button 
          onClick={handleAddSingleProduct} 
          disabled={loading}
          style={styles.button}
        >
          {loading ? 'Adding...' : 'Add Sample Product'}
        </button>
      </div>

      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}
      */}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  noticeText: {
    fontSize: '16px',
    color: '#d32f2f',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  instructionText: {
    fontSize: '14px',
    color: '#555',
    fontStyle: 'italic'
  }
  // COMMENTED OUT - button styles
  // button: {
  //   padding: '12px 24px',
  //   backgroundColor: '#4CAF50',
  //   color: 'white',
  //   border: 'none',
  //   borderRadius: '4px',
  //   cursor: 'pointer',
  //   fontSize: '16px',
  //   marginTop: '10px'
  // },
  // message: {
  //   padding: '15px',
  //   marginTop: '20px',
  //   borderRadius: '4px',
  //   backgroundColor: '#e7f3ff',
  //   border: '1px solid #2196F3'
  // }
};

export default AdminPanel;
