Vibe Commerce Cart 🛒

A simple MERN based Cart System to learn API structure, checkout flow and MongoDB CRUD operations.

Repository Name

E-ComCart

Tech Stack

Backend: Node.js + Express.js + MongoDB + Mongoose

Frontend: React (basic)

Database: MongoDB Community Server (Local, installed on Windows normally)

E-ComCart/
 ├─ backend/
 │   ├─ models/
 │   ├─ routes/
 │   ├─ server.js
 ├─ frontend/
 │   ├─ src/
 │   ├─ package.json
 ├─ README.md
 
 #Feature                    
 Add to Cart                
 View Cart                 
 Delete Item from Cart     
 Checkout API + Clear Cart      
 Simple React UI  

#Start Backend      
cd backend
npm install
node server.js

#Start Frontend
cd frontend
npm install
npm start

Frontend runs on:
http://localhost:3000

API Endpoints (Backend)
Method	       Route	              Description
GET	         /api/cart	            get cart items
POST	    /api/cart/add	        add product to cart
DELETE	   /api/cart/remove/:id	    remove single item
POST	   /api/checkout	        checkout + clear cart + return JSON Receipt

#DB Setup
MongoDB Community Server installed normally on Windows.
No remote Atlas needed.

## Screenshots

### Products Page
![Products](/screenshots/products.png)

### Cart Page
![Cart](/screenshots/cart.png)

### Checkout Page
![Checkout](/screenshots/checkout.png)


#Future Scope
JWT Auth System
Razorpay Checkout Integration
Multiple User Cart
Wishlist System
    
#Author
Abhishek Pandey    

