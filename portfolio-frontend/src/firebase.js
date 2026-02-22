import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '',
    authDomain: 'fazlul-karim.firebaseapp.com',
    databaseURL: process.env.REACT_APP_BACKEND_API?.replace(/\/$/, '') || 'https://fazlul-karim-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'fazlul-karim',
    storageBucket: 'fazlul-karim.firebasestorage.app',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
export default app;
