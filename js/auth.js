const formTitle = document.querySelector("#form-title");
const authForm = document.querySelector("#authForm");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const authButton = document.querySelector("#authButton");
const authSwitch = document.querySelector("#authSwitch");
const errorMessage = document.querySelector("#errorMessage");
const switchForm = document.querySelector("#switchForm");

let isSignin = true;

document.body.addEventListener("click", (e) => {
  if (e.target.id !== "switchForm") return;
  switchAuthforms();
});

// Fariinta ciladda muujin
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Fariinta ciladda tirtir
function clearError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

email.addEventListener("input", clearError);
password.addEventListener("input", clearError);
confirmPassword.addEventListener("input", clearError);

authForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();

  const user = {
    username: !isSignin ? username.value : undefined,
    email: email.value,
    password: password.value,
  };

  if (isSignin) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExisting = users.find(
      (user) => user.email === email.value && user.password === password.value
    );
    if (userExisting) {
      localStorage.setItem("onlineUser", JSON.stringify(userExisting));
      window.location.href = "../html/dashboard.html";
    } else {
      showError("Invalid email or password");
      return;
    }
  } else {
    if (confirmPassword.value !== password.value) {
      showError("Passwords do not match");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExisting = users.find((user) => user.email === email.value);
    if (userExisting) {
      showError(`User with email ${email.value} already exists`);
      return;
    }
    // Push new user and save to localStorage
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Show success toast
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: "success",
      title: "Registered successfully",
    });
    setTimeout(() => {
      switchAuthforms();
    }, 1500);
  }
});

// Function to switch between forms
function switchAuthforms() {
  isSignin = !isSignin;
  if (!isSignin) {
    authButton.textContent = "Sign up";
    formTitle.textContent = "Sign up";
    username.style.display = "block";
    confirmPassword.style.display = "block";
    email.value = "";
    password.value = "";
    authSwitch.innerHTML = `Already have an account? <a href="#" id="switchForm">Sign in</a>`;
    clearError(); 
  } else {
    authButton.textContent = "Sign in";
    formTitle.textContent = "Sign in";
    username.style.display = "none";
    confirmPassword.style.display = "none";
    email.value = "";
    password.value = "";
    authSwitch.innerHTML = `Don't have an account? <a href="#" id="switchForm">Sign up</a>`;
    clearError(); 
  }
}
