// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyDvdTUs36DFXUIZ3S7EGZJlSeeDxXg1mGY",
  authDomain: "tiryaki-hukuk-admin-pane-9a3f2.firebaseapp.com",
  projectId: "tiryaki-hukuk-admin-pane-9a3f2",
  storageBucket: "tiryaki-hukuk-admin-pane-9a3f2.appspot.com",
  messagingSenderId: "432646173233",
  appId: "1:432646173233:web:1c8a7ad94bacb703781b10",
  measurementId: "G-0LMBJQ2524",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth persistence set to local.");
  })
  .catch((error) => {
    console.error("Error setting Firebase Auth persistence:", error);
  });

// Export the initialized services for use in other files
export { app, analytics, auth, db, storage};
