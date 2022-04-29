import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
     
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

      

 //Checking the state of the user
 onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    // ...
    console.log(user);
    document.getElementById('login1').innerHTML='<button style="width:auto;margin-left:5px;border-radius:5px;background-color: #EF7C8E;border: 1px solid gray;" id="logout1" class="btn">Logout <i class="fa-solid fa-right-from-bracket"></i></button>';

    document.getElementById('signup').innerHTML=' <a href="/MyProfile/myprofile.html"><button style="width:auto;border-radius:5px;background-color: #81B622;border: 1px solid gray;color:black;" >MyProfile <i class="fa-solid fa-user"></i></button></a>';

    logout1.addEventListener('click',(e)=>{
      auth.signOut().then(function() {
    // Sign-out successful.
    alert("Signed Out Successfully!!");
    window.location.href='index.html';
  }, function(error) {
    // An error happened.
    alert(error);
  });
    })
    // console.log(user);
  } else {
    // User is signed out
            //  window.location.href="couchsurfing_home.html";          
  }
});