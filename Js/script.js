const toggleButton = document.querySelector(".toggle-btn");
const sideBar = document.querySelector(".side-bar");

toggleButton.addEventListener("click", function () {
  navbar.classList.toggle("active");
});

const registerIntern = document.querySelector("#registerIntern");
const registerhospital = document.querySelector("#registerhospital");

registerIntern.addEventListener("click", openModal);

document
  .querySelector(".close-model")
  .addEventListener("click", () => closeModel());

function openModal() {
  const registerModal = document.querySelector("#register-model");
  registerModal.style.display = "flex";
}

function closeModel() {
  const registerModal = document.querySelector("#register-model");
  registerModal.style.display = "none";
}

window.onclick = function (event) {
  const registerModal = document.querySelector("#register-model");
  if (event.target == registerModal) {
    closeModel();
  }
};


const registerform = document.querySelector("#register-form");

registerform.addEventListener("submit", function(event) {
  event.preventDefault();
  
})