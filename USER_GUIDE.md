# 📘 Admin User Guide

Welcome to the **Next-Gen Inventory Logic** dashboard. This guide explains how to use the specialized features of this system, including the request hierarchy, secure logging, and product management.

---

## 🔐 1. Access & Authentication

### Requesting Access
1.  Navigate to the login page.
2.  If you do not have an account, fill out the credentials and click on Request Admin Access.
3.  Your request will be sent to the **Super Admin** for review. 
    * *Note: Standard admins cannot see your request; only the Super Admin has visibility to approve or reject users.*

### Secure Login
* Once approved, log in using your credentials.
* The system uses **HTTP-Only Cookies**. This means your session is tied to your browser's secure storage and cannot be intercepted by malicious scripts.


---

## 📝 2. Managing Products

### Creating Products
* Click the **+ Create Product** button on the dashboard.
* Fill in the name, price, and stock.
* **Validation**: The system uses **Zod** to ensure data integrity. If you enter a negative price or invalid characters, the system will prevent the save and highlight the error.
* **Images**: Uploaded images are processed via **Cloudinary**. Ensure your images are in standard formats (JPG, PNG).

### Updating Products
* Select a product from the list to view its details.
* Click **Edit** to modify fields.
* **Detailed Logging**: Every time you click "Update," the system calculates the **Diff**. It compares what the data was before you changed it to what it is now.

---

## 📜 3. Understanding Update Logs

To view a product's history, click the **View Logs** button in the Product Details pane.



### How to Read the Logs:
* **Action**: Shows if the product was `CREATED` or `UPDATED`.
* **Timestamp**: Shows the exact date and time the change occurred.
* **Field Diffs**: You will see a breakdown like this:
    > `Stock: 10 → 15`  
    > `Price: 299 → 249`
* This ensures total transparency. You can always see exactly which admin changed a price or adjusted stock levels.

---

## 👑 4. Super Admin Capabilities

If you are the **Super Admin**, you have a specialized "Requests" tab in your sidebar:

1.  **Reviewing Admins**: You will see a list of users pending approval.
2.  **Approve/Reject**: Clicking approve will hash their password using **Bcrypt.js** and grant them access to the dashboard.
3.  **Privacy**: This tab is completely hidden from regular admins to prevent them from tampering with user permissions.

---

## 📊 5. Dashboard Analytics

Use the top section of the dashboard to monitor your inventory at a glance:
* **Stock Levels (Bar Chart)**: Identify which products are running low on stock.
* **Status Distribution (Pie Chart)**: See the ratio of `Active`, `Draft`, and `Out of Stock` products.

---

## 🛠️ Troubleshooting

* **"Invalid Date" in Logs**: Ensure you are using the latest version of the dashboard where the `at` field is correctly mapped.
* **Cannot access Dashboard**: Ensure your browser accepts cookies, as the **HTTP-Only Cookie** is required for authentication.
* **Image not showing**: Check your internet connection; images are served via a global CDN (Cloudinary).