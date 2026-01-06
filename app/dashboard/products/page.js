import ProductsClient from "./ProductsClient";

async function getProducts() {
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/products`, {
    cache: 'no-store', 
  });

  if (!res.ok) return [];
  return res.json();
}

export default async function Page() {
  const products = await getProducts();

  return (
    <ProductsClient 
      fallback={{
        '/api/products': products
      }} 
    />
  );
}
 
 
