import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "clone-a19a2.firebaseapp.com",
  projectId: "clone-a19a2",
  storageBucket: "clone-a19a2.appspot.com",
  messagingSenderId: "160833059722",
  appId: "1:160833059722:web:317d3c55dbf29b964d2673",
  measurementId: "G-6B8SMQF3QS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
