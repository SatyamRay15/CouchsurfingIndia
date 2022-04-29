// var db=firebase.firestore();

var firebaseConfig = {
  apiKey: "AIzaSyCj9kam9Hgxdcpr7QgdPU1kX5_HcsoP4Ro",
  authDomain: "meghalaya-tourism.firebaseapp.com",
  databaseURL: "https://meghalaya-tourism.firebaseio.com",
  projectId: "meghalaya-tourism",
  storageBucket: "meghalaya-tourism.appspot.com",
  messagingSenderId: "896002054352",
  appId: "1:896002054352:web:e375f221e54dfddab266d5",
  measurementId: "G-PT4EBC1SH0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const db = firebase.firestore();

//Shillon Peak
function donboscoChurch(){
  var name = document.getElementById("name").value;
  var headingDonboscoChurch = document.getElementById("reviewHeadingDonboscoChurch").value;
  var contentDonboscoChurch = document.getElementById("reviewContentDonboscoChurch").value;

  db.collection("DonboscoChurch").add({
    name: name,
    heading: headingDonboscoChurch,
    content: contentDonboscoChurch,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const DonboscoChurchPostList = document.querySelector('#donboscochurchreview-list');



//create element and render post
function renderReviewDonboscoChurch(doc){
  let li = document.createElement('li');
  let DonboscoChurch = document.createElement('h6');
  let name = document.createElement('h6');
  let headingDonboscoChurch = document.createElement('b');
  let contentDonboscoChurch = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  DonboscoChurch.textContent = "Donbosco Church: ";
  name.textContent = "Author Name: "+ doc.data().name;
  headingDonboscoChurch.textContent ="Title: "+ doc.data().heading;
  contentDonboscoChurch.textContent = doc.data().content;

  li.appendChild(DonboscoChurch);
  li.appendChild(name);
  li.appendChild(headingDonboscoChurch);
  li.appendChild(contentDonboscoChurch);

  DonboscoChurchPostList.appendChild(li);
}

db.collection('DonboscoChurch').get().then((snapshot)=>{
  // console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewDonboscoChurch(doc);
    reviewDonboscoChurch.orderBy("createdAt","desc").limit(4);
    // console.log(doc.data());
  })
})

const reviewDonboscoChurch = db.collection("DonboscoChurch");