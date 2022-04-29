import { getFirestore,collection, getDocs, query, where,updateDoc, doc,setDoc,getDoc,serverTimestamp  } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js";

       const db=getFirestore();
       const auth= getAuth();
       
       let globalEmail='';

    // if(user!==null){
    //   console.log("Hi");
    // }
function stat(email){
  if(email){
     const q = query(collection(db, "users"), where("EmailId", "!=",email));
     const querySnapshot =  getDocs(q).then((doc1)=>
      doc1.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        renderPost(doc);
        // console.log(doc.id, " => ", doc.data());
      })
     )

  }else{
    const q = query(collection(db, "users"));
    const querySnapshot=getDocs(q).then((doc2)=>{
      doc2.forEach((doc)=>{
        renderPost(doc);
      })
    })
  }
}

  


  



//create element and render post
function renderPost(docu){
  let div = document.createElement('div');
  let span = document.createElement('span');
  let image = document.createElement('img');
  let userName = document.createElement('h3');
  let h6 = document.createElement('h6');
  let occupation = document.createElement('p');
  let divButton =document.createElement('div');
  let button=document.createElement('button');
  let butt=document.createElement('button');
  let about=document.createElement('div');
  let abth6=document.createElement('h6');
  let abtdetail=document.createElement('p');

  div.setAttribute('data-id',docu.id);
  div.setAttribute('class','card-container');
  span.setAttribute('class','pro');
  span.textContent="VERIFIED";
  image.setAttribute('class','round pic');
  image.setAttribute('id','pict');
  image.setAttribute('style','height:20vw;width:20vw;background-position: center;object-fit: cover;');
  image.setAttribute('src','/images/My_profile_images/200.gif');
  
  userName.setAttribute('id','name');
  userName.textContent=docu.data().FirstName+' '+docu.data().LastName;
  const address=docu.data().Address;
  if(address){
    h6.textContent="Location: "+docu.data().Address['city']+' '+docu.data().Address['country'];
  }else{
    h6.textContent="Location: Null";
  }
  const occ=docu.data().Occupation;
  if(occ){
    occupation.textContent="Occupation: "+docu.data().Occupation;
  }else{
    occupation.textContent="Occupation: Null";
  }
  divButton.setAttribute('class','buttons');
  button.setAttribute('class','primary');
  button.textContent="View Profile";
  button.setAttribute('id',docu.id+"img");
  button.setAttribute('data-toggle','modal');
  button.setAttribute('data-target','#Modal');
  button.setAttribute('data-whatever','@mdo');
  butt.setAttribute('class','primary');
  butt.textContent="Follow User";
  butt.setAttribute('id','none');
  
  about.setAttribute('class','skills');
  abth6.textContent="About";
  abtdetail.textContent=docu.data().AboutMe;


 
  div.appendChild(span);
  div.appendChild(image);
  div.appendChild(userName);
  div.appendChild(h6);
  div.appendChild(occupation);
  div.appendChild(divButton);
  divButton.appendChild(button);
  const docRef=doc(db,"users",globalEmail,"following",docu.data().EmailId);
  
  getDoc(docRef).then((docSnap)=>{
    if(docSnap.exists()){
      butt.setAttribute("class","primary ghost following");
      butt.setAttribute('id',docu.data().EmailId+"following");
      butt.textContent="Following";
      divButton.appendChild(butt);
      // console.log("Document data:",);
      const idfollowing=document.getElementById(docu.data().EmailId+"following");
      // console.log(idfollowing);
    }else{
       butt.setAttribute('id',docu.data().EmailId);
       divButton.appendChild(butt);
      const idfollow =document.getElementById(docu.data().EmailId);
      // console.log(idfollow);
  if(idfollow){
    idfollow.addEventListener('click',(e)=>{
    e.preventDefault();
    butt.setAttribute("class","primary ghost following");
    butt.setAttribute('id',docu.data().EmailId+"following");
    butt.textContent="Following";
    

    setDoc(doc(db,"users",globalEmail,"following",docu.data().EmailId),{
      Following: docu.data().EmailId,
      timestamp: serverTimestamp()
    },{ capital: true }, { merge: true }).then(()=>{
      console.log("Document added successfully");
    })
    setDoc(doc(db,"users",docu.data().EmailId,"followers",globalEmail),{
      Followers: globalEmail,
      timestamp: serverTimestamp()
    },{ capital: true }, { merge: true }).then(()=>{
      console.log("Document added successfully");
    })
    setDoc(doc(db,"users",globalEmail,"notification",docu.data().EmailId),{
      Heading: "New Following",
      Notification: "You started following "+docu.data().FirstName+' '+docu.data().LastName,
      ImageLink: docu.data().ProfileLink,
      Gender: docu.data().Gender,
      timestamp: serverTimestamp()
    },{ capital: true }, { merge: true }).then(()=>{
      console.log("Document added successfully");
    })
    setDoc(doc(db,"users",docu.data().EmailId,"notification",globalEmail),{
      Heading: "New Follower",
      Notification: docu.data().FirstName+' '+docu.data().LastName+" started following you.",
      ImageLink: docu.data().ProfileLink,
      Gender: docu.data().Gender,
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
   
    
  })
  }
    }
  })
  
  // divButton.appendChild(butt);
  // divButton.appendChild(btn);
  div.appendChild(about);
  about.appendChild(abth6);
  about.appendChild(abtdetail);
  
  const postList=document.querySelector('.cont');

  postList.appendChild(div);

  const ava=docu.data().Gender;
  var link=docu.data().ProfileLink;
  if(link!=""){
    image.setAttribute('src',link);
    document.getElementById('pict').src=link;
  }else if(ava=="male" || ava=="others"){
    image.setAttribute('src','/images/My_profile_images/img_avatar.png');
  }else if(ava=='female'){
    image.setAttribute('src','/images/My_profile_images/img_avatar2.png');
  }
  
  //Section for displaying view profile section
  const ProfileId=document.getElementById(docu.id+"img");
  ProfileId.addEventListener('click',(e)=>{
    const images=docu.data().ProfileLink;
    if(images){
      document.getElementById('modalImage').src=docu.data().ProfileLink;
    }else if(docu.data().Gender=='male' || docu.data().Gender=='others'){
      document.getElementById('modalImage').src="/images/My_profile_images/img_avatar.png";
    }else if(docu.data().Gender=='female'){
      document.getElementById('modalImage').src="/images/My_profile_images/img_avatar2.png";
    }
    
    document.getElementById('heading').innerHTML=docu.data().FirstName+"'s Profile Details";
    document.getElementById('nameProfile').innerHTML="Name: "+docu.data().FirstName+" "+docu.data().LastName;
    document.getElementById('ageProfile').innerHTML="Age/Gender: "+docu.data().Age+" "+docu.data().Gender;
    const add=docu.data().Address;
    if(add){
      document.getElementById('locationProfile').innerHTML="Location: "+docu.data().Address['city'];
    }else{
      document.getElementById('locationProfile').innerHTML="Location: Null";
    }
    document.getElementById('occupationProfile').innerHTML="Occupation: "+docu.data().Occupation;
    document.getElementById('educationProfile').innerHTML="Education: "+docu.data().Education;
    document.getElementById('languagesProfile').innerHTML="Languages: "+docu.data().Language;

    document.getElementById('aboutHeading').innerHTML="About "+docu.data().FirstName;
    document.getElementById('aboutBody').innerHTML=docu.data().AboutMe;

    document.querySelector('.viewProfile').id=docu.id+"viewProfile";
    const ProfileId=document.getElementById(docu.id+"viewProfile").value=docu.id;

    const renderProfile=document.getElementById(docu.id+"viewProfile");

    localStorage.setItem("Id",ProfileId);
   
  })
  
  
}

//Checking the state of the user
onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    globalEmail=user.email;
   stat(globalEmail);
    document.getElementById('login1').innerHTML=' <button style="width:auto;margin-left:5px;border-radius:5px;background-color: #EF7C8E;border: 1px solid gray;" id="logout" class="btn">Logout <i class="fa-solid fa-right-from-bracket"></i></button>';

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
    alert("Please login or signup first in order to see other traveller around");
      window.location.href="/login/login.html";      
               
  }
});
