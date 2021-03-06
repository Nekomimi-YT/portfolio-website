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