# Newsify
---

## Install Guide

### Pre-Requisites
- **Software:** Node.js, npm, and Git installed.
- **Hardware:** Standard computer or laptop with internet connectivity.

### Dependent Libraries
- **Third-Party Software:** None required separately. Dependencies are managed through npm during installation.

### Download Instructions
1. Clone the repository using `git clone https://github.com/mrinal-c/newsify`.
2. Alternatively, download the ZIP file and extract it to your desired location.

### Build Instructions
- As we're providing the built application, there is no need to create a standalone build of our frontend or backend.

### Installation of Actual Application
- Frontend: /frontend/
    - Run `npm install` to install necessary dependencies
- Backend: /backend/
    - Run `npm install` to install necessary dependencies
    - Run `node index.js` to begin the React server


### Run Instructions
- Once the backend is running:
    - Navigate to the frontend directory (/frontend/).
    - Run `npm start` to launch the frontend on your default browser.

### Troubleshooting
- **Common Errors:**
    - Sometimes, the News API fails to fetch any news articles at all with our query. We war actively working on a fix as this is one of the major bugs.
    - Dependency conflicts: Reinstall Node.js and npm or clear npm cache (`npm cache clean -f`) if facing package installation issues.

---

## Additional Notes
- Continuous Integration (CI) tools via GitHub Actions have been implemented to automate deployment processes, 
  ensuring smoother updates and maintenance.

This README.md is structured to assist you in understanding the current status of the software, facilitate installation, and provide support during usage. 
If you encounter any issues or need further assistance, please refer to our documentation or 
reach out to our support team at [mchanshetty3@gatech.edu]

This document is intended to guide the customer (instruction team) through the installation and usage of Newsify, 
ensuring a smooth onboarding experience and effective utilization of the application's functionalities.