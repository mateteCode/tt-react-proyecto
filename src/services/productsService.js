import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/config";

const productsRef = collection(db, "products");

/*
export const getProducts = async () => {
  try {
    const snapshot = await getDocs(productsRef);

    const productsFormat = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return productsFormat;
  } catch (error) {
    console.log("Error al traer productos:", error);
    return [];
  }
};
*/

export const getProductById = async (id) => {
  try {
    const productRef = doc(db, "products", id);

    const snapshot = await getDoc(productRef);

    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error al traer producto por ID:", error);
    return null;
  }
};

export const getProducts = async (genre) => {
  try {
    let queryRef;
    if (genre) {
      queryRef = query(productsRef, where("genre", "==", genre));
    } else {
      queryRef = productsRef;
    }

    const snapshot = await getDocs(queryRef);
    const productsFormat = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return productsFormat;
  } catch (error) {
    console.log("Error al traer productos por género:", error);
    return [];
  }
};

export const createProduct = async (product) => {
  try {
    const docRef = await addDoc(productsRef, product);
    return docRef.id;
  } catch (error) {
    console.log("Error al crear producto:", error);
    throw error;
  }
};
