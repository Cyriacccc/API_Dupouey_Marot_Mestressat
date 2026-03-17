import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEdLxHsSWpbn-hB7AYMkWUisVBylGS1TA",
  authDomain: "rick-morty-card-game.firebaseapp.com",
  databaseURL:
    "https://rick-morty-card-game-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rick-morty-card-game",
  storageBucket: "rick-morty-card-game.firebasestorage.app",
  messagingSenderId: "167220951708",
  appId: "1:167220951708:web:ef2bb980290479dedc4b59",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
