
# HealthIntern Manager System

The **Health Intern Manager System** is a web-based application designed for managing interns in the health field. This system provides features for intern registration, hospital registration, assignment of interns to hospitals, and management of intern data, along with other administrative tasks. Built using HTML, CSS, and JavaScript, it leverages Local Storage for data management.

---

## Features

- **Intern Registration:** Allows users to register new interns with details like personal information, department, training hospital, and start/end dates.
- **Hospital Registration:** Manage hospital information including name, location, contact details, capacity, available departments, and shifts.
- **Dynamic Intern ID Generation:** Auto-generates unique intern IDs based on the selected department.
- **Intern Profile Management:** View and update details for each intern, including their status and assigned hospital.
- **Status Tracking:** Tracks intern status (e.g., Active, Pending, Completed) based on training start and end dates.
- **Dynamic Forms:** Adjusts fields in the registration form based on the department or hospital selection.
- **Filter and Search:** Includes filtering options for interns by date, gender, and status, with a reset filter feature.
- **Hospital Capacity Management:** Manages intern assignments to hospitals, tracking current and available intern slots.
- **User Authentication:** Checks if a user is logged in as an "onlineUser," otherwise redirects to the login page.
- **Logout Functionality:** Allows users to log out, clearing session data.

---

## Project Structure

```plaintext
HealthIntern Manager System/
├── Css/
│   ├── dashboard.css        # Styles for the dashboard layout
│   └── style.css            # General styles for the application
│
├── Html/
│   ├── Dashboard.html       # Main dashboard view for managing interns and hospitals
│   ├── Hospitals.html       # Hospital management view
│   ├── index.html           # Authentication page for login/signup
│   ├── Interns.html         # Intern management view
│   └── registration.html    # Registration form page for new interns and hospitals
│
├── Icons/                   # Contains icon files for the UI
├── Images/                  # Contains images used in the application
│
├── Js/
│   ├── auth.js              # Handles authentication functionality
│   ├── Registration.js      # Manages intern and hospital registration logic
│   └── script.js            # Handles other UI interactions and event listeners
│
└── README.md                # Project documentation
```

---

## Branding

HealthIntern Manager System’s branding focuses on simplicity, professionalism, and usability. The platform uses a clean and organized interface that promotes easy navigation for users, helping administrators manage interns and hospitals efficiently.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/HealthIntern-Manager.git
   ```
2. Open the `index.html` file in a web browser to access the login page.

---

## Usage

1. **Login:** Users must log in from `index.html` (auth page). If a user is not authenticated, they will be redirected back to this page.
2. **Dashboard:** Accessible after login, the dashboard provides options to manage interns and hospitals.
3. **Register Intern:** Fill in intern details on the `registration.html` page, including department selection which auto-generates an intern ID.
4. **Register Hospital:** Enter hospital information with capacity limits and available departments.
5. **Manage Interns and Hospitals:** View and update intern/hospital details, with filters and search features available on `Interns.html` and `Hospitals.html`.

---

## Contact

For further assistance, please contact:

- **Email:** mabdirahim832@gmail.com
- **GitHub:** [\[[Your GitHub Profile Link](https://github.com/Hayle01)\]]
