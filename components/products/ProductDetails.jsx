"use client";

import { useState, useEffect } from "react";
import ProductLogsModal from "@/components/products/ProductLogsModal";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";
export default function ProductDetails({ product, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const logs = product.logs || [];
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
 
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    status: "",
    imageUrl: "",
    description: "",
  });

  
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        status: product.status || "",
        imageUrl: product.imageUrl || "",
        description: product.description || "",
      });
    }
  }, [product]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }


  async function handleUpdate() {
    try {
  
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("status", formData.status);
      if (selectedFile) {
        data.append("image", selectedFile);
      }
      data.append("description", formData.description);

     
      const response = await fetch(`/api/products/${product._id}`, {
        method: "PATCH", 
        body: data,      
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Update failed: ${errorData.message}`);
        return;
      }

      const updatedProduct = await response.json();

      onUpdate(updatedProduct);
      setIsEditing(false);
      setSelectedFile(null);
    } catch (err) {
      console.error("Update Error:", err);
    }
  }
  if (!product) return null;

  return (
    <div className="bg-slate-950 p-6 rounded-xl h-full">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          {isEditing ? "Edit Product" : product.name}
        </h2>

        {!isEditing && (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
            >
              Edit
            </button>

            <button
              onClick={() => setShowLogs(true)}
              className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
            >
              View Logs
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>

          </div>
        )}

      </div>

      {!isEditing && (
        <div className="space-y-4">
          <p><span className="text-gray-400">Price:</span> {product.price}</p>
          <p><span className="text-gray-400">Stock:</span> {product.stock}</p>
          <p><span className="text-gray-400">Status:</span> {product.status}</p>
          <p><span className="text-gray-400">Updated:</span> {product.updatedAt}</p>
          <p><span className="text-gray-400">Edited by:</span> {product.editedBy}</p>

        
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              className="rounded mb-2"
              alt={product.name}
            />
          ) : (
            <div className="w-full h-40 bg-slate-800 rounded flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          {product.description && (
            <p className="text-gray-300 mt-4">{product.description}</p>
          )}
        </div>
      )}

     
      {isEditing && (
        <div className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product name"
            className="w-full p-2 rounded bg-slate-800"
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 rounded bg-slate-800"
          />

          <input
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full p-2 rounded bg-slate-800"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800"
          >
            <option value="">Select status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Out of Stock</option>
          </select>

          <div className="space-y-1">
            <label className="text-xs text-gray-400">Update Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full p-2 rounded bg-slate-800 text-sm"
            />
          
            {selectedFile && (
              <p className="text-xs text-indigo-400">Selected: {selectedFile.name}</p>
            )}
          </div>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-slate-800"
          />

          
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
            >
              Update
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-slate-700 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showLogs && (
        <ProductLogsModal
          logs={
            logs}
          onClose={() => setShowLogs(false)}
        />
      )}
      {showDeleteConfirm && (
        <ConfirmDeleteModal
          title="Delete Product"
          message="This action cannot be undone."
          onCancel={() => setShowDeleteConfirm(false)}
          
          onConfirm={async () => {
            const response = await fetch(`/api/products/${product._id}`, {
              method: "DELETE",
            });

            if (response.ok) {
              onDelete(); 
              setShowDeleteConfirm(false);
            }
          }}
        />
      )}

    </div>
  );
}
