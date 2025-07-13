# 🛒 ECommerce Backend API

🎯 Project Purpose
This project is a production-level eCommerce platform inspired by Amazon and Flipkart. It allows customers to browse products, manage carts, place orders, make payments, and interact with an AI-powered chatbot for support. Admins and sellers can manage inventory, track sales, and monitor business performance.

It is built to:

Demonstrate full-stack development skills using MERN stack

Show scalable architecture for a real-world marketplace

Integrate modern tools like JWT authentication, payment gateway, and OpenAI chatbot

Serve as a portfolio project for interviews, demonstrating practical knowledge of frontend, backend, and deployment

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Razorpay/Stripe (for payments)
- OpenAI API (for AI Chatbot)
- Cloudinary (for image uploads)
- RESTful API

---

## 📁 Folder Structure

ecommerce-backend/
│
├── config/ # DB config
├── controllers/ # Business logic
├── middleware/ # Auth, error handling
├── models/ # Mongoose schemas
├── routes/ # API route files
├── utils/ # Token generator, helpers
├── uploads/ # (if using local image upload)
├── server.js # Entry point
└── .env # Environment variables




🧪 Usage & Features
👤 For Users:
Browse products by category
Search, filter, and sort products
View product details with reviews
Add to cart and wishlist
Secure login & signup with JWT
Place orders with address selection and Razorpay/Stripe payments
View past orders and track delivery
Chat with AI chatbot for product or order help

🛍️ For Sellers:
Upload new products with images
Manage their listings (edit/delete)

🛠️ For Admins:
View dashboard (sales, users, orders)
Manage all users, products, and orders

🤖 AI Chatbot:
Integrated using OpenAI API
Helps customers with FAQs, product suggestions, and order info



🔧 Project Setup
🖥 Backend Setup (ecommerce-backend/)
Clone the repo:

bash
Copy
Edit
git clone https://github.com/yourusername/ecommerce-backend.git
cd ecommerce-backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file:
Add the following environment variables:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
OPENAI_API_KEY=your_openai_key
Run the backend server:

bash
Copy
Edit
# For development
npm run dev

# For production
npm start





💻 Frontend Setup (ecommerce-frontend/)
Navigate to frontend folder:

bash
Copy
Edit
cd ecommerce-frontend
Install frontend dependencies:

bash
Copy
Edit
npm install
Start the React app:

bash
Copy
Edit
npm run dev  

