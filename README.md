
# HealthIntern Manager

## Project Description

**HealthIntern Manager** is a web-based internship management system designed for health science colleges to streamline the registration and tracking of interns across various departments. It facilitates easy intern registration, hospital assignments, and internship progress tracking while ensuring that hospitals do not exceed the number of interns they can accommodate.

The project is built using **HTML**, **CSS**, and **JavaScript**, utilizing **DOM manipulation**, **API integration**, and **localStorage** for data management.

## Features

1. **Admin Authentication:**
   - Admins can sign up and log in to access the system.
   - Only authenticated users can register interns.

2. **Intern Registration:**
   - Dynamic forms for each department (e.g., Nursing, Medicine).
   - Unique department-specific intern IDs.
   - Image uploads for intern profiles.

3. **Hospital Management:**
   - Register hospitals and set a limit on the number of interns per hospital.
   - Track the number of interns per hospital and enforce limits.
   
4. **Internship Tracking:**
   - Monitor intern progress and remaining days.
   - Status updates such as **pending**, **approved**, etc.

5. **Dashboard Features:**
   - Display total interns registered, gender breakdown, number of hospitals, and active interns.

## Brand Identity

### Colors

The brand uses a professional and clean color palette to represent the health and tech industries:

- **Primary Color**: #2E86C1 (Bright Blue) – Represents trust, professionalism, and clarity.
- **Secondary Color**: #28B463 (Green) – Symbolizes growth, health, and progress.
- **Accent Color**: #F4D03F (Yellow) – Adds a touch of energy and attention, guiding the user’s focus.
- **Neutral Color**: #F5F5F5 (Light Grey) – Used for backgrounds, giving a clean and modern look.

### Typography

- **Font Family**: 'Poppins', sans-serif – A modern, clean font that emphasizes clarity and readability.

## Technology Stack

- **HTML**: For page structure and intern registration forms.
- **CSS**: For styling, including responsive layouts and form designs.
- **JavaScript**: 
  - Handles form validation, data processing, and dynamic content loading.
  - Manages data storage using `localStorage` and implements API logic.

## Project Structure

```
├── index.html                # Main login/signup page
├── dashboard.html            # Admin dashboard
├── register-intern.html      # Intern registration form
├── register-hospital.html    # Hospital registration form
├── assets/                   # Folder containing images and stylesheets
│   ├── styles.css            # Main CSS file
│   └── images/               # Folder containing images
└── scripts/                  # JavaScript files
    ├── auth.js               # Handles authentication logic
    ├── register.js           # Manages intern and hospital registrations
    ├── dashboard.js          # Handles displaying dashboard statistics
    └── storage.js            # Manages data storage in localStorage
```

## Installation & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/healthintern-manager.git
   ```

2. **Open the project:**
   Navigate to the project folder and open `index.html` in your browser to start.

3. **Admin Sign-Up/Login:**
   - Create an account or log in to access the dashboard.
   - Only authenticated users can register interns and manage hospitals.

4. **Register Interns:**
   - Choose a department and fill out the intern registration form.
   - Upload an image and assign the intern to a hospital.
   
5. **View Dashboard:**
   - Track the number of registered interns, their gender breakdown, and the number of active interns in hospitals.

## Future Enhancements

- **Progress Tracking**: Automatically calculate remaining internship days.
- **Notifications**: Alerts when hospitals reach their intern limit or when internships are nearing completion.
- **Reporting**: Generate reports for each department or hospital.
