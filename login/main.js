firebase.auth().onAuthStateChanged((user) => {
  if (user) {    
    var uid = user.uid;
    //window.location.href='../admin-orderInfo/index.html';
    loadPage();

    // ...User is signed in
  } else {
    // User is signed out
    // ...   
  }
});
function login(){
  var email=document.getElementById("inputEmail").value;
  var password=document.getElementById("inputPassword").value;
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
function loadPage(){
  window.location.href='../admin-orderInfo/index.html';
}
