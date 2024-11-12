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

document.addEventListener("DOMContentLoaded", function () {
  
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.querySelector(".side-bar");
  const CloseToggleBtn = document.querySelector("#CloseToggleBtn");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
  CloseToggleBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

  // Modal for quick registration
  const registerIntern = document.querySelector("#registerIntern");
  const registerhospital = document.querySelector("#registerhospital");
  const registerInternModal = document.querySelector("#registerIntern-model");
  const registerHospitalModal = document.querySelector(
    "#registerHospitalModal"
  );
  const closeButtons = document.querySelectorAll(".close-model");

  if (registerIntern) {
    registerIntern.addEventListener("click", () => {
      registerInternModal.style.display = "flex";
    });
  }

  if (registerhospital) {
    registerhospital.addEventListener("click", () => {
      registerHospitalModal.style.display = "flex";
    });
  }

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      registerInternModal.style.display = "none";
      registerHospitalModal.style.display = "none";
    });
  });

  window.onclick = function (event) {
    if (event.target == registerInternModal) {
      registerInternModal.style.display = "none";
    }
    if (event.target == registerHospitalModal) {
      registerHospitalModal.style.display = "none";
    }
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
  const IntenID = document.getElementById("IntenID");
  const InternInstitution = document.getElementById("Institution");
  const selectedhospital = document.getElementById("hospitalSelect");
  const StartDate = document.getElementById("StartDate");
  const EndDate = document.getElementById("EndDate");
  const InternImage = document.getElementById("InternImage");

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
      // maritalStatus: getSelectedMaritalStatus(),
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
    localStorage.setItem(
      "departmentSerials",
      JSON.stringify(departmentSerials)
    );

    alert("Intern registered successfully!");
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
    window.location.href = "../html/interns.html";
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

    hospitals.push(hospitalData);
    localStorage.setItem("hospitals", JSON.stringify(hospitals));
    registerationHospital.reset();
    alert("Hospital registered successfully!");
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
    window.location.href = "../html/hospitals.html";
  });
  // dashboard metrix
  // Total Intenrs Count
  function updateTotalInterns() {
    let interns = JSON.parse(localStorage.getItem("interns")) || [];
    let hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];

    const totalInternsValue = document.querySelector("#TotalInternsValue");
    const pendingInternsValue = document.querySelector("#pendingInternsValue");
    const activeInternsValue = document.querySelector("#activeInternsValue");
    const completedInternsValue = document.querySelector(
      "#completedInternsValue"
    );
    const totalHospitalsValue = document.querySelector("#totalHospitalsValue");

    const totalInterns = interns.length;
    const totalHospitals = hospitals.length;
    totalHospitalsValue.textContent = totalHospitals;
    // Filter interns by status to get counts for Active, Pending, and Completed
    const activeInterns = interns.filter(
      (intern) => intern.status === "Active"
    ).length;
    const pendingInterns = interns.filter(
      (intern) => intern.status === "Pending"
    ).length;
    const completedInterns = interns.filter(
      (intern) => intern.status === "Completed"
    ).length;

    totalInternsValue.textContent = totalInterns;
    pendingInternsValue.textContent = pendingInterns;
    activeInternsValue.textContent = activeInterns;
    completedInternsValue.textContent = completedInterns;
  }
  updateTotalInterns();

  // charts part
  {
    let interns = JSON.parse(localStorage.getItem("interns"));
    let hospitals = JSON.parse(localStorage.getItem("hospitals"));

    let hospitalInternCounts = hospitals.map((hospital) => {
      let internCount = interns.filter(
        (intern) => intern.SelectedHospitalID === hospital.id
      ).length;

      return {
        name: hospital.hospitalName,
        count: internCount,
        capacity: hospital.hospitalCapacity,
      };
    });

    // Prepare data for the chart
    let hospitalLabels = hospitalInternCounts.map((item) => item.name);
    let internData = hospitalInternCounts.map((item) => item.count);
    let capacityData = hospitalInternCounts.map((item) => item.capacity);

    new Chart(document.getElementById("hospitalBarChart"), {
      type: "bar",
      data: {
        labels: hospitalLabels,
        datasets: [
          {
            label: "Interns",
            backgroundColor: "#18c15e",
            data: internData,
          },
          {
            label: "Capacity",
            backgroundColor: "#406ed9",
            data: capacityData,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              display: true,
              barPercentage: 0.6,
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: { beginAtZero: true },
            },
          ],
        },
        legend: {
          position: "top",
        },
      },
    });

    // gender based chart
    let maleCount = 0;
    let femaleCount = 0;

    interns.forEach((intern) => {
      if (intern.gender === "male") {
        maleCount++;
      } else if (intern.gender === "female") {
        femaleCount++;
      }
    });

    // Data and labels for the Doughnut Chart
    const genderData = {
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [maleCount, femaleCount],
          backgroundColor: ["#4e73df", "#f6c23e"],
          hoverBackgroundColor: ["#2e59d9", "#d4b106"],
        },
      ],
    };

    // Doughnut Chart options
    const genderChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    };

    // Render the Doughnut Chart
    const ctx = document.getElementById("genderDoughnutChart").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: genderData,
      options: genderChartOptions,
    });
  }
});
