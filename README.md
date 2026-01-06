# 🛒 Next-Gen E-commerce Admin Dashboard

A high-integrity, server-rendered (SSR) administrative ecosystem built with **Next.js 14**. This dashboard provides granular control over product lifecycles with a focus on security, data transparency, and advanced activity tracking.

---

## Live Deployment 
Access the wesite on https://product-management-dashboard-six.vercel.app/

---

## Demo video 
Access the demo video in github repo or on https://drive.google.com/drive/folders/1B6d_F_rdLra-K0TUpwulyI_cYJCEAeHQ?usp=sharing 

---

##  Dummy Admin Credentials
For evaluation, use the following created dummy admin credentials:
* **Email**: `newadmin@test.com`
* **Password**: `admin123` *(Note: Securely hashed in DB via Bcrypt)*

---
##  Objective
To develop a high-performance administrative interface that ensures fast page load times, improved SEO through Server-Side Rendering, and a secure, efficient interface for administrators to manage product data.

---

##  Key Features

### 1. Advanced Update Logging (Audit History)
Unlike standard dashboards, this system features a **detailed activity log** implemented in the backend logic:
* **Immutable History**: Every change is recorded with precise timestamps and stored in a dedicated `LogSchema`.
* **Data Diffs**: The logs don't just state "updated"; they capture the specific records of what happened, showing the "before" and "after" state of product fields like Price, Stock, Status, and Description.
* **Accountability**: Each log entry is associated with the specific admin (`editedBy`) who performed the action.

### 2. "Splitwise-Style" Admin Hierarchy
A sophisticated multi-tier access system designed for privacy and security:
* **Super Admin Authority**: A central authority holds the power to approve or reject requests from other users who want to become admins.
* **Request Privacy**: Standard admins can perform CRUD operations but cannot see pending access requests from others. This sleek management view is strictly restricted to the Super Admin.
* **Secure Onboarding**: New admins must request access, which is managed securely through MongoDB.

### 3. High-Integrity CRUD Operations
* **Product Management**: Complete Create, Read, Update, and Delete (CRUD) operations managed through an intuitive interface.
* **Zod-Powered Validation**: Every input is strictly validated on the server side using **Zod** to prevent malformed data, such as negative pricing or non-integer stock levels.
* **Global Search**: A high-speed search bar that allows admins to filter products by name or by the admin who edited them.

### 4. Interactive Data Visualization
* **Stock & Status Analytics**: Integrated **Recharts** charts (Stock Bar Chart and Status Pie Chart) provide real-time snapshots of inventory levels and product distribution.

---

##  Security Architecture

* **Secure Authentication**: Passwords are securely stored in MongoDB using **bcryptjs** for one-way hashing.
* **HTTP-Only Cookies**: Session management is handled via HTTP-only cookies, ensuring no one can directly access the dashboard via URL without a verified administrative login.
* **Data Sanitization**: Uses Zod to ensure all incoming data matches the required schema before database insertion.

---

##  Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend/Backend** | **Next.js 14** (App Router, SSR) |
| **Database** | **MongoDB** (via Mongoose) |
| **Data Fetching** | **SWR** (Stale-While-Revalidate) |
| **Validation** | **Zod** |
| **Security** | **Bcrypt.js** & **HTTP-Only Cookies** |
| **Media Storage** | **Cloudinary** |
| **Visualization** | **Recharts** |



---

##  Workflow

1. **Admin Request**: A user requests dashboard access; the request is stored in MongoDB.
2. **Super Admin Approval**: The Super Admin reviews and approves the request (this view is hidden from other admins).
3. **Session Initiation**: Upon login, a secure HTTP-only cookie is established.
4. **Data Management**: Admin interacts with forms; Zod validates data; Cloudinary handles image uploads; MongoDB stores the final product document.
5. **Detailed Logging**: The system calculates the difference between old and new data, pushing a detailed log entry with the "diff" to the product's history.

---

