import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";
import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
import {query, collection,doc, getDoc,getDocs,getFirestore,setDoc,updateDoc,orderBy,deleteDoc,serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js";

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
const auth = getAuth();
const db=getFirestore();
const storage = getStorage();

submitDetails.addEventListener('click',(e)=>{
  var count=0;
  var days='';
  var CPS="";
  var misci="";

 const noOfGuest=document.getElementById('noOfGuest').value;
 
 const selectedGenderOption = $("input:radio[name=inlineRadioOptions]:checked").val();

 const selectedOptionFoodPreference = $("input:radio[name=foodPreference]:checked").val();

 const sleepArrang=document.getElementById('sleeping').value;

 const descOfSleeping=document.getElementById('descOfSleeping').value;

 const shareWithGuest=document.getElementById('shareWithGuest').value;

 const guestTrvelling=document.getElementById('guestTravelling').value;

 const addInfo=document.getElementById('AdditionalInfo').value;

 const termsndcond=document.getElementById('termsndcond');

  for(var i=0;i<7;i++){
    var sun=document.getElementsByClassName('days');
    if(sun[i].checked==true){
      count+=1;
      days+=sun[i].value+', ';
    }else if(i==6 && count==0){
      alert("Please select any Nights to host");
      return;
    }
    if(i==6){
      count=0;
    }
 }


 for(var i=0;i<3;i++){
   const cPs=document.getElementsByClassName('cps');
   if(cPs[i].checked==true){
     count+=1;
     CPS+=cPs[i].value+', ';
   }else if(i==2 && count==0){
     alert("Please select your Children, Pets, Smoking Preference");
     return;
   }
   if(i==2){
     count=0;
   }
 }

 var pet=document.getElementById('pet').checked;
 var smoke=document.getElementById('smok').checked;
 var kid=document.getElementById('Ihavekids').checked;
 var weelCh=document.getElementById('weelchair').checked
 if(pet==true){
  pet='Yes';
 }else{
   pet='No';
 }
 if(smoke==true){
   smoke='Yes';
 }else{
   smoke='No';
 }
 if(kid==true){
   kid='Yes';
 }else{
   kid='No';
 }
 if(weelCh==true){
   weelCh='Yes';
 }else{
   weelCh='No';
 }

 if(noOfGuest==0 || noOfGuest>10){
   alert("No Of Guest should not be 0 or greater than 10");
   return;
 }else if(noOfGuest==""){
  alert("No Of Guest couldn't be empty");
  return;
 }else if(selectedOptionFoodPreference==null){
   alert("Please chose any food preference");
   return;
 }else if(sleepArrang=="" || descOfSleeping=="" || shareWithGuest=="" || guestTrvelling=="" || addInfo==""){
   alert("Please fill all the fields");
 }else if(termsndcond.checked==false){
   alert("Please agree to our terms and condition");
 }else{
   document.getElementById('submitDetails').innerHTML='<i class="fa fa-spinner fa-spin"></i>  Submitting...';
   document.getElementById('submitDetails').id='submitting';
   console.log(pet+' '+smoke+' '+weelCh+' '+kid);
   setDoc(doc(db,"users",globalEmail,"HostData",globalEmail),{
     NumberOfDaysToHost: days,
     MaxNoOfGuest: noOfGuest,
     PrefferedGenderToHost: selectedGenderOption,
     ChildrePetsSmoking: CPS,
     FoodPreference: selectedOptionFoodPreference,
     SleepingArrangements: sleepArrang,
     DescriptionOfSleepingArrangments: descOfSleeping,
     WhatCanIShareWithGuest: shareWithGuest,
     HasPet: 'Has Pets? '+pet,
     HasChildren: 'Has Children at Home? '+kid,
     SmokingAtHome: 'Smoking at Home? '+smoke,
     WeelchairAccessible: 'Weelchair Accessible? '+weelCh,
     GuestTravellingArrangements: guestTrvelling,
     AdditionalInformation: addInfo,
     TermsNdCondition: termsndcond.value
   },{merge:true},{Capital:true}).then((error)=>{
     console.log("document added successfully");
     window.location.href='/MyProfile/HostProfile/host.html';
   })
 }
  
})


let globalEmail="";
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href="/login/login.html";        
  } else if(user){
    const email=user.email;
    // getUserData(email);
    globalEmail=user.email;
  }
});