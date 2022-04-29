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
function dawki(){
  var name = document.getElementById("name").value;
  var headingDawki = document.getElementById("reviewHeadingDawki").value;
  var contentDawki = document.getElementById("reviewContentDawki").value;

  db.collection("Dawki").add({
    name: name,
    heading: headingDawki,
    content: contentDawki ,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const DawkiPostList = document.querySelector('#dawkireview-list');



//create element and render post
function renderReviewDawki(doc){
  let li = document.createElement('li');
  let dawki = document.createElement('h6');
  let name = document.createElement('h6');
  let headingDawki = document.createElement('b');
  let contentDawki = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  dawki.textContent = "Dawki: ";
  name.textContent = "Author Name: "+ doc.data().name;
  headingDawki.textContent ="Title: "+ doc.data().heading;
  contentDawki.textContent = doc.data().content;

  li.appendChild(dawki);
  li.appendChild(name);
  li.appendChild(headingDawki);
  li.appendChild(contentDawki);

  DawkiPostList.appendChild(li);
}

db.collection('Dawki').get().then((snapshot)=>{
  // console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewDawki(doc);
    reviewDawki.orderBy("createdAt","desc").limit(4);
    // console.log(doc.data());
  })
})

const reviewDawki = db.collection("Dawki");