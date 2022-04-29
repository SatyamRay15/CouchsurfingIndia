function logout(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    alert("SignOut Successfull...");
    location.reload();
  }).catch(function(error) {
    // An error happened.
    alert(error+" This is error");
    location.reload();
  });
}


function redirect(){
  var user = firebase.auth().currentUser;

      if (user) {
        // User is signed in.
        document.location.href = "create.html";
        document.location.href = "/bookingAtrip/bookAtrip.html";
      } else {
        // No user is signed in.
        alert("You need to register or login before booking.");
        document.location.href = "/signinAndsignout/signIn.html";
      }
    }

    window.onload = function loadfun(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log(user+"there is a user");
          document.getElementById("logout").style.display = "block";
          document.getElementById("login").style.display = "none";
        } else {
          // No user is signed in.
          console.log("There is no user");
          document.getElementById("login").style.display = "block";
          document.getElementById("logout").style.display = "none";
        }
      }
      )}

      function validate(){
        var name = document.getElementById("name").value;
       var heading = document.getElementById("reviewHeading").value;
       var content = document.getElementById("reviewContent").value;

       if(name==""){
         alert("Please fill up all the form fields before submitting. #name field");
         return; 
       }else if(heading == ""){
         alert("Please fill up all the form fields before submitting. #heading field");
         return; 
       }else if(content == ""){
         alert("Please fill up all the form fields before submitting. #content field");
         return; 
       }else{
         review();
       }
     } 