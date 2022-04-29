   
         import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
         import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";
         import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
         import { getFirestore, collection,doc,setDoc,getDoc,serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
     
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
      
  
       register.addEventListener('click',(e)=>{
          var firstName = document.getElementById('firstName').value;
          var lastName = document.getElementById('lastName').value;
          var birthdayDate = document.getElementById('birthdayDate').value;
         
          var selectedOption = $("input:radio[name=inlineRadioOptions]:checked").val();
          var number= document.getElementById('phoneNo').value;
          var email=document.getElementById('email').value;
          var password=document.getElementById('password').value;
          var termsndcond = document.getElementById('termsndcond');

          if(firstName==''){
            alert("Please fill your first name");
          }else if(lastName==''){
            alert("Please fill your last name");
          }else if(birthdayDate==''){
            alert("Please fill your age")
          }else if(birthdayDate<18 || birthdayDate>50){
            alert("Your age should not be less than 18 or greater than 50. This violates our terms and conditions. ")
          }
          else if(selectedOption==''){
            alert("Please select your gender");
          }else if(number==''){
            alert("Please fill your phone number");
          }else if(email==''){
            alert("Please fill your email address");
          }else if(password==''){
            alert("Please fill your passowrd");
          }else if(termsndcond.checked==false){
            alert("Please agree to the terms and conditions");
          }else{
             //Registering user with email and password

          const docRef1 =collection(db,"users");

          function createData(){
            const docRef =  setDoc(doc(docRef1, email), {
              FirstName: firstName,
              LastName: lastName,
              Age: birthdayDate,
              Gender: selectedOption,
              PhoneNumber: number,
              EmailId: email,
              ProfileLink: '',
              TermsAndCondition: 'User agreed to terms and conditions',
              timestamp: serverTimestamp()
            }).then(()=>{
  
              alert("User Registered Successfully!!");
              window.location.href="/MyProfile/myprofile.html";
            }
              
            )
          }

          var a=0;
          if(a==0){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              // ...
                  // action();
                  a=a+1;
            console.log(a);
            
            
            if(a==1){
              createData();
            }
             
            
              
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              // ..
              // deleteDoc(doc(db, "users",email));
              alert(errorMessage);
              console.log(a);
              return;
           })
            
            console.log(a);
          }
          
        
         
           
        }
      })

      function reDirect(red){
        getDoc(doc(db,"users",red)).then(docSnap =>{
          if(docSnap.exists()){
            window.location.href="/MyProfile/myprofile.html";
          }
        })
      }

      //  Checking the state of the user
       onAuthStateChanged(auth, (user) => {
        if (user) {

          const uid = user.uid;
          // ...
          // createData();
          const redirect=user.email;
          reDirect(redirect);
          console.log(user.email);
          // window.location.href="/MyProfile/myprofile.html";
        } else {
                                       
        }
      });


 

