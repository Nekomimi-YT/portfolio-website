import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Portfolio Contact Form Firebase configuration
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


// ****** Form Validation and Submit ******

(function() {
  let form = document.querySelector('#contact-form');
  let emailInput = document.querySelector('#email');
  let messageInput = document.querySelector('#message');

  //Require a value and @ for validation
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

  //Require a textarea value for validation
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
  
  //Both return statments must be true for this function to be true
  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidMessage = validateMessage();
    return validateEmail() && validateMessage();
  }
  
  //need true or false returned to know if the submission is valid
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Do not submit to the server yet
    if (validateForm()) {
      let name = getInputValue('name');
      let email = getInputValue('email');
      let phone = getInputValue('phone-number');
      let message = getInputValue('message');
      writeNewMessage(name, email, phone, message);
      alert('Message sent!!');
      }
    });

  //get form values without repeating code
  function getInputValue(id) {
    return document.getElementById(id).value;
  }

  function writeNewMessage(name, email, phone, message) {
    set(ref(database, 'New Message from: ' + name), {
      name: name,
      email: email,
      phone: phone,
      message, message
    })
  }

  //Event listeners to activate validation functions
  emailInput.addEventListener('input', validateEmail);
  messageInput.addEventListener('input', validateMessage);
})();