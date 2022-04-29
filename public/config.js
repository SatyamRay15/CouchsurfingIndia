import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";
import { getFirestore,collection, getDocs, query, where,updateDoc, doc,setDoc,getDoc,serverTimestamp  } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

      const firebaseConfig = {
         apiKey: "AIzaSyAvXpflDNxUr1OHB_9PxDzy2uextSLhEQQ",
         authDomain: "couchsurfing-india.firebaseapp.com",
         projectId: "couchsurfing-india",
         storageBucket: "couchsurfing-india.appspot.com",
         messagingSenderId: "88507130235",
         appId: "1:88507130235:web:7a40e25536f67646f49dde",
         measurementId: "G-P1EV7PJYNK"
       };

       // Initialize Firebase
       const app = initializeApp(firebaseConfig);
       const analytics = getAnalytics(app);
       const db=getFirestore();
       const auth= getAuth();
  