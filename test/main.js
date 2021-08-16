firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    var uid = user.uid;
    document.getElementById("login_div").style.display='none';
    document.getElementById("logout_div").style.display='block';

    // ...
  } else {
    // User is signed out
    // ...
    document.getElementById("login_div").style.display='block';
    document.getElementById("logout_div").style.display='none';
  }
});
function login(){
  var email=document.getElementById("username").value;
  var password=document.getElementById("pw").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Error: "+errorMessage);
  });



}
