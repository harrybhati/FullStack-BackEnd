# MERN Full-Stack App with Role-Based Authentication and Company Management

This is a MERN (MongoDB, Express, React, Node.js) stack application that implements role-based authentication (Admin and User) and company management functionalities. The application provides different routes and features for users depending on their assigned roles.

## Features

- **User Registration and Login**: Users can sign up with a username, email, mobile number, and password. Passwords are hashed using `bcrypt`. Roles are restricted to `IT_ADMIN` and `IT_USER_NORMAL`.
- **Role-Based Access**: 
  - `IT_ADMIN` has access to all companies and can manage (create, edit, approve, delete) them.
  - `IT_USER_NORMAL` can only view and create their own companies.
- **Company Management**: Users (both Admin and Normal) can create companies, and Admins can approve or delete them.
- **Search and List Companies**: Search companies by name or address.
  
## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Role-based authentication using JWT (or session management via tokens stored in `localStorage`).
- **Password Encryption**: `bcrypt` for secure password hashing.
- **Cross-Origin Resource Sharing (CORS)**: Enabled for frontend-backend communication.

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (running locally or use MongoDB Atlas for cloud hosting)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:
   git clone https://github.com/harrybhati/FullStack-BackEnd.git
   cd FullStack-FrontEnd
   Install Backend Dependencies: Navigate to the backend folder and install the dependencies:

2.**Install Backend Dependencies**: 
Navigate to the backend folder and install the dependencies:
  npm install

3.**Setup MongoDB**:
Make sure MongoDB is running locally.
The default MongoDB connection string is: mongodb://127.0.0.1:27017/Item. You can update the connection string in the Config.js file if needed.


4.**Run the Backend**:
  node index.js or nodemon index.js


5.**Frontend Setup**:
  Navigate to the frontend folder (if it's in a separate directory), install dependencies, and start the React app:
  npm install
  npm start

6.**Access the App**: The frontend will be running on http://localhost:3000 and the backend on http://localhost:4500.


## API Endpoints 
    **User Routes**
        1. Register User (POST /register):
             payload:{
                     "name": "John Doe",
                     "username": "john_doe",
                     "password": "password123",
                     "email": "john@example.com",
                      "role": "IT_USER_NORMAL",
                     "mobile": "1234567890"
                        }

  Response:On success: Returns the registered user and a redirect URL based on the user's role.
          On failure: Returns an error if the user already exists or if there's an invalid role.


  2.Login User (POST /login):
       Payload:{
                 "username": "john_doe",
                 "password": "password123"
                 }

  Response:On success: Returns a success message with the user role and username.
           On failure: Invalid credentials or internal server error.      





8.Company Routes
    1.Create Company (POST /user/company):
       Payload:{
                  "username": "john_doe",
                  "role": "IT_USER_NORMAL",
                   "companyName": "Tech Solutions",
                   "companyAddress": "123 Tech St",
                   "status": "pending"
                   }

  2.Get All Companies (GET /companylist):
       Returns a list of all companies (Admin only).
  3.Get Companies by Username (GET /companies?username=john_doe):
        Returns all companies associated with a specific user.
 4.Edit Company (PUT /companylist/:id):
       Allows editing a specific company's details by id.
5.Delete Company (DELETE /companylist/:id):
   Allows deleting a company by id.
6.Approve Company (PATCH /companylist/:id/approve):
   Approves a company by id (Admin only).
7.Search Companies (GET /search/company?query=Tech):
     Searches for companies by name or address based on the provided query.



User Roles:
         Admin (IT_ADMIN): Can create, edit, delete, and approve companies, and view all companies.
         Normal User (IT_USER_NORMAL): Can create and view only their own companies.




Running the Project:
                 Backend: Start the backend server on http://localhost:4500.
                Frontend: Start the React app on http://localhost:3000.
               Make sure both servers are running to have the full stack working.




              
