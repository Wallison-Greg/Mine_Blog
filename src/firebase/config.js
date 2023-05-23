import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMF-yRlPuGiJrpfba3rYVDSWNQIWeQaqo",
  authDomain: "myblog-abcaf.firebaseapp.com",
  projectId: "myblog-abcaf",
  storageBucket: "myblog-abcaf.appspot.com",
  messagingSenderId: "989005175664",
  appId: "1:989005175664:web:e76654ec370f617eb20db5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};