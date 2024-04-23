# Support Ticket System

This project is a support ticket system built using React for the frontend and JSON Server for the backend API.

## Features

**User json-server**: `npx json-server db.json`  
**Start project command**: `npx run dev`

- **User Authentication**: Users can register and login to access the system.

- **Role-based Access Control**: Different functionalities are available based on the user's role (admin, tech, user).

- **Ticket Management**: Users can create tickets, admins can assign tickets to tech persons, and tech persons can view and update ticket status.

- **Admin Panel**: Admins can manage users, tech team, and tickets.

**User Credentials**:
  - **Admin**: 
    - Email: admin@gmail.com
    - Password: 123

**Technologies Used**: 
  - React: A JavaScript library for building user interfaces.
  - JSON Server: A full fake REST API server for testing and prototyping.
  - React Router: A routing library for React applications.
  - Axios: A promise-based HTTP client for making requests to the backend server.
  - Bootstrap: A front-end framework for developing responsive and mobile-first websites.

**Using useContext with Userstate**:

To access user data and form validation state within your components, use the useContext hook with the usercontext provided by the Userstate component.
