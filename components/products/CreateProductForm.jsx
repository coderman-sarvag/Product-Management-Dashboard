"use client";

import { useState } from "react";

export default function CreateProductForm({ onCancel, onCreate }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [status, setStatus] = useState("Active");
  const [imageFile, setImageFile] = useState(null);
  
  async function handleSubmit(e) {
    e.preventDefault();

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
    }
  }
  return (
    <div className="bg-slate-950 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-slate-800"
        />

        <input
          required
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 rounded bg-slate-800"
        />

        <input
          required
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 rounded bg-slate-800"
        />
        <label className="block text-sm text-gray-400">Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full p-2 rounded bg-slate-800 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 rounded bg-slate-800"
        >
          <option>Active</option>
          <option>Draft</option>
          <option>Out of Stock</option>
        </select>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Create
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-700 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
