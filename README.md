
UrbanStay – Property Listing & Review Platform

UrbanStay is a full-stack web application that allows users to explore rental properties, add reviews, and manage their own listings. Inspired by platforms like Airbnb (but without booking functionality), UrbanStay focuses on property listing and feedback in a user-friendly and efficient manner.

🔍 Features

🔐 User Authentication using Passport.js (Local Strategy)

🏨 Add, Edit, and Delete Property Listings

✍️ Write and Remove Reviews on Listings

🛍️ Interactive, responsive user interface

📂 RESTful API for data operations

📊 MongoDB for database management

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB

Authentication: Passport.js

📌 How to Run the Project Locally

To view and test the UrbanStay project locally on your system:

Prerequisites:

Node.js installed

MongoDB installed or MongoDB Atlas URI

Git (for cloning the repository)

Steps:

Clone the repository

git clone https://github.com/your-username/urbanstay.git

Navigate to the project directory

cd urbanstay

Install dependencies

npm install

Configure environment variables

Create a .env file and add your MongoDB URI and session secrets

Start the server using nodemon

nodemon app.js

Open the website
Go to your browser and navigate to:

http://localhost:3000

📷 Screenshots

(Add screenshots of your homepage, listing page, and review section here to visualize the project)

📙 Folder Structure

urbanstay/
├── models/            # MongoDB models (User, Property, Review)
├── routes/            # Route files
├── views/             # EJS Templates
├── public/            # CSS, JS, and static assets
├── app.js             # Entry point of the application
├── .env               # Environment variables
└── README.md

📚 License

This project is open-source and available under the MIT License.
