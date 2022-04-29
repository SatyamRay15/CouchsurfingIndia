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
function wardsLake(){
  var name = document.getElementById("name").value;
  var headingWardsLake = document.getElementById("reviewHeadingWardsLake").value;
  var contentWardsLake = document.getElementById("reviewContentWardsLake").value;

  db.collection("WardsLake").add({
    name: name,
    heading: headingWardsLake,
    content: contentWardsLake,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const WardsLakePostList = document.querySelector('#wardslakereview-list');



//create element and render post
function renderReviewWardsLake(doc){
  let li = document.createElement('li');
  let WardsLake = document.createElement('h6');
  let name = document.createElement('h6');
  let headingWardsLake = document.createElement('b');
  let contentWardsLake = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  WardsLake.textContent = "Wards Lake: ";
  name.textContent = "Author Name: "+ doc.data().name;
  headingWardsLake.textContent ="Title: "+ doc.data().heading;
  contentWardsLake.textContent = doc.data().content;

  li.appendChild(WardsLake);
  li.appendChild(name);
  li.appendChild(headingWardsLake);
  li.appendChild(contentWardsLake);

  WardsLakePostList.appendChild(li);
}

db.collection('WardsLake').get().then((snapshot)=>{
  // console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewWardsLake(doc);
    reviewWardsLake.orderBy("createdAt","desc").limit(4);
    // console.log(doc.data());
  })
})

const reviewWardsLake = db.collection("WardsLake");