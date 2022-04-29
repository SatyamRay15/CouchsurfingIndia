        // Import the functions you need from the SDKs you need
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
      

    //function for logout
      logout.addEventListener('click',(e)=>{
        auth.signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      // An error happened.
      alert(error);
    });
})

let globalEmail="";    
    
onAuthStateChanged(auth, (user) => {
if (!user) {
  
  window.location.href="/login/login.html";
  
} else if(user){
  // User is signed out
  // ...
  // console.log(user.email);
  const email=user.email;
    globalEmail=user.email;
    var Id=localStorage.getItem("Id");
    getUserData(Id);
}
});

function getUserData(id){
  console.log(id);
  getDoc(doc(db,"users",globalEmail,"RequestingForStay",id+'requesting')).then(docu=>{
      if(docu.exists()){
        if(docu.data().Status=="Pending"){
          document.getElementById("ReqstForStay").innerHTML="Requested";
          document.getElementById("ReqstForStay").disabled=true;
          document.getElementById("ReqstForStay").setAttribute('class','primary ghost')
        }else if(docu.data().Status=="Accepted"){
          document.getElementById("ReqstForStay").innerHTML="Accepted";
          document.getElementById("ReqstForStay").disabled=true;
          document.getElementById("ReqstForStay").setAttribute('class','primary ghost');
          getDoc(doc(db,"users",id)).then(docSn=>{
            document.getElementById('add').innerHTML='<b>Email:</b> '+docSn.data().EmailId+'<br/>'+"<b>Phone Number: </b>"+docSn.data().PhoneNumber;
          })
        }
      }else{
        console.log("No document there");
      }
  })
  getDoc(doc(db,"users",id)).then(docSnap=>{
    if(docSnap.exists()){
      var name=docSnap.data().FirstName;
      document.getElementById("setProfile").innerHTML=name+"'s Profile";
      document.getElementById("setHome").innerHTML=name+"'s Home";
      document.getElementById("aboutHead").innerHTML="About "+name;
      document.getElementById("name").innerHTML=docSnap.data().FirstName+" "+docSnap.data().LastName;
      if(docSnap.data().Address){
        document.getElementById("add").innerHTML=docSnap.data().Address['city']+" "+docSnap.data().Address['state'];
      }
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
       //this is for home section
       document.getElementById("nameHome").innerHTML='<i class="fa-solid fa-user"></i> '+docSnap.data().FirstName+" "+docSnap.data().LastName;
       document.getElementById("ageHome").innerHTML='<i class="fa-solid fa-mars-stroke"></i> '+docSnap.data().Age+' '+docSnap.data().Gender;
      
       const address=docSnap.data().Address;
       // console.log(address);
       if(address){
         document.getElementById('locationHome').innerHTML='<i class="fa-solid fa-location-dot"></i> '+docSnap.data().Address['city']+', '+docSnap.data().Address['state']+', '+docSnap.data().Address['country'];
       }
       const edu=docSnap.data().Education;
       if(edu){
         document.getElementById('educationHome').innerHTML='<i class="fa-solid fa-book-open-reader"></i> '+edu;
       }
       const occ=docSnap.data().Occupation;
       if(occ){
         document.getElementById('occupationHome').innerHTML='<i class="fa-solid fa-toolbox"></i> '+occ;
       }
       const lan=docSnap.data().Language;
       if(lan){
         document.getElementById('languagesHome').innerHTML='<i class="fa-solid fa-comment"></i> '+lan;
       }    
        //this is for about me section
        
          var about=docSnap.data().AboutMe;
         var interest=docSnap.data().MyInterests;
         var teachLearn=docSnap.data().TeachLearnShare;
         var whyCouch=docSnap.data().WhyCouchSurfing;
         var amazingThing=docSnap.data().AmazingThingDone;
         var stateVisited=docSnap.data().StatesVisited;

         if(about){
           document.getElementById('about').innerHTML='<td>'+about+'</td>';
         }
         if(whyCouch){
           document.getElementById('whycouch').innerHTML='<td><b>Why I am on Couchsurfing?</b><br/>'+whyCouch+'</td>';
         }
         if(interest){
           document.getElementById('myInterest').innerHTML='<td><b>My Interests</b><br/>'+interest+'</td>';
         }
         if(amazingThing){
           document.getElementById('oneamazingthing').innerHTML='<td><b>One Amazing Thing I"ve Done</b><br/>'+amazingThing+'</td>';
         }
         if(teachLearn){
           document.getElementById('teachlearnshare').innerHTML='<td><b>What can I Teach, Learn and Share?</b><br/>'+teachLearn+'</td>';
         }
         if(stateVisited){
           document.getElementById('statesvisited').innerHTML='<td><b>States I have visited till now.</b><br/>'+stateVisited+'</td>';
         } 

     //this code is for my home details section
     getDoc(doc(db,"users",id,"HostData",id)).then(docSnap=>{
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

      //this for rendering home pics
      document.getElementById('spin').style.display='block';
      document.getElementById('noHomePic').style.display='inline';
      const hP=query(collection(db,"users",id,"Images"),orderBy("Time","desc"));
      document.getElementById('AddHome').style.display='none';

      getDocs(hP).then((docu)=>{
        docu.forEach((doc)=>{
         document.getElementById('noHomePic').style.display="none";
         document.getElementById('spin').style.display='none';
         renderHomePics(doc,id);
        })
      })

      //this section of code is for rendering following
      getDocs(query(collection(db,"users",id,"following"))).then((docu)=>{
        docu.forEach((docSnap)=>{
          if(docSnap.exists()){
            document.getElementById("nothing").style.display="none";
            getDoc(doc(db,"users",docSnap.data().Following),orderBy('timestamp','desc')).then(docSnap1=>{
              if(docSnap1.exists()){
              var foll=1;
              renderFollowing(docSnap1,id,foll);
              }else{
                document.getElementById('nothing').style.display='inline';
              }
           })
         
          }
          
        })
      })

      //this section of code is for rendering followers
      getDocs(query(collection(db,"users",id,"followers"))).then((docu)=>{
        docu.forEach((docSnap)=>{
          if(docSnap.exists()){
            document.getElementById("nofollowers").style.display="none";
            getDoc(doc(db,"users",docSnap.data().Followers),orderBy('timestamp','desc')).then(docSnap1=>{
              if(docSnap1.exists() && docSnap1.data().EmailId!=globalEmail){
                var foll=2;
                renderFollowing(docSnap1,id,foll);
              }else{
                document.getElementById("nofollowers").style.display='inline';
              }
            })
          }
        })
      })
    })

    //this is for sending request to the user
    
    var fromDate="";
    var today= new Date();
    var date=today.getFullYear()+'-'+'0'+(today.getMonth()+1)+'-'+today.getDate();
    var datSet=document.getElementById("fromDate");
    datSet.setAttribute('min',date);
    datSet.addEventListener("change",(e)=>{
      fromDate=document.getElementById("fromDate").value;
      var datSet1=document.getElementById("toDate");
      datSet1.setAttribute('min',fromDate);
    })
    const sendRequest=document.getElementById("sendRequest");
    document.getElementById('sending').style.display='none';
    //eventlistener
    sendRequest.addEventListener('click',(e)=>{
    var city=document.getElementById("city").value;
    var district=document.getElementById("district").value;
    var state=document.getElementById("state").value;
    var fromDat=new Date(fromDate);
    var from=String((fromDat.getMonth()+1)).padStart(2,'0')+'-'+String(fromDat.getDate()).padStart(2,'0')+'-'+fromDat.getFullYear();
    var toDate=document.getElementById("toDate").value;
    var toDat=new Date(toDate);
    var to=String((toDat.getMonth()+1)).padStart(2,'0')+'-'+String(toDat.getDate()).padStart(2,'0')+'-'+toDat.getFullYear();
    
    var noOfTravellers=document.getElementById("noOfTravellers").value;
    var additionalInfo=document.getElementById("additionalInfo").value;

      if(city==""){
        alert("Please add city");
        document.getElementById("city").style.border='1px solid red';
      }else if(state==""){
        alert("Please add state");
        document.getElementById("state").style.border='1px solid red';
      }else if(fromDate==""){
        alert("Please select date input");
        document.getElementById("fromDate").style.border='1px solid red';
      }else if(toDate==""){
        alert("Please select to input");
        document.getElementById("toDate").style.border='1px solid red';
      }else if(noOfTravellers==""){
        alert("Please add number of travellers");
        document.getElementById("noOfTravellers").style.border='1px solid red';
      }else if(additionalInfo==""){
        alert("Please add additional information");
        document.getElementById("additionalInfo").style.border='1px solid red';
      }else{
        getDoc(doc(db,"users",globalEmail)).then(docu=>{
          document.getElementById('sendRequest').style.display='none';
          document.getElementById('cancelBtn').style.display='none';
          document.getElementById('sending').style.display='block';
          if(district==""){
            district="";
          }
        setDoc(doc(db,"users",id,"RequestForStay",globalEmail+"request"),{
          City: city,
          District: district,
          State: state,
          From: from,
          Till: to,
          TotalNumberOfTravellers: noOfTravellers,
          AdditionalInformation: additionalInfo,
          Status: "Pending",
          timestamp: serverTimestamp()
        }).then((docu)=>{
          console.log("data added successfully");
        })
        setDoc(doc(db,"users",globalEmail,"RequestingForStay",id+"requesting"),{
          City: city,
          District: district,
          State: state,
          From: from,
          Till: to,
          TotalNumberOfTravellers: noOfTravellers,
          AdditionalInformation: additionalInfo,
          Status: "Pending",
          timestamp: serverTimestamp()
        }).then((docu)=>{
          console.log("data added successfully");
        })
        console.log(docSnap.data().FirstName);
        setDoc(doc(db,"users",id,"notification",globalEmail+"request"),{
          Heading: "Request For Stay",
          Notification: docu.data().FirstName+' '+docu.data().LastName+' requested for a stay from '+from+' to '+to,
          ImageLink: docu.data().ProfileLink,
          Gender: docu.data().Gender,
          timestamp: serverTimestamp()
        },{ capital: true }, { merge: true }).then(()=>{
          getDoc(doc(db,"users",id,"notification","numbers")).then(e=>{
            if(e.exists()){
              var num=e.data().Number;
              if(num=="undefined"){
                setDoc(doc(db,"users",id,"notification","numbers"),{
                  Number: 1
                }).then(e=>{
                  window.location.reload();
                })
              }else if(num==0){
                setDoc(doc(db,"users",id,"notification","numbers"),{
                  Number: 1
                }).then(e=>{
                  window.location.reload();
                })
              }else if(num>=0){
                setDoc(doc(db,"users",globalEmail,"notification","numbers"),{
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
    })
  
  } else {
            console.log("No such document!");
          }
  })
}

//this section is for rendering Home Pics
function renderHomePics(docu,Id){
  
  document.getElementById('AddHome').style.display='inline';
  let mainDiv=document.createElement('div');
  let img=document.createElement('img');

  mainDiv.setAttribute('class','col-md-4');
  mainDiv.setAttribute('style','display:flex;justify-content:center;padding:10px');
  img.setAttribute('class','profilepicsec img-thumbnail img-responsive shadow-1-strong rounded btn');
  img.setAttribute('alt','Home Pictures');
  img.setAttribute('src',docu.data().ProfileLink);
  img.setAttribute('data-mdb-img',docu.data().ProfileLink);
  
  img.setAttribute('data-toggle','modal');
  img.setAttribute('data-target','#modalImages');
  // btn.textContent='+ Add More Images';

  mainDiv.appendChild(img);
  
  const divMain=document.querySelector('.addNewPic');

  divMain.appendChild(mainDiv);

  getDoc(doc(db,"users",Id,"Images",docu.id)).then((docSnap)=>{
    if(docSnap.exists()){
      img.setAttribute('id',docu.id+"img");
      // image.setAttribute('src','null');
      const butt=document.getElementById(docu.id+'img');
      butt.addEventListener('click',(e)=>{
          document.getElementById('HomeModalImage').src=docu.data().ProfileLink;
      })
    }
  })
}

//this section for rendering following
function renderFollowing(docu,id,foll){
  let mainDiv=document.createElement('div');
  let Div1=document.createElement('div');
  let div1=document.createElement('div');
  let div2=document.createElement('div');
  let image=document.createElement('img');
  let div3=document.createElement('div');
  let div4=document.createElement('div');
  let h5=document.createElement('h5');
  let h6=document.createElement('h6');

  mainDiv.setAttribute('class','container col-md-6');
  Div1.setAttribute('class','card btn');
  
  div1.setAttribute('class','row');
  div2.setAttribute('class','col-md-4 col-sm-4 col-4');
  image.setAttribute('class','img-resposive');
  image.setAttribute('style','width:80px;height:80px;border-radius:50%;border:1px solid gray;background-position: center;object-fit:cover;');
  div4.setAttribute('style','padding:5px');
  if(docu.data().ProfileLink){
    image.setAttribute('src',docu.data().ProfileLink);
  }else if(docu.data().Gender=="male" || docu.data().Gender=='others'){
    image.setAttribute('src','/images/My_profile_images/img_avatar.png');
  }else if(docu.data().Gender=='female'){
    image.setAttribute('src','/images/My_profile_images/img_avatar2.png');
  }
  div3.setAttribute('class','col-md-8 col-sm-8 col-8');
  h5.textContent=docu.data().FirstName+" "+docu.data().LastName;
  if(docu.data().Address){
    h6.textContent=docu.data().Address['state']+" "+docu.data().Address['city'];
    h6.setAttribute('style','font-size:15px;');
  }
  getDoc(doc(db,"users",id,"following","Following")).then(docSnap=>{
    
      Div1.setAttribute('id',docu.id+"new");
      const viewProf=document.getElementById(docu.id+'new');
      viewProf.addEventListener('click',(e)=>{
        localStorage.setItem("Id",docu.id);
        window.location.reload();
        
      })
   
  })

  mainDiv.appendChild(Div1);
  Div1.appendChild(div1);
  div1.appendChild(div2);
  div2.appendChild(image);
  div1.appendChild(div3);
  div3.appendChild(div4);
  div4.appendChild(h5);
  div4.appendChild(h6);

  var Div;
  if(foll=='1'){
    Div=document.querySelector('.folrow');
  }else if(foll='2'){
    Div=document.querySelector('.followerow');
  }
  

  Div.appendChild(mainDiv);
}

