import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApdW26ufttelP9y0MEfUSiHVlLQ7K5GKc",
  authDomain: "smart-chama-5252c.firebaseapp.com",
  projectId: "smart-chama-5252c",
  storageBucket: "smart-chama-5252c.firebasestorage.app",
  messagingSenderId: "286203546306",
  appId: "1:286203546306:web:16eb14c22ffa838783895b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Export the app for use in other modules
export default app;

