import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  query, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';

// Generic real-time subscription helper
export const subscribeToCollection = (
    collectionName: string, 
    callback: (data: any[]) => void
) => {
    const q = query(collection(db, collectionName));
    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(data);
    });
};

// Generic real-time document subscription helper
export const subscribeToDocument = (
    collectionName: string, 
    id: string,
    callback: (data: any) => void
) => {
    const docRef = doc(db, collectionName, id);
    return onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
            callback({ id: snapshot.id, ...snapshot.data() });
        } else {
            callback(null);
        }
    });
};

// Generic CRUD helpers
export const fetchCollection = async (collectionName: string) => {
    const q = query(collection(db, collectionName)); // You can add default ordering if needed or pass as args
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchDocument = async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
        return { id: snapshot.id, ...snapshot.data() };
    }
    return null;
};

export const createDocument = async (collectionName: string, data: any) => {
    const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    return docRef.id;
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
    });
};

export const deleteDocument = async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
};
