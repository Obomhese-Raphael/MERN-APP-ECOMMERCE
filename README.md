# **Forever Fashion - Modern E-Commerce Platform**  

A **full-stack e-commerce application** built for selling trendy clothing for **Men, Women, and Kids**. Features include **product management, secure Stripe payments, advanced search, and an admin dashboard** for inventory control.  

---

## **✨ Key Features**  

### **👕 Shopping Experience**  
✔ **Multi-Category Browsing** – Men, Women, and Kids sections  
✔ **Advanced Search & Filters** – Sort by price, size, color, and popularity  
✔ **Shopping Cart System** – Add, remove, and adjust quantities  
✔ **Stripe Payment Integration** – Secure checkout with credit/debit card support  

### **🛠 Admin Dashboard** (`/admin`)  
🔒 **Protected Admin Routes** – Only authorized users can access  
📦 **Product Management** – Add, edit, or delete products  
📊 **Order Management** – View and process customer orders  
👤 **User Management** – Control admin access  

### **🔐 Authentication**  
🔑 **Login & Logout** – JWT-based secure authentication  
📝 **Session Persistence** – Stay logged in across sessions  

---

## **🚀 Tech Stack**  

| **Category**       | **Technologies Used** |  
|-------------------|----------------------|  
| **Frontend**      | React.js, Tailwind CSS, Context API, Axios |  
| **Backend**       | Node.js, Express.js, MongoDB, JWT |  
| **Payments**      | Stripe API |  
| **Deployment**    | Vercel (Frontend, Backend), MongoDB Atlas |  

---

## **⚙️ Setup & Installation**  

### **1. Clone the Repository**  
```bash
git clone https://github.com/Obomhese-Raphael/forever-full-stack.git
cd frontend
cd backend
cd admin
```

### **2. Backend Setup**  
```bash
cd server
npm install
```

Create a `.env` file:  
```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/forever_fashion?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

Start the server:  
```bash
npm start
```

### **3. Frontend Setup**  
```bash
cd frontend
npm install
```

Create a `.env` file:  
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
```

Start the frontend:  
```bash
npm run dev
```

## **🚀 Future Improvements**  
- [ ] **Wishlist & Favorites**  
- [ ] **Product Reviews & Ratings**  
- [ ] **Social Login (Google, Facebook)**  

---

### **🤝 Contributing**  
PRs are welcome! Open an **issue** first for major changes.  

---

🙏 Acknowledgments
This project was developed with the help of invaluable tutorials and resources:

GreatStack Youtube Tutorial by Avinash Kr
- [NodeJs Complete Course for Beginners 2025](https://youtu.be/yGl3f0xTl_0?si=awIQmbRdqVUh6As2)
- [ExpressJs Full Course From Beginner to Pro 2025](https://youtu.be/fBzm9zja2Y8?si=gybWUDStQDpCLMTx)
- [Complete Mern Authentication System with ...](https://youtu.be/7BTsepZ9xp8?si=Y70bszJ-aTHvb4J6)
- [Create Full Stack E-Commerce Website Using MERN Stack project and Stripe Authentication](https://youtu.be/7E6um7NGmeE?si=rsEJPtjSJDI3_07b)



**Happy Shopping!** 👕👗👶  
