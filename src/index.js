// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJroDfiS0vd6t7zUgDy8Cyr8rDVeAJJyI",
  authDomain: "portfolio-contact-form-8413b.firebaseapp.com",
  databaseURL: "https://portfolio-contact-form-8413b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "portfolio-contact-form-8413b",
  storageBucket: "portfolio-contact-form-8413b.appspot.com",
  messagingSenderId: "688561707815",
  appId: "1:688561707815:web:874e6fe8bbe6d39d77e702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// ****** Form Submit ******

document.getElementById('contact-form').addEventListener('submit', submitForm);
//let messagesRef = firebase.database().ref('messages');

function submitForm(e) {
  e.preventDefault();

  let name = getInputValue('name');
  let email = getInputValue('email');
  let phone = getInputValue('phone-number');
  let message = getInputValue('message');

  messageData(name, email, phone, message);
}

//get form values without repeating code
function getInputValue(id) {
  return document.getElementById(id).value;
}

function messageData(name, email, phone, message) {
  let newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    phone: phone,
    message, message
  })
}