# Airbnb Clone

A full-stack MERN application that replicates the core functionalities of Airbnb, allowing users to browse properties, book them, and hosts to list their properties.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Introduction

The Airbnb Clone is a web application built using the MERN stack (MongoDB, Express, React, Node.js). It features both user and host functionalities, where users can book properties and hosts can list their properties for rental.

## Features

- <strong>User Authentication:</strong> JWT-based secure login/signup.
- <strong>Property Listings:</strong> Users can view property listings, filter, and search for properties.
- <strong>Booking System:</strong> Users can book properties and manage their bookings.
- <strong>Host Functionality:</strong> Hosts can list properties, update details, and manage their listings.
- <strong>Responsive Design:</strong> Fully responsive UI built with Tailwind CSS.

## Tech Stack

**Frontend:**

- React
- Redux Toolkit
- Tailwind CSS
- React Router

**Backend:**

- Node.js
- Express.js
- MongoDB
- JWT for authentication

**Cloud:**

- Cloudinary for image hosting
- MongoDB Atlas for database hosting

## Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Clone the repository
```bash
git clone https://github.com/vermagaur851/AirBnb-Clone.git
cd airbnb-clone
```
### Install dependencies
#### Install backend dependencies
```
cd /api
npm install
```
#### Install frontend dependencies
```
cd ..
cd ../client
npm install
```
### Environment Variables
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
### Running the Application
#### Start the backend server
```
cd /api
npm start
```
#### Start the frontend server
```
cd ../client
npm run dev
```
## Usage
### As a User
- Register or log in to the application.
- Browse through the property listings.
- Book a property by selecting available dates.
- Manage your bookings from your profile.
### As a Host
- Log in to your account.
- Add new properties by filling in the required details and uploading images.
- Manage your listed properties from the host dashboard.
## Project Structure
```
airbnb-clone/
├── backend/          # Express server, MongoDB models, routes, controllers
├── frontend/         # React components, Redux slices, pages, styles
├── .gitignore        # Git ignore file
├── README.md         # Project README file
└── package.json      # Project dependencies and scripts
```
## API Endpoints
### User Authentication
- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Log in as an existing user.
### Listings
- GET /api/listings: Get all property listings.
- POST /api/listings: Create a new property listing (Host only).
- PUT /api/listings/: Update a property listing (Host only).
DELETE /api/listings/: Delete a property listing (Host only).
### Bookings
- POST /api/bookings: Create a new booking.
- GET /api/bookings: Get all bookings for the logged-in user.
## Future Enhancements
- Implement advanced search filters (price range, amenities).
- Add a review and rating system for properties.
- Integrate payment gateway for handling bookings.
## Contributing
##### Contributions are welcome! Please fork this repository and submit a pull request for any improvements or bug fixes.
