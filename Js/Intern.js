// Intern registeration form element selections
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

// Variables to store the next serial number for each department
let departmentSerials = {
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
  const selectedDepartment = departmentDropdown.value; // e.g., "NUR"
  const serial = departmentSerials[selectedDepartment]; // get current serial for the department
  IntenID.value = `${selectedDepartment}${String(serial).padStart(3, "0")}`; // e.g., "NUR001"
});

// Function to handle image conversion to Base64
function getImageBase64(imageFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Function to save intern data
async function saveInternData() {
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
        department: departmentDropdown.value,
        internID: IntenID.value,
        institution: InternInstitution.value,
        startDate: StartDate.value,
        endDate: EndDate.value,
        image: InternImage.files[0] ? await getImageBase64(InternImage.files[0]) : null 
    };

    let interns = JSON.parse(localStorage.getItem("interns")) || [];
    interns.push(internData);
    localStorage.setItem("interns", JSON.stringify(interns));
    alert("Intern registered successfully!");
    InternRegisterForm.reset();
}

// Event listener for form submission
InternRegisterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveInternData();
});

