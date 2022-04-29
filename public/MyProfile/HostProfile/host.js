        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js";
        import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";
        import {collection,doc, getDoc,getFirestore,setDoc,updateDoc, getDocs, query,deleteDoc,serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
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
      

    //function for logout
      logout.addEventListener('click',(e)=>{
        auth.signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
      alert(error);
    });
      })

      //function to display details in my profile section
      function getUserData(email){
        var name='';
        getDoc(doc(db, "users", email)).then(docSnap => {
          if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data().FirstName);
            document.getElementById("name").innerHTML=docSnap.data().FirstName+" "+docSnap.data().LastName;
            name=docSnap.data().FirstName;
            document.getElementById("email").innerHTML=docSnap.data().EmailId;
            document.getElementById('phone').innerHTML='Phone Number: '+docSnap.data().PhoneNumber;
            const ava=docSnap.data().Gender;
            var lin=docSnap.data().ProfileLink;
            if(lin!=""){
              document.querySelector('.profilepic').src=lin;
            }
            else if(ava=="male" || ava=="others"){
              document.querySelector('.profilepic').src='/images/My_profile_images/img_avatar.png';
            }else if(ava=='female'){
              document.querySelector('.profilepic').src='/images/My_profile_images/img_avatar2.png';
            }
          } else {
            console.log("No such document!");
          }
        })
        //this code is for my home details section
        getDoc(doc(db,"users",globalEmail,"HostData",globalEmail)).then(docSnap=>{
          if(docSnap.exists()){
            document.getElementById('noHostData').style.display='none';
            document.getElementById('nameHeading').innerHTML=name+"'s Preference";
            document.getElementById('myHomeHeading').innerHTML=name+"'s Home";
            let mainDiv=document.createElement('div');
            let div1=document.createElement('div');
            let div2=document.createElement('div');
            let div3=document.createElement('div');
            let div4=document.createElement('div');

            mainDiv.setAttribute('style','padding:5px');
            div2.textContent='Day in which I will be available to Host: '+docSnap.data().NumberOfDaysToHost;
            div1.textContent='Maximum Number Of Guests: '+docSnap.data().MaxNoOfGuest;
            div3.textContent='Preffered Gender to Host: '+docSnap.data().PrefferedGenderToHost;
            div4.textContent='Miscellaneous: '+docSnap.data().ChildrePetsSmoking;           

            // td.appendChild(mainDiv);
            mainDiv.appendChild(div2);
            mainDiv.appendChild(div1);
            mainDiv.appendChild(div3);
            mainDiv.appendChild(div4);

            const addData=document.getElementById('myPreference');

            addData.appendChild(mainDiv);

            let mainDiv2=document.createElement('div');
            let div5=document.createElement('div');
            let div6=document.createElement('div');
            let div7=document.createElement('div');
            let div8=document.createElement('div');
            let Div=document.createElement('div');

            mainDiv2.setAttribute('style','padding:5px');
            div5.textContent=docSnap.data().HasPet;
            div6.textContent=docSnap.data().HasChildren;
            div7.textContent=docSnap.data().SmokingAtHome;
            div8.textContent=docSnap.data().WeelchairAccessible;
            Div.textContent='Food Preference: '+docSnap.data().FoodPreference;

            mainDiv2.appendChild(div5);
            mainDiv2.appendChild(div6);
            mainDiv2.appendChild(div7);
            mainDiv2.appendChild(div8);
            mainDiv2.appendChild(Div);

            const addData2=document.getElementById('myHomePreference');

            addData2.appendChild(mainDiv2);

            let mainDiv3=document.createElement('div');
            let div9=document.createElement('div');
            let div10=document.createElement('div');

            mainDiv3.setAttribute('style','padding:5px');
            div9.setAttribute('style','font-weight: bold');
            div9.textContent=docSnap.data().SleepingArrangements;
            div10.textContent=docSnap.data().DescriptionOfSleepingArrangments;
            

            mainDiv3.appendChild(div9);
            mainDiv3.appendChild(div10);
            // mainDiv2.appendChild(div7);
            // mainDiv2.appendChild(div8);

            const addData3=document.getElementById('MysleepingPreference');

            addData3.appendChild(mainDiv3);

            let mainDiv4=document.createElement('div');
            let div11=document.createElement('div');
            let div12=document.createElement('div');
            let div13=document.createElement('div');
            let div14=document.createElement('div');
            let div15=document.createElement('div');
            let div16=document.createElement('div');
            let br=document.createElement('br');
            let br1=document.createElement('br');

            mainDiv4.setAttribute('style','padding:5px');
            div11.setAttribute('style','font-weight: bold');
            div11.textContent='Public Transport Access';
            div12.textContent=docSnap.data().GuestTravellingArrangements;
            div13.setAttribute('style','font-weight: bold');
            div13.textContent='What Can I Share With Guests';
            div14.textContent=docSnap.data().WhatCanIShareWithGuest;
            div15.setAttribute('style','font-weight: bold');
            div15.textContent='Additional Information';
            div16.textContent=docSnap.data().AdditionalInformation;

            mainDiv4.appendChild(div11);
            mainDiv4.appendChild(div12);
            mainDiv4.appendChild(br);
            mainDiv4.appendChild(div13);
            mainDiv4.appendChild(div14);
            mainDiv4.appendChild(br1);
            mainDiv4.appendChild(div15);
            mainDiv4.appendChild(div16);

            const addData4=document.getElementById('MoreDetails');

            addData4.appendChild(mainDiv4);
          }else{
            document.getElementById('noHostData').style.display='block';
            document.getElementById('wholeData').style.display='none';
          }
        })

        //this is for rendering my request for a stay
        getDocs(query(collection(db,"users",globalEmail,"RequestingForStay"))).then((docSnap)=>{
          docSnap.forEach((docu)=>{
            if(docu.exists()){
              document.getElementById('noHost').style.display='none';
              var req=1;
              renderHostRequest(docu,req);
            }
          })
        })

         //this is for rendering other requests for a stay
         getDocs(query(collection(db,"users",globalEmail,"RequestForStay"))).then((docSnap)=>{
          docSnap.forEach((docu)=>{
            if(docu.exists()){
              document.getElementById('noHost').style.display='none';
              var req=2;
              renderHostRequest(docu,req);
            }
          })
        })
      }
  
