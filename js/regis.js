document.addEventListener("DOMContentLoaded", () => {
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
  // const martialStatus = document.querySelectorAll(
  //   'input[name="martialStatus"]'
  // );
  const InternNationality = document.getElementById("nationality");
  const InternAddresss = document.getElementById("addresss");
  const InternEmail = document.getElementById("email");
  const InternPhonenumber = document.getElementById("phonenumber");
  const departmentDropdown = document.getElementById("Department");
  const departmentError = document.getElementById("departmentError");
  const IntenID = document.getElementById("IntenID");
  const InternInstitution = document.getElementById("Institution");
  const selectedhospital = document.getElementById("hospitalSelect");
  const StartDate = document.getElementById("StartDate");
  const EndDate = document.getElementById("EndDate");
  const InternImage = document.getElementById("InternImage");
  const RegisterFormBtn = document.getElementById("RegisterFormBtn");

  // fetching departments
  async function fetchingDepartments() {
    try {
      const response = await fetch("../data/departments.json");
      if (!response.ok) {
        throw new Error("Failed to fetch department data.");
      }
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("No department data available.");
      }
      departmentDropdown.innerHTML =
        '<option value="" selected>Select Department</option>';
      data.forEach((department) => {
        departmentDropdown.innerHTML += `<option value="${department.serial}">${department.name}</option>`;
      });
      departmentError.textContent = "";
    } catch (err) {
      departmentError.textContent = err.message;
      departmentError.classList.add("error-message");
    }
  }
  fetchingDepartments();

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

  // Function to update the ID input when department changes
  departmentDropdown.addEventListener("change", function () {
    const selectedDepartment = departmentDropdown.value;
    const serial = departmentSerials[selectedDepartment];
    IntenID.value = `${selectedDepartment}${String(serial).padStart(3, "0")}`;
  });

  // Function to get selected marital status
  // function getSelectedMaritalStatus() {
  //   let selectedStatus = "";
  //   martialStatus.forEach((radio) => {
  //     if (radio.checked) {
  //       selectedStatus = radio.value;
  //     }
  //   });
  //   return selectedStatus;
  // }

  // Function to update the ID input when department changes
  // departmentDropdown.addEventListener("change", function () {
  //   const selectedDepartment = departmentDropdown.value;
  //   return selectedDepartment
  //   // const serial = departmentSerials[selectedDepartment];
  //   // IntenID.value = `${selectedDepartment}${String(serial).padStart(3, "0")}`;
  // });

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
    const internData = {
      fullName: InternfullName.value,
      motherName: InternmotherName.value,
      dateOfBirth: dateoFBirth.value,
      gender: getSelectedGender(),
      // maritalStatus: getSelectedMaritalStatus(),
      nationality: InternNationality.value,
      address: InternAddresss.value,
      email: InternEmail.value,
      phoneNumber: InternPhonenumber.value,
      department: departmentDropdown.value,
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
    localStorage.setItem(
      "departmentSerials",
      JSON.stringify(departmentSerials)
    );

    InternRegisterForm.reset();
  }

  /// Event listener for form submission
  InternRegisterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validation checks for each required field
    if (InternfullName.value === "") {
      alert("Please enter the full name");
      InternfullName.focus();
      return;
    }
    if (InternmotherName.value === "") {
      alert("Please enter your mother’s name");
      InternmotherName.focus();
      return;
    }
    if (dateoFBirth.value === "") {
      alert("Please enter the date of birth");
      dateoFBirth.focus();
      return;
    }
    if (!getSelectedGender()) {
      alert("Please select your gender");
      return;
    }
    // if (!getSelectedMaritalStatus()) {
    //   alert("Please select your marital status");
    //   return;
    // }
    if (InternNationality.value === "") {
      alert("Please enter your nationality");
      InternNationality.focus();
      return;
    }
    if (InternAddresss.value === "") {
      alert("Please enter your address");
      InternAddresss.focus();
      return;
    }
    if (InternEmail.value === "" || !validateEmail(InternEmail.value)) {
      alert("Please enter a valid email address");
      InternEmail.focus();
      return;
    }
    if (InternPhonenumber.value === "") {
      alert("Please enter a valid phone number");
      InternPhonenumber.focus();
      return;
    }
    if (departmentDropdown.value === "") {
      alert("Please select a department");
      return;
    }
    if (selectedhospital.value === "") {
      alert("Please select a hospital");
      return;
    }
    if (StartDate.value === "") {
      alert("Please enter the start date");
      StartDate.focus();
      return;
    }
    if (EndDate.value === "") {
      alert("Please enter the end date");
      EndDate.focus();
      return;
    }
    // Save intern data if validation passes
    saveInternData();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Intern registered successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.href = "../html/interns.html";
    }, 1500);
  });

  // Email validation function
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  }

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
  }
  RegisterHospitalSubBTN.addEventListener("click", (e) => {
    e.preventDefault();
    if (hospitalName.value === "") {
      alert("Please enter a Hospital name!");
      hospitalName.focus();
      return;
    }
    if (hospitallocation.value === "") {
      alert("Please enter the hospital location!");
      hospitallocation.focus();
      return;
    }
    if (hospitalEmail.value === "" || !validateEmail(hospitalEmail.value)) {
      alert("Please enter a valid hospital email address!");
      hospitalEmail.focus();
      return;
    }
    if (hospitalPhone.value === "") {
      alert("Please enter a valid hospital phone number!");
      hospitalPhone.focus();
      return;
    }
    if (
      hospitalCapacity.value === "" ||
      isNaN(hospitalCapacity.value) ||
      hospitalCapacity.value <= 0
    ) {
      alert("Please enter a valid hospital capacity!");
      hospitalCapacity.focus();
      return;
    }
    if (hospitalType.value === "") {
      alert("Please select a hospital type!");
      return;
    }
    if (HdepartmentsAvailable.selectedOptions.length === 0) {
      alert("Please select at least one department!");
      return;
    }
    if (availableShifts.selectedOptions.length === 0) {
      alert("Please select at least one shift!");
      return;
    }

    registerHospitalFunction();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Hospital registered successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      window.location.href = "../html/hospitals.html";
    }, 1500);
  });
});
