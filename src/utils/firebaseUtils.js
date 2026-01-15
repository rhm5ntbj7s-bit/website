import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  setDoc,
  writeBatch 
} from 'firebase/firestore';

// Add a single product
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Product added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product: ", error);
    throw error;
  }
};

// Add multiple products at once
export const addMultipleProducts = async (productsArray) => {
  try {
    const promises = productsArray.map(product => 
      addDoc(collection(db, "products"), product)
    );
    const results = await Promise.all(promises);
    console.log(`Successfully added ${results.length} products`);
    return results;
  } catch (error) {
    console.error("Error adding multiple products: ", error);
    throw error;
  }
};

// Batch add products (more efficient for large datasets, up to 500 at once)
export const batchAddProducts = async (productsArray) => {
  try {
    const batch = writeBatch(db);
    
    productsArray.forEach((product) => {
      const docRef = doc(collection(db, "products"));
      batch.set(docRef, product);
    });
    
    await batch.commit();
    console.log(`Successfully batch added ${productsArray.length} products`);
    return { success: true, count: productsArray.length };
  } catch (error) {
    console.error("Error batch adding products: ", error);
    throw error;
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Error getting products: ", error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (productId, updatedData) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedData);
    console.log("Product updated successfully");
  } catch (error) {
    console.error("Error updating product: ", error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, "products", productId));
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
};

// Upload all products from products.json to Firebase
export const uploadProductsFromJSON = async (productsData) => {
  try {
    const products = productsData.products;
    await addMultipleProducts(products);
    console.log("All products uploaded to Firebase!");
  } catch (error) {
    console.error("Error uploading products: ", error);
    throw error;
  }
};