//this section of code is for rendering host request in my host section
function renderHostRequest(docu,req){
  let mainDiv=document.createElement('div');
  let rowDiv=document.createElement('div');
  let colDiv=document.createElement('div');
  let div1=document.createElement('div');
  let h6=document.createElement('h6');
  let div2=document.createElement('div');
  let div3=document.createElement('div');
  let div4=document.createElement('div');
  let div5=document.createElement('div');
  let div6=document.createElement('div');
  let div7=document.createElement('div');
  let div8=document.createElement('div');
  let div9=document.createElement('div');
  let image=document.createElement('img');
  let button=document.createElement('button');
  let button1=document.createElement('button');
  let viewProfile=document.createElement('button');
  let h6Name=document.createElement('h5');

  mainDiv.setAttribute('class','card p-1');
  rowDiv.setAttribute('class','row');
  colDiv.setAttribute('class','col-md-9');
  colDiv.setAttribute('style','border:1px solid gray;');
  div1.setAttribute('class','p-1 d-flex justify-content-between');
  div1.setAttribute('style','border-bottom: 1px solid gray');
  h6.setAttribute('class','p-2');
  div2.setAttribute('class','p-1 d-flex');
  div3.setAttribute('class','p-2');
  div4.setAttribute('class','p-2');
  div5.setAttribute('class','p-2');
  div6.setAttribute('class','pl-3');
  div7.setAttribute('style','display:flex;flex-direction:column;align-items:center;border: 1px solid gray;padding:8px');
  div9.setAttribute('class','p-3');
  var docum1;
  if(req==1){
    docum1=(docu.id).replace("requesting","");
  }else if(req==2){
    docum1=(docu.id).replace("request","");
  }
  getDoc(doc(db,"users",docum1)).then((docum)=>{
    h6.setAttribute('id',docu.id+docu.data().timestamp);
    
    viewProfile.setAttribute('class','btn btn-success');
    viewProfile.innerHTML='View Profile';
    viewProfile.setAttribute('id',docu.id+"viewProf");
    viewProfile.setAttribute('style','cursor:pointer');
    var getDiv=document.getElementById(docu.id+'viewProf');
    getDiv.addEventListener('click',(e)=>{
      localStorage.setItem("Id",docum.id);
      window.location.href='/components/UserProfileComponent/UserProfile.html';
      
    })
    if(docu.data().District!=""){
      document.getElementById(docu.id+docu.data().timestamp).innerHTML='<i class="fa-solid fa-earth-asia"></i> <b>Visiting: </b>'+docu.data().City+', '+docu.data().District+', '+docu.data().State;
    }else if(docu.data().District==""){
      document.getElementById(docu.id+docu.data().timestamp).innerHTML='<i class="fa-solid fa-earth-asia"></i> <b>Visiting: </b>'+docu.data().City+', '+docu.data().State;
    }

    if(req==1){
      if(docu.data().Status=="Pending"){
      button.setAttribute('class','btn');
      button.setAttribute('style','float:end;background-color: gray;color: white;');
      button.textContent="Pending...";
      button.setAttribute('disabled','true');
    }else if(docu.data().Status=="Accepted"){
      button.setAttribute('class','btn');
      button.setAttribute('style','float:end;background-color: #189AB4;color: white;');
      button.innerHTML='Message  <i class="fa-solid fa-message"></i>';
    }
    }else if(req==2){
      if(docu.data().Status=="Pending"){
        button.setAttribute('class','btn btn-success btn-sm');
        button.setAttribute('style','float:end;color: white;margin-right:3px;');
        button.setAttribute('id',docu.id+'accept');
        button.textContent="Accept";
        button1.setAttribute('class','btn btn-sm');
        button1.setAttribute('style','float:end;background-color: gray;color: white;');
        button1.setAttribute('id',docu.id+'reject');
        button1.textContent="Reject";
        const accept=document.getElementById(docu.id+'accept');
        accept.addEventListener('click',(e)=>{
  
          setDoc(doc(db,"users",globalEmail,"RequestingForStay",docum1+'accepted'),{
            City: docu.data().City,
            District: docu.data().District,
            State: docu.data().State,
            From: docu.data().From,
            Till: docu.data().Till,
            TotalNumberOfTravellers: docu.data().TotalNumberOfTravellers,
            AdditionalInformation: docu.data().AdditionalInformation,
            Status: "Accepted",
            timestamp: serverTimestamp()
          }).then(e=>{
            console.log("Document Added successfully");
          })
          deleteDoc(doc(db,"users",globalEmail,"RequestForStay",docum1+'request')).then(e=>{
            console.log("document deleted sucessfully");
          })
          console.log(docum);
          setDoc(doc(db,"users",docum1,"RequestingForStay",globalEmail+'requesting'),{
            Status: "Accepted"
          },{merge:true}).then(e=>{
            console.log("merged sucessfully");
          })
          setDoc(doc(db,"users",docum1,"notification",globalEmail+'reqaccepted'),{
            Heading: "Request For Stay",
            Notification: docum.data().FirstName+' '+docum.data().LastName+' accepted your request for stay from '+docu.data().From+' to '+docu.data().Till,
            ImageLink: docu.data().ProfileLink,
            Gender: docu.data().Gender,
            timestamp: serverTimestamp()
          },{ capital: true }, { merge: true }).then(()=>{
            getDoc(doc(db,"users",docum1,"notification","numbers")).then(e=>{
              if(e.exists()){
                var num=e.data().Number;
                if(num=="undefined"){
                  setDoc(doc(db,"users",docum1,"notification","numbers"),{
                    Number: 1
                  }).then(e=>{
                    window.location.reload();
                  })
                }else if(num==0){
                  setDoc(doc(db,"users",docum1,"notification","numbers"),{
                    Number: 1
                  }).then(e=>{
                    window.location.reload();
                  })
                }else if(num>=0){
                  setDoc(doc(db,"users",docum,"notification","numbers"),{
                    Number: 1
                  }).then(e=>{
                    window.location.reload();
                  })
                }else{
                  window.location.reload();
                }
              }
            })
            console.log("Notification added successfully");
            window.location.reload();
          })
        })
      }
    }
    

    var d1 = new Date(docu.data().From); 
    var d2 = new Date(docu.data().Till);
  
    var diff = d2.getTime() - d1.getTime(); 
  
    var daydiff = diff / (1000 * 60 * 60 * 24);
    div3.innerHTML='<i class="fa-solid fa-house-chimney"></i> <span style="color:gray;font-weight:400;">'+daydiff +' nights</span>';

    div4.innerHTML='<i class="fa-solid fa-calendar-days"></i> <span style="color: gray">'+docu.data().From+' <i class="fa-solid fa-arrow-right-long"></i> '+docu.data().Till+'</span>';

    if(docu.data().TotalNumberOfTravellers==1){
      div5.innerHTML=' <i class="fa-solid fa-user"></i> <span style="color:gray">'+docu.data().TotalNumberOfTravellers+' Traveller</span>';
    }else if(docu.data().TotalNumberOfTravellers>1){
      div5.innerHTML=' <i class="fa-solid fa-user"></i> <span style="color:gray">'+docu.data().TotalNumberOfTravellers+' Travellers</span>';
    }
    
    div6.innerHTML='<p style="font-size: 16px;font-weight:400;">'+docu.data().AdditionalInformation+'</p>';


    div7.setAttribute('class','col-md-3 d-flex justify-content-center');
    image.setAttribute('style','width:140px;height:140px;border-radius:50%;object-fit:cover;align-items: center;background-position:center;');
    console.log(docum.data());
    if(docum.data().ProfileLink!=""){
      image.setAttribute('src',docum.data().ProfileLink);
    }else if(docum.data().Gender=="male" || docum.data().Gender=="others"){
      image.setAttribute('src','/images/My_profile_images/img_avatar.png');
    }else if(docum.data().Gender=="female"){
      image.setAttribute('src','/images/My_profile_images/img_avatar2.png');
    }
    
    h6Name.innerHTML=docum.data().FirstName+' '+docum.data().LastName;
    
  })

  mainDiv.appendChild(rowDiv);
  rowDiv.appendChild(colDiv);
  colDiv.appendChild(div1);
  div1.appendChild(h6);
  div1.appendChild(div8);
  div8.appendChild(button);
  if(req==2){
    div8.appendChild(button1);
  }
  
  colDiv.appendChild(div2);
  div2.appendChild(div3);
  div2.appendChild(div4);
  div2.appendChild(div5);
  colDiv.appendChild(div6);
  rowDiv.appendChild(div7);
  div7.appendChild(div9);
  div9.appendChild(image);
  div7.appendChild(h6Name);
  div7.appendChild(viewProfile);
  
  if(req==1){
    const rowList=document.querySelector(".insert");rowList.appendChild(mainDiv);
  }else if(req==2){
    const rowList=document.querySelector(".requestInsert");
    rowList.appendChild(mainDiv);
  }
  

  
}

