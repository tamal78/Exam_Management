# Exam-MCQ-App

- Backend HOSTED LINK: [Link](https://exam-api-gwj5.onrender.com/)
- Fronted HOSTED LINK: [Link](https://exam-api78.vercel.app/)

```

exam-mcq-app
│
├── backend/ # Backend part of the project
│ ├── models/ # Mongoose models
│ │ ├── Exam.js # Exam model
│ │ └── MCQ.js # MCQ model
│ │
│ ├── routes/ # Express routes
│ │ ├── examRoutes.js # Routes for exam-related operations
│ │ └── mcqRoutes.js # Routes for MCQ-related operations
│ │
│ ├── app.js # Main backend application file
│ └── package.json # Backend dependencies
│
├── frontend/ # Frontend part of the project
│ ├── public/ # Public files
│ │ └── index.html # Entry HTML file
│ │
│ ├── src/ # React source files
│ │ ├── components/ # React components
│ │ │ ├── ExamForm.js # Component for creating/editing exams
│ │ │ ├── MCQForm.js # Component for creating/editing MCQs
│ │ │ ├── ExamDetail.js # Component for viewing exam details
│ │ │ └── ... # Other components
│ │ │
│ │ ├── App.js # Main React application file
│ │ ├── index.js # Entry point for React application
│ │ └── ... # Other React files
│ │
│ └── package.json # Frontend dependencies
│
├── .env # Environment variables
└── README.md # Project README file

```

## Overview

Exam-MCQ-App is a full-stack web application designed to facilitate the creation, management, and viewing of exams and their associated multiple-choice questions (MCQs). Built using the MERN stack, this application integrates MongoDB, Express.js, Node.js, and React.js to deliver a seamless user experience for both exam administrators and participants.

### Key Features

- **Exam Management**: Create, view, update, and delete exams efficiently.
- **MCQ Management**: Add, edit, or remove multiple-choice questions for each exam.
- **Interactive UI**: A responsive user interface built with React.js.
- **RESTful API**: Backend implemented with Express.js, providing a RESTful API for exam and MCQ operations.

## Deployment

The Exam-MCQ-App is deployed on Vercel, allowing both the frontend and backend components to be hosted seamlessly.

### Steps for Deployment

1. **Prepare for Production**:

   - Optimize the React application for a production build.
   - Set the production environment variables.
   - Conduct thorough testing to ensure readiness for deployment.

2. **Vercel Account and CLI**:

   - Sign up or log in to [Vercel](https://vercel.com/signup).
   - Install the [Vercel CLI](https://vercel.com/download) on your machine.

3. **Deploy Backend (API)**:

   - In the backend directory, run `vercel` and follow the prompts to deploy the Node.js/Express.js API.

4. **Deploy Frontend (React App)**:

   - In the frontend directory, run `vercel` to deploy the React application.

5. **Environment Variables on Vercel**:

   - Configure the required environment variables in the Vercel project settings.

6. **Final Testing**:
   - Perform final tests post-deployment to ensure full functionality.
