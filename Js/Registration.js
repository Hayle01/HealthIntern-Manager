const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.querySelector(".side-bar");
const CloseToggleBtn = document.querySelector("#CloseToggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
CloseToggleBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
});


const RegisterInternForm = document.querySelector(".Register-intern");
const RegisterHospitalForm = document.querySelector(".registerHospital");

// BTNS registration
const registerInternBTN = document.querySelector("#registerIntern");
const registerhospitalBTN = document.querySelector("#registerhospital");

registerInternBTN.addEventListener("click", () => {
  RegisterInternForm.style.display = "flex";
  RegisterHospitalForm.style.display = "none";
});

registerhospitalBTN.addEventListener("click", () => {
  RegisterHospitalForm.style.display = "flex";
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
const selectedhospital = document.getElementById("hospitalSelect");
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
  IntenID.value = `${selectedDepartment}${String(serial).padStart(3, "0")}`;
});

const currentDate = new Date();
let status = "Pending";

if (StartDate.value && new Date(StartDate.value) <= currentDate) {
  status = "Active";
}
if (EndDate.value && new Date(EndDate.value) <= currentDate) {
  status = "Completed";
}

// get hospitals from the local storage
let hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];

hospitals.forEach((hospital) => {
  const option = document.createElement("option");
  option.value = hospital.id;
  option.textContent = hospital.hospitalName;
  selectedhospital.appendChild(option);
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
    SelectedHospitalID: selectedhospital.value,
    startDate: StartDate.value,
    endDate: EndDate.value,
    image: InternImage.files[0]
      ? await getImageBase64(InternImage.files[0])
      : null,
    status: status,
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
  if (InternmotherName.value == "") {
    alert("Please enter your mother name");
  }
  saveInternData();
  window.location.href = "../Html/Interns.html";
});

// hospital registration form handling events
const registerationHospital = document.getElementById("registerHospital");
const hospitalName = document.querySelector("#hospitalName");
const hospitallocation = document.querySelector("#hospitallocation");
const hospitalEmail = document.querySelector("#hospitalEmail");
const hospitalPhone = document.querySelector("#hospitalPhone");
const hospitalCapacity = document.querySelector("#hospitalCapacity");
const hospitalType = document.querySelector("#hospitalType");
const HdepartmentsAvailable = document.querySelector("#departmentsAvailable");
const availableShifts = document.querySelector("#availableShifts");
const hospitalLogo = document.querySelector("#hospitalLogo");
const RegisterHospitalSubBTN = document.querySelector("#RegisterHospitalBTN");

async function registerHospitalFunction() {
  let hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
  const hospitalData = {
    id: "HOS" + (hospitals.length + 1).toString().padStart(3, "0"),
    hospitalName: hospitalName.value,
    hospitallocation: hospitallocation.value,
    hospitalEmail: hospitalEmail.value,
    hospitalPhone: hospitalPhone.value,
    hospitalCapacity: hospitalCapacity.value,
    hospitalType: hospitalType.value,
    hospitalsdepartment: Array.from(HdepartmentsAvailable.selectedOptions)
      .map((opt) => opt.value)
      .join(", "),
    availableShifts: Array.from(availableShifts.selectedOptions)
      .map((opt) => opt.value)
      .join(", "),
    hospitalLogo: hospitalLogo.files[0]
      ? await getImageBase64(hospitalLogo.files[0])
      : null,
  };
  console.log("HOSPITAL ID is :", hospitalData.id);

  hospitals.push(hospitalData);
  localStorage.setItem("hospitals", JSON.stringify(hospitals));
  registerationHospital.reset();
  alert("Hospital registered successfully!");
}
RegisterHospitalSubBTN.addEventListener("click", (e) => {
  e.preventDefault();
  if (hospitalName.value == "") {
    alert("Please enter a Hospital name!");
    return;
  }
  registerHospitalFunction();
  console.log("registerHospital are currently available");
  window.location.href = "../Html/Hospitals.html";
});
