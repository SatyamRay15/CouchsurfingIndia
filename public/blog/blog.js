import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";

import { getAuth,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getFirestore, collection, addDoc,doc, deleteDoc  } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
     
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

onAuthStateChanged(auth,(user)=>{
  if(user){
    const uid = user.uid;
    // ...
    console.log(user);
    document.getElementById('login1').innerHTML=' <button style="width:auto;margin-left:5px;border-radius:5px;background-color: #EF7C8E" id="logout1">Logout</button>';

    document.getElementById('signup').innerHTML=' <a href="/MyProfile/myprofile.html"><button style="width:auto;border-radius:5px;background-color: #2E765E;" >My Profile</button></a>';

    logout1.addEventListener('click',(e)=>{
      auth.signOut().then(function() {
    // Sign-out successful.
    alert("Signed Out Successfully!!");
    window.reload();
  }, function(error) {
    // An error happened.
    alert(error);
  });
    })
    // console.log(user);
  }else{

  }
})    