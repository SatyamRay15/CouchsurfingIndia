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
function Laitlum(){
  var name = document.getElementById("name").value;
  var headingLaitlum = document.getElementById("reviewHeadingLaitlum").value;
  var contentLaitlum = document.getElementById("reviewContentLaitlum").value;

  db.collection("Laitlum").add({
    name: name,
    heading: headingLaitlum,
    content: contentLaitlum ,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const LaitlumPostList = document.querySelector('#laitlumreview-list');



//create element and render post
function renderReviewLaitlum(doc){
  let li = document.createElement('li');
  let laitlum = document.createElement('h6');
  let name = document.createElement('h6');
  let headingLaitlum = document.createElement('b');
  let contentLaitlum = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  laitlum.textContent = "Laitlum: ";
  name.textContent = "Author Name: "+ doc.data().name;
  headingLaitlum.textContent ="Title: "+ doc.data().heading;
  contentLaitlum.textContent = doc.data().content;

  li.appendChild(laitlum);
  li.appendChild(name);
  li.appendChild(headingLaitlum);
  li.appendChild(contentLaitlum);

  LaitlumPostList.appendChild(li);
}

db.collection('Laitlum').get().then((snapshot)=>{
  // console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewLaitlum(doc);
    reviewLaitlum.orderBy("createdAt","desc").limit(4);
    // console.log(doc.data());
  })
})

const reviewLaitlum = db.collection("Laitlum");