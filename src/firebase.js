import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyC2Hq_iGjGFY6H81tUh9u2aAoV4ik1UYwY",
    authDomain: "zoo-sale.firebaseapp.com",
    projectId: "zoo-sale",
    storageBucket: "zoo-sale.appspot.com",
    messagingSenderId: "520764478299",
    appId: "1:520764478299:web:0a51486b43326241b9807e",
    measurementId: "G-V95M683SX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}
