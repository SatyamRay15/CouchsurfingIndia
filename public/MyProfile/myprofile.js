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

      //function to display details in my profile section
      function getUserData(email){
        getDoc(doc(db, "users", email)).then(docSnap => {
          if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data().FirstName);
            document.getElementById("name").innerHTML=docSnap.data().FirstName+" "+docSnap.data().LastName;
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

          //this is for home section
          document.getElementById("nameHome").innerHTML='<i class="fa-solid fa-user"></i> '+docSnap.data().FirstName+" "+docSnap.data().LastName;
          document.getElementById("ageHome").innerHTML='<i class="fa-solid fa-mars-stroke"></i> '+docSnap.data().Age+' '+docSnap.data().Gender;
          document.getElementById('emailHome').innerHTML='<i class="fa-light fa fa-envelope-open-text"></i> '+docSnap.data().EmailId;
          document.getElementById('phoneHome').innerHTML='<i class="fa-solid fa-phone"></i> '+docSnap.data().PhoneNumber;
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
          try{
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
            
          
          }catch(error){
            console.log(error);
          }
         
             //this is for profile overview section
             document.getElementById("nameProfile").innerHTML='NAME: '+docSnap.data().FirstName+" "+docSnap.data().LastName;
             document.getElementById("ageProfile").innerHTML='AGE/GENDER: '+docSnap.data().Age+' '+docSnap.data().Gender;
             document.getElementById('emailProfile').innerHTML='EMAIL: '+docSnap.data().EmailId;
             document.getElementById('phoneProfile').innerHTML='PHONE NUMBER: '+docSnap.data().PhoneNumber;
             
             if(address){
               document.getElementById('locationProfile').innerHTML='ADDRESS: '+docSnap.data().Address['city']+', '+docSnap.data().Address['state']+', '+docSnap.data().Address['country'];
             }
            
             if(edu){
               document.getElementById('educationProfile').innerHTML='EDUCATION: '+edu;
             }
             
             if(occ){
               document.getElementById('occupationProfile').innerHTML='OCCUPATION: '+occ;
             }
             
             if(lan){
               document.getElementById('languagesProfile').innerHTML='LANGUAGES: '+lan;
             }
            
          if(lan){
            document.getElementById('languagesProfile').innerHTML='LANGUAGES: '+lan;
          }


          //this is for profile section image part
          if(lin!=""){
            document.querySelector('.profilepicsec').src=lin;
          }

        })

        //this for getting home pics
        document.getElementById('noHomePic').style.display='inline';
        const hP=query(collection(db,"users",email,"Images"),orderBy("Time","desc"));
        document.getElementById('AddHome').style.display='none';

        getDocs(hP).then((docu)=>{
          docu.forEach((doc)=>{
           document.getElementById('noHomePic').style.display="none";
           renderHomePics(doc);
          })
        })

        //this is for getting notification
        document.getElementById('noNotification').style.display='block';
        const q = query(collection(db, "users",email,"notification"),orderBy("timestamp","desc"));
        
        getDocs(q).then((doc2)=>{
             doc2.forEach((doc)=>{
              document.getElementById('noNotification').style.display='none';
              renderNotification(doc);
              // console.log(doc);
        })

        //this is for getting friends data
        document.getElementById('nothing').style.display='block';
        const fri=query(collection(db,"users",email,"following"));
        

        getDocs(fri).then((doc2)=>{  
          doc2.forEach((docu)=>{
            if(docu.exists()){
              document.getElementById('nothing').style.display='none';
              getDoc(doc(db,"users",docu.data().Following),orderBy('timestamp','desc')).then(docSnap=>{
                var foll=1;
                renderFollowingList(docSnap,foll);
             })
            }
          })
        }) 

        getDocs(query(collection(db,"users",email,"followers"))).then((doc2)=>{  
          doc2.forEach((docu)=>{
            if(docu.exists()){
              document.getElementById('nothing1').style.display='none';
              getDoc(doc(db,"users",docu.data().Followers),orderBy('timestamp','desc')).then(docSnap=>{
                var foll=2;
                renderFollowingList(docSnap,foll);
             })
            }
          })
        }) 
    })

    //this section is for showing following list
    function renderFollowingList(docu,foll){
      let maindiv=document.createElement('div');
      let cardDiv=document.createElement('div');
      let bodyDiv=document.createElement('div');
      let image=document.createElement('img');
      let div=document.createElement('div');
      let nameH5=document.createElement('h5');
      let locP=document.createElement('p');
      let locspan=document.createElement('span');
      let occspan=document.createElement('span');
      let breakline=document.createElement('br');
      let buttonDiv=document.createElement('div');
      let button=document.createElement('button');
      let btn=document.createElement('button');

      maindiv.setAttribute('class','col-md-6 col-xl-4');
      maindiv.setAttribute('id',docu.data().EmailId+'main');
      cardDiv.setAttribute('class','card');
      cardDiv.setAttribute('style','background-color: #1F1A36;');
      bodyDiv.setAttribute('class','card-body');
      const ava=docu.data().Gender;
      const link=docu.data().ProfileLink;
      if(link!=""){
        image.setAttribute('src',link);
        // document.getElementById('pict').src=link;
      }else if(ava=="male" || ava=="others"){
        image.setAttribute('src','/images/My_profile_images/img_avatar.png');
      }else if(ava=='female'){
        image.setAttribute('src','/images/My_profile_images/img_avatar2.png');
      }
      // image.setAttribute('src',docu.data().ProfileLink);
      image.setAttribute('class','avatar avatar-xl mr-3');
      div.setAttribute('style','color: white;margin-bottom: 0px;');
      nameH5.textContent=docu.data().FirstName+' '+docu.data().LastName;
      const addre=docu.data().Address;
      if(addre){
        locspan.textContent="Location: "+docu.data().Address['city'];
      }else{
        locspan.textContent="Location: Null";
      }
      
      occspan.textContent="Occuptation: "+docu.data().Occupation;
      buttonDiv.setAttribute('class','button');
      button.setAttribute('class','btn btn-sm primary');
      button.textContent="View Profile";
      getDoc(doc(db,"users",globalEmail)).then(e=>{
        button.setAttribute('id',docu.id+'view');
        const viewPro=document.getElementById(docu.id+"view");
        viewPro.addEventListener('click',(e)=>{
          localStorage.setItem("Id",docu.id);
          window.location.href='/components/UserProfileComponent/UserProfile.html';
        })
      })
      
      
      
      getDoc(doc(db,"users",globalEmail,"following",docu.data().EmailId)).then((docSnap)=>{
        // console.log(docSnap.id);
        if(docSnap.exists){
          btn.setAttribute('class','btn btn-sm primary');
          btn.textContent='Unfollow';
          btn.setAttribute('id',docu.data().EmailId);
          const unfollow1=document.getElementById(docu.data().EmailId);
      if(unfollow1){
        unfollow1.addEventListener('click',(e)=>{
          document.getElementById(docu.data().EmailId+'main').style.display='none';
          deleteDoc(doc(db, "users",globalEmail,"following",docu.data().EmailId ));
          setDoc(doc(db,"users",globalEmail,"notification",docu.data().EmailId),{
            Heading: "Unfollow",
            Notification: "You unfollowed "+docu.data().FirstName+' '+docu.data().LastName,
            ImageLink: docu.data().ProfileLink,
            timestamp: serverTimestamp()
          },{ capital: true }, { merge: true }).then(()=>{
            console.log("Document added successfully");
            location.reload();
          })
          setDoc(doc(db,"users",docu.data().EmailId,"notification",globalEmail),{
            Heading: "Unfollow",
            Notification: docu.data().FirstName+' '+docu.data().LastName+" unfollowed you",
            ImageLink: docu.data().ProfileLink,
            timestamp: serverTimestamp()
          },{ capital: true }, { merge: true }).then(()=>{
            console.log("Document added successfully");
          })

          const docRef1=doc(db,"users",globalEmail,"notification","numbers");
          // console.log(docRef);
          getDoc(docRef1).then(docSnap=>{
            if(docSnap.exists()){
               // console.log();
            var num=docSnap.data().Number;
            // console.log(num);
            if(num=='undifined'){
              // console.log(num);
              setDoc(doc(db,"users",globalEmail,"notification","numbers"),{
                Number: 1
              })
            }else if(num>=0){
              // console.log(num);
              setDoc(doc(db,"users",globalEmail,"notification","numbers"),{
                Number: num+1
              })
            }else{
              setDoc(doc(db,"users",globalEmail,"notification","numbers"),{
                Number: 1
              })
            }
            }else{
              setDoc(doc(db,"users",globalEmail,"notification","numbers"),{
                Number: 1
              })
            }
           
           
          })
      
          const docRef2=doc(db,"users",docu.data().EmailId,"notification","numbers");
        
          getDoc(docRef2).then(docSnap=>{
            if(docSnap.exists()){
               // console.log();
            var num=docSnap.data().Number;
            // console.log(num);
            if(num=='undifined'){
              // console.log(num);
              setDoc(doc(db,"users",globalEmail,"notification","numbers"),{
                Number: 1
              }).then(e=>{
                location.reload();
              })
            }else if(num>=0){
              // console.log(num);
              setDoc(doc(db,"users",globalEmail,"notification","numbers"),{
                Number: num+1
              }).then(e=>{
                location.reload();
              })
            }else{
              setDoc(doc(db,"users",globalEmail,"notification","numbers"),{
                Number: 1
              }).then(e=>{
                location.reload();
              })
            }
            }else{
              setDoc(doc(db,"users",globalEmail,"notification","numbers"),{
                Number: 1
              }).then(e=>{
                location.reload();
              })
            }
           
           
          })
      })
      }
        }
      })
      
      

      maindiv.appendChild(cardDiv);
      cardDiv.appendChild(bodyDiv);
      bodyDiv.appendChild(image);
      cardDiv.appendChild(div);
      div.appendChild(nameH5);
      div.appendChild(locP);
      locP.appendChild(locspan);
      locP.appendChild(breakline);
      locP.appendChild(occspan);
      div.appendChild(buttonDiv);
      buttonDiv.appendChild(button);
      buttonDiv.appendChild(btn);
      
      var follList;
      if(foll==1){
        follList=document.querySelector('.folrow');
      }else if(foll==2){
        follList=document.querySelector('.followerRow');
      }
      follList.appendChild(maindiv);
    }

      //this section is for showing number of new       notifications
      document.getElementById('countNot').style.display='none';
      const numNoti=doc(db,"users",email,"notification","numbers");
      getDoc(numNoti).then(docSnap=>{
        if(docSnap.exists()){
          var countt=docSnap.data().Number;
        if(countt>0){
          document.getElementById('countNot').style.display='inline';
          document.getElementById('countNot').innerHTML="New";
        }
        }
        
        
      })
      deleteNot.addEventListener('click',(e)=>{
        setDoc(doc(db,"users",email,"notification","numbers"),{
          Number: 0
        }).then(e=>{
          document.getElementById('countNot').style.display='none';
        })
      })
}

