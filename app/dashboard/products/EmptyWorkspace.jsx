export default function EmptyWorkspace() {
  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      <div className="text-center space-y-2">
        <p className="text-lg">No product selected</p>
        <p className="text-sm">
          Select a product from the list or create a new one.
        </p>
      </div>
    </div>
  );
}
