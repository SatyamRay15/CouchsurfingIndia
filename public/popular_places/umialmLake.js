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
function umaimLake(){
  var name = document.getElementById("name").value;
  var headingUmaimLake = document.getElementById("reviewHeadingUmiamLake").value;
  var contentUmaimLake = document.getElementById("reviewContentUmiamLake").value;

  db.collection("UmiamLake").add({
    name: name,
    heading: headingUmaimLake,
    content: contentUmaimLake ,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const UmaimLakePostList = document.querySelector('#umaimlakereview-list');



//create element and render post
function renderReviewUmaimLake(doc){
  let li = document.createElement('li');
  let umaimlake = document.createElement('h6');
  let name = document.createElement('h6');
  let headingUmaimLake = document.createElement('b');
  let contentUmaimLake = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  umaimlake.textContent = "Umiam Lake: ";
  name.textContent = "Author Name: "+ doc.data().name;
  headingUmaimLake.textContent ="Title: "+ doc.data().heading;
  contentUmaimLake.textContent = doc.data().content;

  li.appendChild(umaimlake);
  li.appendChild(name);
  li.appendChild(headingUmaimLake);
  li.appendChild(contentUmaimLake);

  UmaimLakePostList.appendChild(li);
}

db.collection('UmiamLake').get().then((snapshot)=>{
  // console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewUmaimLake(doc);
    reviewUmiamLake.orderBy("createdAt","desc").limit(4);
    // console.log(doc.data());
  })
})

const reviewUmiamLake = db.collection("UmiamLake");