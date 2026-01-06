#  Installation & Developer Setup

Follow these instructions to get the **Next-Gen Inventory Dashboard** running on your local machine.

---

##  Prerequisites

Before starting, ensure you have the following installed and configured:
* **Node.js**: v18.x or higher
* **Package Manager**: npm or yarn
* **Database**: A MongoDB Atlas account or a local MongoDB instance
* **Media Hosting**: A Cloudinary account for product image storage

---

##  Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/coderman-sarvag/Product-Management-Dashboard
cd Product-Management-Dashboard
```
### 2. Install Dependencies
This will install all necessary libraries, including Next.js, Mongoose, Zod, Bcryptjs, and Lucide React.
```bash
npm install
```
### 3. Environment Configuration
Create a .env.local file in the root directory. This file is ignored by git for security. Add the following variables(the values are hidden for security purpose.):

```Code
# MongoDB Connection
MONGODB_URI=<mongo db connection uri>

# Cloudinary API Credentials
CLOUDINARY_CLOUD_NAME=<name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<secret>

# Authentication & Security
JWT_SECRET=supersecret_admin_key
SUPER_ADMIN_EMAIL=newadmin@test.com
```

## Database & Security Setup
### MongoDB Initialization

The project uses Mongoose for schema enforcement. On your first successful product creation, the products collection and nested logs array will be initialized automatically in your database.

---
### Bcrypt Hashing

Passwords are never stored as plain text. The system automatically applies Bcryptjs one-way hashing during the admin approval process to ensure data security.

---

## Running the Application
### Development Mode

Start the local development server with hot-reloading:
```bash
npm run dev
```
Access the dashboard at: https://product-management-dashboard-steel.vercel.app/
### Production Build
To test the optimized production environment:
```bash
npm run build
npm start
```
