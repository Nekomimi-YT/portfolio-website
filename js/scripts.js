// ****** Firebase ******

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJroDfiS0vd6t7zUgDy8Cyr8rDVeAJJyI",
  authDomain: "portfolio-contact-form-8413b.firebaseapp.com",
  projectId: "portfolio-contact-form-8413b",
  storageBucket: "portfolio-contact-form-8413b.appspot.com",
  messagingSenderId: "688561707815",
  appId: "1:688561707815:web:874e6fe8bbe6d39d77e702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let messagesRef = firebase.database().ref('messages');


// ****** Form Validation ******

(function() {
  let form = document.querySelector('#contact-form');
  let emailInput = document.querySelector('#email');
  //let phoneInput = document.querySelector('#phone-number');
  let messageInput = document.querySelector('#message');

  //get a value for the email input
  //test for input and the '@' sign
  function validateEmail() {
    let value = emailInput.value;

    if (!value) {
    showErrorMessage(emailInput, 'Email is a required field.');
    return false;
  }

  if (value.indexOf('@') === -1) {
    showErrorMessage(emailInput, 'You must enter a valid email address.');
    return false;
  }

  showErrorMessage(emailInput, null);
  return true;
}

  //get a value from the message textarea input
  //test if there is a value, as required
  function validateMessage() {
    let value = messageInput.value;

    if (!value) {
      showErrorMessage(messageInput, 'Message is a required field.');
      return false;
    }

  showErrorMessage(messageInput, null);
  return true;
}

  function showErrorMessage(input, message) {
  let container = input.parentElement; // contact-form__item

  // Remove an existing error
  let error = container.querySelector('.error-message');
  if (error) {
    container.removeChild(error);
  }

  // Add an error if the message isn’t empty
  if (message) {
    let error = document.createElement('div');
    error.classList.add('error-message');
    error.innerText = message;
    container.appendChild(error);
  }
}
  
  //collecting the return statments (true or false from validateEmail/Message, NOT the error messages)
  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidMessage = validateMessage();
    return validateEmail() && validateMessage();
  }
  
  //need true or false returned to know if the submission is valid
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server yet
    if (validateForm()) {
      alert('Success!');
    }
  })

  //these make the the functions act while the user is typing
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);
})();

// // ****** Form Submit ******

document.getElementById('contact-form').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  let name = getInputValue('name');
  let email = getInputValue('email');
  let phone = getInputValue('phone-number');
  let message = getInputValue('message');

  messageData(name, email, phone, message);
}

//get form values without repeating
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