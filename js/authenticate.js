// Authentication Example using firebase authentication SDK
// this example is only for facebook authentication 
// to add your authentication method please refer to firebase.com specs
// This file is not added to the demo working project but is furnished as example. 
// If you plan to use and extend you need a firebase account/app running
// 

"use strict";

var provider = new firebase.auth.FacebookAuthProvider();

var user = firebase.auth().currentUser;


function doAuthenticateWithFacebook(){
firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email; 
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}    

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log ( "USER IS " + user )
    // User is signed in.
  } else {
    // No user is signed in.
  }
});