import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA3rjQbKL-S1cQ6RONEGfs9-nn-SQuHEfI",
  authDomain: "ruang-developmet.firebaseapp.com",
  projectId: "ruang-developmet",
  storageBucket: "ruang-developmet.firebasestorage.app",
  messagingSenderId: "734962745831",
  appId: "1:734962745831:web:4e53a0b405f9b4e89dbd42",
  measurementId: "G-3ENBS12RD2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);