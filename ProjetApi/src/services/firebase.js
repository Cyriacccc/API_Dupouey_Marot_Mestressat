import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";


/* Configuration de Firebase pour l'application, avec les clés et identifiants nécessaires pour se connecter aux services Firebase. Initialise l'application Firebase et exporte les instances d'authentification, de fournisseur Google et de base de données pour être utilisées dans le reste de l'application. */
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

/* Initialise l'application Firebase avec la configuration fournie, et exporte les instances d'authentification, de fournisseur Google et de base de données pour être utilisées dans le reste de l'application. */
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
