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

    const HospitalTableBody = document.getElementById("HospitalTableBody");
    const registeredHospitals = JSON.parse(localStorage.getItem("hospitals")) || [];
    const registeredInterns =   JSON.parse(localStorage.getItem("interns")) || [];

    registeredHospitals.forEach((hospital) => {
      const internCount = registeredInterns.filter(
        (intern) => intern.SelectedHospitalID === hospital.id
      ).length;
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${hospital.id}</td>
      <td>${hospital.hospitalName}</td>
      <td>${hospital.hospitalsdepartment}</td> 
      <td>${hospital.hospitalType}</td>
      <td>${hospital.hospitalCapacity}</td>
      <td>${hospital.availableShifts}</td>
      <td>${internCount}</td>
    `;

      // Add click event to show hospital details modal
      row.addEventListener("click", () => {
        console.log("Hospital row clicked");
        openHospitalDetailsModal(hospital, internCount);
      });
      HospitalTableBody.appendChild(row);
    });

    const CloseHospitalModal = document.getElementById("CloseHospitalModal");
    const HospitalModal = document.getElementById("HospitalModal");

    const HospitalLogo = document.getElementById("HospitalLogo");
    const HospNAMEModal = document.getElementById("HospNAMEModal");
    const HospitalIDmodal = document.getElementById("HospitalIDmodal");
    const HospitalTypeMOdal = document.getElementById("HospitalTypeMOdal");
    const HospitalCapaModal = document.getElementById("HospitalCapaModal");
    const modalHosDepartments = document.getElementById("modalHosDepartments");
    const modalHosShifts = document.getElementById("modalHosShifts");
    const modalHosPhone = document.getElementById("modalHosPhone");
    const modalHosEmail = document.getElementById("modalHosEmail");
    const HospitalAddressModal = document.getElementById(
      "HospitalAddressModal"
    );
    const InternsReceivedModal = document.getElementById(
      "InternsReceivedModal"
    );

    function openHospitalDetailsModal(hospital, internCount) {
      HospitalLogo.src =
        hospital.hospitalLogo || "../images/defaultHospitalLogo.jpg";
      HospNAMEModal.textContent = hospital.hospitalName;
      HospitalIDmodal.textContent = hospital.id;
      HospitalTypeMOdal.textContent = hospital.hospitalType;
      HospitalCapaModal.textContent = hospital.hospitalCapacity;
      modalHosDepartments.textContent = hospital.hospitalsdepartment;
      modalHosShifts.textContent = hospital.availableShifts;
      modalHosPhone.textContent = hospital.hospitalPhone;
      modalHosEmail.textContent = hospital.hospitalEmail;
      HospitalAddressModal.textContent = hospital.hospitallocation;
      InternsReceivedModal.textContent = internCount;

      HospitalModal.style.display = "block";
    }

    CloseHospitalModal.addEventListener("click", () => {
      HospitalModal.style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target == HospitalModal) {
        HospitalModal.style.display = "none";
      }
    };

})