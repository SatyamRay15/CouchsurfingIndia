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
function ladyHydraPark(){
  var name = document.getElementById("name").value;
  var headingLadyHydraPark = document.getElementById("reviewHeadingLadyHydraPark").value;
  var contentLadyHydraPark = document.getElementById("reviewContentLadyHydraPark").value;

  db.collection("LadyHydraPark").add({
    name: name,
    heading: headingLadyHydraPark,
    content: contentLadyHydraPark,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const LadyHydraParkPostList = document.querySelector('#ladyhydraparkreview-list');



//create element and render post
function renderReviewLadyHydraPark(doc){
  let li = document.createElement('li');
  let LadyHydraPark = document.createElement('h6');
  let name = document.createElement('h6');
  let headingLadyHydraPark = document.createElement('b');
  let contentLadyHydraPark = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  LadyHydraPark.textContent = "Lady Hydra Park: ";
  name.textContent = "Author Name: "+ doc.data().name;
  headingLadyHydraPark.textContent ="Title: "+ doc.data().heading;
  contentLadyHydraPark.textContent = doc.data().content;

  li.appendChild(LadyHydraPark);
  li.appendChild(name);
  li.appendChild(headingLadyHydraPark);
  li.appendChild(contentLadyHydraPark);

  LadyHydraParkPostList.appendChild(li);
}

db.collection('LadyHydraPark').get().then((snapshot)=>{
  // console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewLadyHydraPark(doc);
    reviewLadyHydraPark.orderBy("createdAt","desc").limit(4);
    // console.log(doc.data());
  })
})

const reviewLadyHydraPark = db.collection("LadyHydraPark");