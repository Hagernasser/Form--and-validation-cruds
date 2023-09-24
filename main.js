let submit = document.querySelector("input[type='submit']");
let inputs = document.querySelectorAll("input:not(input[type='submit'])");
let userName = document.querySelector("input[name='username']");
let email = document.querySelector("input[name='email']");
let password = document.querySelector("input[name='password']");
let confirmPassword = document.querySelector("input[name='confirm-password']");

let email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
let pass_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/g;
let error = false;

submit.addEventListener("click", (e) => {
  e.preventDefault();
  error = false; // Reset error status on each submit

  inputs.forEach((input) => {
    if (input.value == "") {
      input.nextElementSibling.textContent = `${input.name} is required`;
      error = true;
    } else {
      if (!email.value.match(email_pattern) && email.value != "") {
        email.nextElementSibling.textContent = `Email should be like this name@gmail.com`;
        error = true;
      }
      if (!password.value.match(pass_pattern) && password.value != "") {
        password.nextElementSibling.textContent = `Password should have at least 8 characters, including one uppercase letter, one lowercase letter, and one digit.`;
        error = true;
      }
      if (
        password.value !== confirmPassword.value &&
        confirmPassword.value != ""
      ) {
        confirmPassword.nextElementSibling.textContent = `Confirm password does not match the password.`;
        error = true;
      }
    }
  });

  if (!error) {
    // Logic to store user data in localStorage (not shown in this snippet)
    let users = localStorage.getItem("users");
    if (!users) {
      users = [];
      id = 1;
    } else {
      users = JSON.parse(users);
      id = users[users.length - 1].user_id + 1;
    }
    users.push({
      user_id: id,
      username: userName.value,
      email: email.value,
      password: password.value,
    });
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href="http://127.0.0.1:5500/crud.html"
  }
});
