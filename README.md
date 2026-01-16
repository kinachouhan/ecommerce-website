🛍️ Kinas Clothing Store

Kinas Clothing Store is a full-stack e-commerce web application designed to provide a seamless shopping experience for customers and an efficient management system for administrators. The application uses a single frontend with secure backend APIs, implementing authentication and authorization to protect user data and restrict access to admin features.

👤 User Features

Normal users can access the platform through the main website and perform the following actions:

Browse products across categories such as Men, Women, and Kids

View detailed product pages with images, prices, and descriptions

Register and log in securely

Add products to the cart and manage quantities

Place orders and track order history

Submit reviews only for products they have purchased

All user-specific actions such as cart, orders, and reviews are secured using JWT-based authentication.

🛠️ Admin Features

Administrators access the application through the /admin route.
Admin access is determined by email validation, where any user whose email ends with @admin.com is automatically granted admin privileges (no separate role field is used).

Admins can:

Add, update, and delete products with multiple images

Manage product categories and pricing

View and manage all customer orders

Update order statuses (Pending, Shipped, Delivered)

This ensures a clear separation between user and admin functionality while keeping access control simple and secure.

🔐 Authentication & Security

JWT-based authentication for secure API access

Protected routes for user and admin actions

Admin access restricted by email domain validation

🚀 Tech Stack

Frontend

React.js

Redux Toolkit

CSS / Responsive Design

Backend

Node.js

Express.js

MongoDB

JWT Authentication

Deployment

Frontend: Netlify

Backend: Render

🌐 Live Demo

User Panel: https://kinas-clothing-store.netlify.app

Admin Panel: https://kinas-clothing-store.netlify.app/admin