//this section of code is for rendering Notification in myprofile section
function renderNotification(docu){
  let maindiv=document.createElement('div');
  let imgdiv=document.createElement('div');
  let img=document.createElement('img');
  let div=document.createElement('div');
  let divhe=document.createElement('div');
  let divcont=document.createElement('div');
  let deleteDiv=document.createElement('div');
  let delNotibtn=document.createElement('button');
  let deletenotification=document.createElement('i');
  let delDiv=document.createElement('div');

  maindiv.setAttribute('class','p-3 align-items-center bg-light border-bottom osahan-post-header row');
 
  imgdiv.setAttribute('class','dropdown-list-image mr-3 d-flex')
  img.setAttribute('class','rounded-circle');
  const ava=docu.data().Gender;
  // console.log(ava);
  var link=docu.data().ImageLink;
  if(link!=""){
    img.setAttribute('src',link);
  }else if(ava=="male" || ava=="others"){
    img.setAttribute('src','/images/My_profile_images/img_avatar.png');
  }else if(ava=='female'){
    img.setAttribute('src','/images/My_profile_images/img_avatar2.png');
  }else{
    img.setAttribute('src','/images/My_profile_images/alt.png');
  }
  img.setAttribute('height','50px');
  img.setAttribute('width','50px');
  img.setAttribute('style','background-position: center;object-fit: cover;')
  div.setAttribute('class','font-weight-bold mr-3');
  divhe.setAttribute('class','text-truncate');
  divhe.textContent=docu.data().Heading;
  divcont.setAttribute('class','small');
  divcont.textContent=docu.data().Notification;
  deleteDiv.setAttribute('class','d-flex col-6');
  delNotibtn.setAttribute('class','btn');
  
  delNotibtn.setAttribute('data-toggle','tooltip');
  delNotibtn.setAttribute('title','Delete Notification');
  deletenotification.setAttribute('class','fa-solid fa-trash');
  delDiv.setAttribute('class','d-flex justify-content-end col-6');
 
  getDoc(doc(db,"users",globalEmail,"notification",docu.id)).then(snapShot=>{
    if(snapShot.exists()){
        maindiv.setAttribute('id',docu.id+"main");
        delNotibtn.setAttribute('id',docu.id+"delNoti");
        const dele=document.getElementById(docu.id+'delNoti');
        if(dele){
            dele.addEventListener('click',(e)=>{
              console.log(docu.id);
              const del=document.getElementById(docu.id+"main").style.display='none';
              console.log(del);
              
              deleteDoc(doc(db,"users",globalEmail,"notification",docu.id)).then(e=>{
                
                console.log("document deleted succesfully");
              })
            })
        }
    }
  })
  
  

  maindiv.appendChild(deleteDiv);
  deleteDiv.appendChild(imgdiv);
  imgdiv.appendChild(img);
  deleteDiv.appendChild(div);
  // div.appendChild(deletenotification);
  div.appendChild(divhe);
  div.appendChild(divcont);
  maindiv.appendChild(delDiv);
  delDiv.appendChild(delNotibtn);
  delNotibtn.appendChild(deletenotification);

  const setNotification=document.querySelector('.notification');

  setNotification.appendChild(maindiv);

}

