import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import { getFirestore, collection, addDoc,doc, deleteDoc ,setDoc,getDoc } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvXpflDNxUr1OHB_9PxDzy2uextSLhEQQ",
  authDomain: "couchsurfing-india.firebaseapp.com",
  projectId: "couchsurfing-india",
  storageBucket: "couchsurfing-india.appspot.com",
  messagingSenderId: "88507130235",
  appId: "1:88507130235:web:7a40e25536f67646f49dde",
  measurementId: "G-P1EV7PJYNK"
};

const app=initializeApp(firebaseConfig);
const analytics=getAnalytics(app);
const db=getFirestore();
const auth=getAuth();

let globalEmail="";  

updateDetails.addEventListener('click',(e)=>{
  var occu=document.getElementById('occupation').value;
  var edu=document.getElementById('education').value;
  var lang=document.getElementById('languages').value;
  var local=document.getElementById('locality').value;
  var city=document.getElementById('city').value;
  var state=document.getElementById('state').value;
  var pincode=document.getElementById('pincode').value;
  var country=document.getElementById('country').value;
  var tnc=document.getElementById('termsndcond');

  if(occu==""){
    alert("Please fill your occupation");
  }else if(edu==""){
    alert("Please fill your education");
  }else if(lang==""){
    alert("Please fill the languages you know");
  }else if(local==""){
    alert("Please fill your locality");
  }else if(city==""){
    alert("Please fill your city");
  }else if(state==""){
    alert("Please fill state");
  }else if(pincode==""){
    alert("Please fill pincode");
  }else if(country==""){
    alert("Please fill country");
  }else if(tnc.checked==false){
    alert("Please agree to our terms and conditions");
  }else{
    const updateDoc = doc(db, 'users', globalEmail);
    setDoc(updateDoc, {
      Occupation: occu,
      Education: edu,
      Language: lang,
      Address: {locality:local,city:city,state:state,pincode:pincode,country:country}
    }, { merge: true },).then(()=>{
      alert("Data Updated successfully");
      window.location.href="/MyProfile/myprofile.html";
    })
  }
})
  
    
  onAuthStateChanged(auth, (user) => {
        if (!user) {
          
          window.location.href="/MyProfile/login/login.html";
          
        } else if(user){
          const email=user.email;
           
            globalEmail=user.email;
        }
      });