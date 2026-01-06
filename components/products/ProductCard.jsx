export default function ProductCard({ product, onSelect, selected }) {

  return (
    <div
      onClick={() => onSelect(product)}
      className={`group p-3 rounded-lg cursor-pointer border transition-all duration-200 flex gap-4 ${
        selected 
          ? "bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10" 
          : "bg-slate-800/40 border-slate-700 hover:border-slate-500"
      }`}
    >
  
      <div className="w-16 h-16 shrink-0 overflow-hidden rounded-md bg-slate-700">
        {product.imageUrl ? (
          <img src={product.imageUrl} className="w-full h-full object-cover" alt={product.name} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">No image</div>
        )}
      </div>

      <div className="flex flex-col justify-center overflow-hidden">
        <h3 className={`font-medium truncate ${selected ? "text-indigo-300" : "text-gray-200"}`}>
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 truncate">Price: ${product.price}</p>
        <p className="text-[10px] text-gray-600 mt-1 uppercase">Stock: {product.stock}</p>
      </div>
    </div>
  );
}

