"use client";
import { useState, useEffect } from "react";
import useSWR, { SWRConfig } from "swr";
import ProductCard from "@/components/products/ProductCard";
import ProductDetails from "@/components/products/ProductDetails";
import CreateProductForm from "@/components/products/CreateProductForm";
import EmptyWorkspace from "./EmptyWorkspace";
import StockBarChart from "@/components/charts/StockBarChart";
import StatusPieChart from "@/components/charts/StatusPieChart";
import { fetcher } from "@/lib/fetcher";

function ProductsView() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  
  const { data: products = [], error, mutate } = useSWR("/api/products", fetcher);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  function handleCreate(newProduct) {
    mutate(); 
    setIsCreating(false);
    setSelectedProduct(newProduct);
    setSearchQuery("");
  }

  function handleUpdate(updatedProduct) {
    mutate();
    setSelectedProduct(updatedProduct);
  }

  function handleDelete() {
    mutate();
    setSelectedProduct(null);
  }

  function handleSearch() {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredProducts(products);
      return;
    }
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.editedBy?.toLowerCase().includes(query)
    );
    setFilteredProducts(results);
  }

  if (error) {
    return <p className="text-red-500">Failed to load products</p>;
  }

  return (
    <div className="flex flex-col h-full max-h-screen space-y-4 overflow-hidden">
      <div className="grid grid-cols-2 gap-4 h-50 shrink-0">
        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 flex flex-col min-h-0">
          <StockBarChart products={products} />
        </div>
        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 flex flex-col min-h-0">
          <StatusPieChart products={products} />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="col-span-4 flex flex-col min-h-0 space-y-4 bg-slate-900/30 p-4 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setIsCreating(true);
              setSelectedProduct(null);
            }}
            className="w-full py-2.5 bg-green-600 rounded-lg hover:bg-green-700 transition-colors font-semibold shrink-0"
          >
            + Create Product
          </button>

          <div className="flex gap-2 shrink-0">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-2 rounded-lg bg-slate-800 border border-slate-700 outline-none text-sm focus:border-indigo-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 text-sm font-medium transition-colors"
            >
              Search
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  selected={selectedProduct?._id === p._id}
                  onSelect={(product) => {
                    setSelectedProduct(product);
                    setIsCreating(false);
                  }}
                />
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center mt-10">No products found</p>
            )}
          </div>
        </div>

        <div className="col-span-8 overflow-y-auto min-h-0 bg-slate-900/50 rounded-xl border border-slate-800 p-1 custom-scrollbar">
          {isCreating ? (
            <CreateProductForm
              onCancel={() => setIsCreating(false)}
              onCreate={handleCreate}
            />
          ) : selectedProduct ? (
            <ProductDetails
              product={selectedProduct}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          ) : (
            <EmptyWorkspace />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsClient({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <ProductsView />
    </SWRConfig>
  );
}
