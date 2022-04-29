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
let a=0;

function readData(){
  getDoc(doc(db,"users",globalEmail)).then(docSnap=>{
    if(docSnap.exists()){
      var ab=docSnap.data().AboutMe;
      if(ab){
        a=1;
      }
    }
  })
}

updatePersonalDetails.addEventListener('click',(e)=>{
  var about=document.getElementById('aboutMe').value;
  var interest=document.getElementById('myInterests').value;
  var teachLearn=document.getElementById('teachLearnShare').value;
  var whyCouch=document.getElementById('whyCouch').value;
  var amazingThing=document.getElementById('amazingThing').value;
  var stateVisited=document.getElementById('statesVisited').value;
  var tnc=document.getElementById('termsndcond');
  if(about=="" && a==0){
    alert("Please fill the about section. It is mandatory");
  }
  else if( interest=="" && teachLearn=="" && whyCouch=="" && amazingThing=="" && stateVisited==""){
    alert("Please fill more field inorder to update your details");
  }else if(tnc.checked==false){
    alert("Please agree to our terms and conditions");
  }else{
  if(about!=""){
    const updateDoc = doc(db, 'users', globalEmail);
    setDoc(updateDoc, {
      AboutMe: about
    },{merge:true}).then(()=>{
      window.location.href="/MyProfile/myprofile.html";
    })
  }
  if(interest!=""){
    const updateDoc = doc(db, 'users', globalEmail);
    setDoc(updateDoc, {
      MyInterests: interest
    },{merge:true}).then(()=>{
      alert("Data Updated successfully");
      window.location.href="/MyProfile/myprofile.html";
    })
  }
  if(teachLearn!=""){
    const updateDoc = doc(db, 'users', globalEmail);
    setDoc(updateDoc, {
      TeachLearnShare: teachLearn
    },{merge:true}).then(()=>{
      alert("Data Updated successfully");
      window.location.href="/MyProfile/myprofile.html";
    })
  }
  if(whyCouch!=""){
    const updateDoc = doc(db, 'users', globalEmail);
    setDoc(updateDoc, {
      WhyCouchSurfing: whyCouch
    },{merge:true}).then(()=>{
      alert("Data Updated successfully");
      window.location.href="/MyProfile/myprofile.html";
    })
  }
  if(amazingThing!=""){
    const updateDoc = doc(db, 'users', globalEmail);
    setDoc(updateDoc, {
      AmazingThingDone: amazingThing
    },{merge:true}).then(()=>{
      alert("Data Updated successfully");
      window.location.href="/MyProfile/myprofile.html";
    })
  }
  if(stateVisited!=""){
    const updateDoc = doc(db, 'users', globalEmail);
    setDoc(updateDoc, {
      StatesVisited: stateVisited
    },{merge:true}).then(()=>{
      alert("Data Updated successfully");
      window.location.href="/MyProfile/myprofile.html";
    })
  }
  } 
   
})
  
   
onAuthStateChanged(auth, (user) => {
  if (!user) {
    
    window.location.href="/MyProfile/login/login.html";
    
  } else if(user){
    const email=user.email;
     
      globalEmail=user.email;
      readData();
  }
});