//on Auth State changed code
let globalEmail="";    
    
      onAuthStateChanged(auth, (user) => {
      if (!user) {
        
        window.location.href="/login/login.html";
        
      } else if(user){
          globalEmail=user.email;
          getUserData(globalEmail,);
      }
    });
     
   // Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// let img=document.getElementById('img1');
let file={};
var fileName="";

img1.onchange = function(event){
  file=event.target.files[0];
  fileName=event.target.files[0].name;
  console.log(file);
  console.log(fileName);
}


document.getElementById('upload1').addEventListener('click',(e)=>{
  e.preventDefault();
})


upload1.addEventListener('click',(e)=>{
  // e.preventDefault()
  if(document.getElementById('img1').value==""){
    alert("Please select an image to upload");
    return;
  }else{
    const storageRef= ref(storage,'users/'+globalEmail);
  const uploadTask=uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed',(snapshot) => { const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  // console.log('Upload is ' + Math.floor(progress) + '% done');
  uploadingBtn(progress);
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }},(error)=>{
    alert(error);
  },()=>{
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      addDownloadLink(downloadURL);
    });
    console.log('Uploaded a blob or file!');
  });

  document.getElementById('cancelUpload').addEventListener('click',()=>{
    uploadTask.cancel();
  })
  }
  
})
document.getElementById('pgbar').style.display='none';

function uploadingBtn(prog){
  document.getElementById('pgbar').style.display='block';
  document.getElementById('myProgress').innerHTML=Math.floor(prog)+'% uploaded';
  document.getElementById('myProgress').value=prog;
  document.getElementById('upload1').style.display='none';
  document.getElementById('deletePic').style.display='none';
}

function addDownloadLink(link){
  updateDoc(doc(db,"users",globalEmail),{
    ProfileLink: link
  }).then(()=>{
    location.reload();
  })
}
document.getElementById('deleting').style.display='none';
deletePic.addEventListener('click',(e)=>{
  e.preventDefault();
  document.getElementById('deletePic').style.display='none';
  document.getElementById('upload1').style.display='none';
  document.getElementById('deleting').style.display='block';
  updateDoc(doc(db,"users",globalEmail),{
    ProfileLink: ''
  }).then(()=>{
    location.reload();
  })
})



