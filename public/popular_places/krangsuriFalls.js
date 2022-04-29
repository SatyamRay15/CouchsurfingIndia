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
function krangsuriFalls(){
  var name = document.getElementById("name").value;
  var headingKrangsuriFalls = document.getElementById("reviewHeadingKrangsuriFalls").value;
  var contentKrangsuriFalls = document.getElementById("reviewContentKrangsuriFalls").value;

  db.collection("KrangsuriFalls").add({
    name: name,
    heading: headingKrangsuriFalls,
    content: contentKrangsuriFalls ,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const KrangsuriFallsPostList = document.querySelector('#krangsuriFallsreview-list');



//create element and render post
function renderReviewKrangsuriFalls(doc){
  let li = document.createElement('li');
  let krangsuriFalls = document.createElement('h6');
  let name = document.createElement('h6');
  let headingKrangsuriFalls = document.createElement('b');
  let contentKrangsuriFalls = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  krangsuriFalls.textContent = "Krangsuri Falls: ";
  name.textContent = "Author Name: "+ doc.data().name;
  headingKrangsuriFalls.textContent ="Title: "+ doc.data().heading;
  contentKrangsuriFalls.textContent = doc.data().content;

  li.appendChild(krangsuriFalls);
  li.appendChild(name);
  li.appendChild(headingKrangsuriFalls);
  li.appendChild(contentKrangsuriFalls);

  KrangsuriFallsPostList.appendChild(li);
}

db.collection('KrangsuriFalls').get().then((snapshot)=>{
  // console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewKrangsuriFalls(doc);
    reviewKrangsuriFalls.orderBy("createdAt","desc").limit(4);
    // console.log(doc.data());
  })
})

const reviewKrangsuriFalls = db.collection("KrangsuriFalls");