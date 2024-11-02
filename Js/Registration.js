const RegisterInternForm = document.querySelector(".Register-intern");
const RegisterHospitalForm = document.querySelector(".registerHospital");
const RegisterInstitutionForm = document.querySelector(".RegisterInstitution");

// BTNS registration
const registerInternBTN = document.querySelector("#registerIntern");
const registerhospitalBTN = document.querySelector("#registerhospital");
const registerInstitutionBTN = document.querySelector("#registerInstitution");

registerInternBTN.addEventListener("click", () => {
  RegisterInternForm.style.display = "flex";
  RegisterHospitalForm.style.display = "none";
  RegisterInstitutionForm.style.display = "none";
});

registerhospitalBTN.addEventListener("click", () => {
  RegisterHospitalForm.style.display = "flex";
  RegisterInternForm.style.display = "none";
  RegisterInstitutionForm.style.display = "none";
});

registerInstitutionBTN.addEventListener("click", () => {
  RegisterInstitutionForm.style.display = "flex";
  RegisterHospitalForm.style.display = "none";
  RegisterInternForm.style.display = "none";
});

// Intern registration form handling events
// Retrieve departmentSerials from localStorage or initialize
let departmentSerials = JSON.parse(
  localStorage.getItem("departmentSerials")
) || {
  NUR: 1,
  PHA: 1,
  LAB: 1,
  RAD: 1,
  SUR: 1,
  PED: 1,
  OBS: 1,
  DEN: 1,
  PH: 1,
  PHY: 1,
  EM: 1,
  CAR: 1,
  NEU: 1,
  ORT: 1,
  ANE: 1,
};

// Intern registration form element selections
const InternRegisterForm = document.getElementById("InternRegister");
const InternfullName = document.getElementById("fullName");
const InternmotherName = document.getElementById("mothername");
const dateoFBirth = document.getElementById("dateoFBirth");
const genderRadios = document.querySelectorAll('input[name="gender"]');
const martialStatus = document.querySelectorAll('input[name="martialStatus"]');
const InternNationality = document.getElementById("nationality");
const InternAddresss = document.getElementById("addresss");
const InternEmail = document.getElementById("email");
const InternPhonenumber = document.getElementById("phonenumber");
const departmentDropdown = document.getElementById("Department");
const IntenID = document.getElementById("IntenID");
const InternInstitution = document.getElementById("Institution");
const StartDate = document.getElementById("StartDate");
const EndDate = document.getElementById("EndDate");
const InternImage = document.getElementById("InternImage");
const RegisterFormBtn = document.getElementById("RegisterFormBtn");

// Function to get selected gender
function getSelectedGender() {
  let selectedGender = "";
  genderRadios.forEach((radio) => {
    if (radio.checked) {
      selectedGender = radio.value;
    }
  });
  return selectedGender;
}

// Function to get selected marital status
function getSelectedMaritalStatus() {
  let selectedStatus = "";
  martialStatus.forEach((radio) => {
    if (radio.checked) {
      selectedStatus = radio.value;
    }
  });
  return selectedStatus;
}

// Function to update the ID input when department changes
departmentDropdown.addEventListener("change", function () {
  const selectedDepartment = departmentDropdown.value;
  const serial = departmentSerials[selectedDepartment];

  // Set the ID using the department code and current serial
  IntenID.value = `${selectedDepartment}${String(serial).padStart(3, "0")}`;
});

// Function to handle image conversion to Base64
function getImageBase64(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Function to save intern data
async function saveInternData() {
  const selectedDepartment = departmentDropdown.value;
  const serial = departmentSerials[selectedDepartment];
  IntenID.value = `${selectedDepartment}${String(serial).padStart(3, "0")}`;

  const internData = {
    fullName: InternfullName.value,
    motherName: InternmotherName.value,
    dateOfBirth: dateoFBirth.value,
    gender: getSelectedGender(),
    maritalStatus: getSelectedMaritalStatus(),
    nationality: InternNationality.value,
    address: InternAddresss.value,
    email: InternEmail.value,
    phoneNumber: InternPhonenumber.value,
    department: selectedDepartment,
    internID: IntenID.value,
    institution: InternInstitution.value,
    startDate: StartDate.value,
    endDate: EndDate.value,
    image: InternImage.files[0]
      ? await getImageBase64(InternImage.files[0])
      : null,
  };

  let interns = JSON.parse(localStorage.getItem("interns")) || [];
  interns.push(internData);
  localStorage.setItem("interns", JSON.stringify(interns));

  // Increment and save the updated serial in localStorage
  departmentSerials[selectedDepartment]++;
  localStorage.setItem("departmentSerials", JSON.stringify(departmentSerials));

  alert("Intern registered successfully!");
  InternRegisterForm.reset();
}

// Event listener for form submission
InternRegisterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveInternData();
  window.location.href = "../Html/Interns.html";
});
