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

  function updateInternStatuses() {
    let interns = JSON.parse(localStorage.getItem("interns")) || [];
    const currentDate = new Date();

    interns = interns.map((intern) => {
      let status = intern.status;

      if (
        intern.startDate &&
        new Date(intern.startDate) <= currentDate &&
        status !== "Completed"
      ) {
        status = "Active";
      }
      if (intern.endDate && new Date(intern.endDate) <= currentDate) {
        status = "Completed";
      }

      return { ...intern, status };
    });

    localStorage.setItem("interns", JSON.stringify(interns));
  }
  updateInternStatuses();

  const departmentNames = {
    NUR: "Nursing",
    PHA: "Pharmacy",
    LAB: "Laboratory",
    RAD: "Radiology",
    SUR: "Surgery",
    PED: "Pediatrics",
    OBS: "Obstetrics",
    DEN: "Dentistry",
    PH: "Public Health",
    PHY: "Physiotherapy",
    EM: "Emergency Medicine",
    CAR: "Cardiology",
    NEU: "Neurology",
    ORT: "Orthopedics",
    ANE: "Anesthesiology",
  };

  // Function to display interns in a table
  function displayInterns(interns, tableBody) {
    tableBody.innerHTML = "";

    interns.forEach((intern) => {
      const row = document.createElement("tr");
      row.setAttribute("data-id", intern.internID);
      row.innerHTML = `
        <td>${intern.internID}</td>
        <td>${intern.fullName}</td>
        <td>${intern.institution}</td>
        <td>${departmentNames[intern.department] || intern.department}</td>
        <td>${intern.startDate}</td>
        <td>${intern.endDate}</td>
        <td><span class="status ${intern.status}">${intern.status}</span></td>
        <td><button class="delete-btn">Delete</button></td>
      `;

      row.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
          e.stopPropagation();
          deleteIntern(intern.internID);
        } else {
          openInternModal(intern);
        }
      });

      tableBody.appendChild(row);
    });
  }
  const tableBody = document.getElementById("InternsTableBody");
  const RegisteredInterns = JSON.parse(localStorage.getItem("interns")) || [];
  displayInterns(RegisteredInterns, tableBody);
  function deleteIntern(internID) {
    let interns = JSON.parse(localStorage.getItem("interns")) || [];
    interns = interns.filter((intern) => intern.internID !== internID);
    localStorage.setItem("interns", JSON.stringify(interns));
    displayInterns(interns, tableBody);

    if (modal.style.display === "block") {
      modal.style.display = "none";
    }
  }
  // Search function to find and display intern by ID
  function searchAndDisplayInternByID(internID) {
    const interns = JSON.parse(localStorage.getItem("interns")) || [];
    const foundIntern = interns.find((intern) => intern.internID === internID);

    if (foundIntern) {
      displayInterns([foundIntern], tableBody);
    } else {
      alert("No intern found with that ID.");
    }
  }

  const searchForm = document.getElementById("searchInternForm");
  const searchInput = document.getElementById("search-intern");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const internID = searchInput.value.trim();
    if (internID) {
      searchAndDisplayInternByID(internID);
    } else {
      alert("Please enter an Intern ID to search.");
    }
  });

  // dispay intern in the modal
  const modal = document.getElementById("internModal");
  const modalImage = document.getElementById("InternImagModal");
  const deleteInternModalButton = document.getElementById(
    "deleteInternModalButton"
  );
  const modalInternID = document.getElementById("modalInternID");
  const HospitalLogo = document.getElementById("HospitalLogo");
  const modalFullName = document.getElementById("modalFullName");
  const modalMotherName = document.getElementById("modalMotherName");
  const modalDateOfBirth = document.getElementById("modalDateOfBirth");
  const modalGender = document.getElementById("modalGender");
  // const modalMaritalStatus = document.getElementById("modalMaritalStatus");
  const modalNationality = document.getElementById("modalNationality");
  const modalAddress = document.getElementById("modalAddress");
  const modalEmail = document.getElementById("modalEmail");
  const modalPhoneNumber = document.getElementById("modalPhoneNumber");
  const modalDepartment = document.getElementById("modalDepartment");
  const modalInstitution = document.getElementById("modalInstitution");
  const ModalSelectedHospital = document.getElementById(
    "ModalSelectedHospital"
  );
  const modalStartDate = document.getElementById("modalStartDate");
  const modalEndDate = document.getElementById("modalEndDate");
  const modalStatus = document.getElementById("modalStatus");

  function openInternModal(intern) {
    const hospitals = JSON.parse(localStorage.getItem("hospitals")) || [];

    const hospital = hospitals.find((h) => h.id === intern.SelectedHospitalID);

    // Populate modal with intern data
    modalImage.src = intern.image || "../images/default-profile-image.png";
    HospitalLogo.src =
      hospital.hospitalLogo || "../images/defaultHospitalLogo.jpg";
    console.log("hospiyal logo,", hospital.hospitalLogo);
    modalInternID.textContent = intern.internID;
    modalFullName.textContent = intern.fullName;
    modalMotherName.textContent = intern.motherName;
    modalDateOfBirth.textContent = intern.dateOfBirth;
    modalGender.textContent = intern.gender;
    // modalMaritalStatus.textContent = intern.maritalStatus;
    modalNationality.textContent = intern.nationality;
    modalAddress.textContent = intern.address;
    modalEmail.textContent = intern.email;
    modalPhoneNumber.textContent = intern.phoneNumber;
    modalDepartment.textContent = departmentNames[intern.department];
    modalInstitution.textContent = intern.institution;
    ModalSelectedHospital.textContent = hospital
      ? hospital.hospitalName
      : "Unknown Hospital";
    modalStartDate.textContent = intern.startDate;
    modalEndDate.textContent = intern.endDate;
    modalStatus.textContent = intern.status || "Pending"; // default status

    modal.style.display = "block";
    deleteInternModalButton.addEventListener("click", function () {
      deleteIntern(intern.internID);
    });
  }

  // Close modal functionality
  document
    .querySelector("#CloseInternModal")
    .addEventListener("click", function () {
      modal.style.display = "none";
    });

  // Close modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
