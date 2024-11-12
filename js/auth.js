const formTitle = document.querySelector("#form-title");
const authForm = document.querySelector("#authForm");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const authButton = document.querySelector("#authButton");
const authSwitch = document.querySelector("#authSwitch");
const switchForm = document.querySelector("#switchForm");
const registerSucces = document.querySelector("#registerSucces");

let isSignin = true;

document.body.addEventListener("click", (e) => {
    if (e.target.id  != "switchForm") return;
    switchAuthforms();
});
authForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = {
    username: !isSignin ? username.value : undefined, 
    email: email.value,
    password: password.value,
  };

  if (isSignin){
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExisting = users.find(
      (user) => user.email === email.value && user.password === password.value
    );
    if(userExisting){
      localStorage.setItem("onlineUser", JSON.stringify(userExisting));
      window.location.href = "../html/dashboard.html";
    }else{
      alert("Invalid username or password")
      return
    }
  }else{
    if (confirmPassword.value !== password.value) {
      alert("Passwords do not match"); 
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExisting = users.find((user) => user.username === username.value && user.email === email.value);
    if(userExisting){
      alert(`User ${user.username} already exists`);
      return;
    }
    users.push(user); 
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");
    switchAuthforms();
  }
});

function switchAuthforms() {
  isSignin = !isSignin;
    if(!isSignin){
        authButton.textContent = 'Sign up';
        formTitle.textContent = 'Sign up';
        username.style.display = "block";
        confirmPassword.style.display = "block";
        email.value = "";
        password.value = "";
        authSwitch.innerHTML = `Already have an account? <a href="#" id="switchForm">Sign in</a>`;
    }else{
        authButton.textContent = "Sign in";
        formTitle.textContent = "Sign in";
        username.style.display = "none";
        confirmPassword.style.display = "none";
        email.value = "";
        password.value = "";
        authSwitch.innerHTML = `Don't have an account? <a href="#" id="switchForm">Sign up</a>`;
    }
}


