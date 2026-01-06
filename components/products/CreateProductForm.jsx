"use client";

import { useState } from "react";

export default function CreateProductForm({ onCancel, onCreate }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("Active");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("price", price);
      data.append("stock", stock);
      data.append("status", status);
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await fetch("/api/products", {
        method: "POST",
        body: data, 
      });

      if (!response.ok) throw new Error("Product already exists. Update it rather.");

      const savedProduct = await response.json();
      onCreate(savedProduct);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-slate-950 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          disabled={isSubmitting}
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-slate-800 disabled:opacity-50"
        />

        <input
          required
          disabled={isSubmitting}
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 rounded bg-slate-800 disabled:opacity-50"
        />

        <input
          required
          disabled={isSubmitting}
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 rounded bg-slate-800 disabled:opacity-50"
        />
        <label className="block text-sm text-gray-400">Product Image</label>
        <input
          type="file"
          disabled={isSubmitting}
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 rounded bg-slate-800 text-sm disabled:opacity-50"
        />
        <select
          disabled={isSubmitting}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 rounded bg-slate-800 disabled:opacity-50"
        >
          <option>Active</option>
          <option>Draft</option>
          <option>Out of Stock</option>
        </select>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-all font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
