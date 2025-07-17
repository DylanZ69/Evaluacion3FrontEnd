// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB13C1YmPCNbxl_vdm-4XqiD_GxPJscqHI",
  authDomain: "eva42025ieidylan.firebaseapp.com",
  projectId: "eva42025ieidylan",
  storageBucket: "eva42025ieidylan.firebasestorage.app",
  messagingSenderId: "228592511657",
  appId: "1:228592511657:web:0e1b0438af0db0373057b8",
  measurementId: "G-7MFRQZNHVK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
