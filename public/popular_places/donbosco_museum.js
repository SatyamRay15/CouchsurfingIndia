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
function donboscoMuseum(){
  var name = document.getElementById("name").value;
  var headingDonboscoMuseum = document.getElementById("reviewHeadingDonboscoMuseum").value;
  var contentDonboscoMuseum = document.getElementById("reviewContentDonboscoMuseum").value;

  db.collection("DonboscoMuseum").add({
    name: name,
    heading: headingDonboscoMuseum,
    content: contentDonboscoMuseum,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const DonboscoMuseumPostList = document.querySelector('#donboscomuseumreview-list');



//create element and render post
function renderReviewDonboscoMuseum(doc){
  let li = document.createElement('li');
  let DonboscoMuseum = document.createElement('h6');
  let name = document.createElement('h6');
  let headingDonboscoMuseum = document.createElement('b');
  let contentDonboscoMuseum = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  DonboscoMuseum.textContent = "Donbosco Museum: ";
  name.textContent = "Author Name: "+ doc.data().name;
  headingDonboscoMuseum.textContent ="Title: "+ doc.data().heading;
  contentDonboscoMuseum.textContent = doc.data().content;

  li.appendChild(DonboscoMuseum);
  li.appendChild(name);
  li.appendChild(headingDonboscoMuseum);
  li.appendChild(contentDonboscoMuseum);

  DonboscoMuseumPostList.appendChild(li);
}

db.collection('DonboscoMuseum').get().then((snapshot)=>{
  // console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewDonboscoMuseum(doc);
    reviewDonboscoMuseum.orderBy("createdAt","desc").limit(4);
    // console.log(doc.data());
  })
})

const reviewDonboscoMuseum = db.collection("DonboscoMuseum");