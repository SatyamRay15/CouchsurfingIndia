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
function shillongPeak(){
  var name = document.getElementById("name").value;
  var headingShillongPeak = document.getElementById("reviewHeadingShillongPeak").value;
  var contentShillongPeak = document.getElementById("reviewContentShillongPeak").value;

  db.collection("ShillongPeak").add({
    name: name,
    heading: headingShillongPeak,
    content: contentShillongPeak ,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const ShillongPeakPostList = document.querySelector('#shillongpeakreview-list');



//create element and render post
function renderReviewShillongPeak(doc){
  let li = document.createElement('li');
  let shillongpeak = document.createElement('h6');
  let name = document.createElement('h6');
  let headingShillongPeak = document.createElement('b');
  let contentShillongPeak = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  shillongpeak.textContent = "Shillong Peak: ";
  name.textContent = "Author Name: "+ doc.data().name;
  headingShillongPeak.textContent ="Title: "+ doc.data().heading;
  contentShillongPeak.textContent = doc.data().content;

  li.appendChild(shillongpeak);
  li.appendChild(name);
  li.appendChild(headingShillongPeak);
  li.appendChild(contentShillongPeak);

  ShillongPeakPostList.appendChild(li);
}

db.collection('ShillongPeak').get().then((snapshot)=>{
  // console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewShillongPeak(doc);
    reviewShillongPeak.orderBy("createdAt","desc").limit(4);
    // console.log(doc.data());
  })
})

const reviewShillongPeak = db.collection("ShillongPeak");