import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlZafGeGLMfn67Ssupzwawe3ly-AL7kHI",
  authDomain: "blogging-app-8ce01.firebaseapp.com",
  projectId: "blogging-app-8ce01",
  storageBucket: "blogging-app-8ce01.appspot.com",
  messagingSenderId: "898139687640",
  appId: "1:898139687640:web:d7529373ecb5faf75b65ad",
  measurementId: "G-JJ759KEEF3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