//this section is for rendering Home Pics
function renderHomePics(docu){
  document.getElementById('AddHome').style.display='inline';
  let mainDiv=document.createElement('div');
  let img=document.createElement('img');
  // let btn=document.createElement('button');

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
  // mainDiv.appendChild(btn);

  
  

  const divMain=document.querySelector('.addNewPic');

  divMain.appendChild(mainDiv);
  // let image=document.createElement('img');

  // image.setAttribute('src',"");
  // image.setAttribute('style','width:100%;border-radius:0;position:relative');
  
  // const mainImageDiv=document.querySelector('.modal-content-images');
  
  // mainImageDiv.appendChild(image);

  getDoc(doc(db,"users",globalEmail,"Images",docu.id)).then((docSnap)=>{
    if(docSnap.exists()){
      img.setAttribute('id',docu.id+"img");
      // image.setAttribute('src','null');
      const butt=document.getElementById(docu.id+'img');
      butt.addEventListener('click',(e)=>{
          document.getElementById('HomeModalImage').src=docu.data().ProfileLink;
      })
    }
  })

  // let mainDiv2=document.createElement('div');
  // let image=document.createElement('img');

  // image.setAttribute('style','width:100%;border-radius:0;position: relative;');
  // image.setAttribute('src',docu.data().ProfileLink);

  // const divImage=document.querySelector('.modal-content-images');

  // divImage.appendChild(image);
}


    
      let globalEmail="";    
    
      onAuthStateChanged(auth, (user) => {
      if (!user) {
        
        window.location.href="/login/login.html";
        
      } else if(user){
        // User is signed out
        // ...
        // console.log(user.email);
        const email=user.email;
          getUserData(email);
          globalEmail=user.email;
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

//code for uploading profile picture
img1.onchange = function(event){
  file=event.target.files[0];
  fileName=event.target.files[0].name;
  // console.log(file);
  // console.log(fileName);
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
    const storageRef= ref(storage,'users/'+globalEmail+'/'+'profilepic/'+fileName);
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
  document.getElementById('pgbar').style.display='inline';
  document.getElementById('progressValue').innerHTML=Math.floor(prog)+'% uploaded';
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

//code for uploading more pictures


img2.onchange=function(event){
  file=event.target.files[0];
  fileName=event.target.files[0].name;
  console.log(file);
  console.log(fileName);
}

document.getElementById('uploadMorePics').addEventListener('click',(e)=>{
  e.preventDefault();
})

uploadMorePics.addEventListener('click',(e)=>{
  if(document.getElementById('img2').value==""){
    alert("Please select an image to upload");
    return;
  }else{ 
  const storageRef= ref(storage,'users/'+globalEmail+'/'+'MorePics/'+fileName);
  const uploadTask=uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed',(snapshot) => { const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  // console.log('Upload is ' + Math.floor(progress) + '% done');
  uploadingBar(progress);
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
      addMoreDownloadLink(downloadURL);
    });
    console.log('Uploaded a blob or file!');
  });

  document.getElementById('cancelUpl').addEventListener('click',()=>{
    uploadTask.cancel();
  })
  }
})

document.getElementById("progbar").style.display='none';
function uploadingBar(prog){
  console.log(prog);
  document.getElementById('uploadMorePics').style.display='none';
  document.getElementById("progbar").style.display="inline";
  document.getElementById('pgValue').innerHTML=Math.floor(prog)+'% uploaded';
  document.getElementById('myProgressBar').value=prog;
}

function addMoreDownloadLink(link){
  setDoc(doc(db,"users",globalEmail,"Images",fileName),{
    ProfileLink: link,
    Time: serverTimestamp()
  }).then(()=>{
    location.reload();
  })
}





