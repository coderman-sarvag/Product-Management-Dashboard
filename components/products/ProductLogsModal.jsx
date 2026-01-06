
export default function ProductLogsModal({ logs, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 w-full max-w-lg max-h-[80vh] flex flex-col p-6 rounded-lg border border-slate-800 shadow-2xl">
        <h3 className="text-xl font-semibold mb-4 text-white">Update History</h3>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
          {logs?.length > 0 ? (
            [...logs].reverse().map((log, index) => (
              <div key={log._id || index} className="border-b border-slate-800 pb-3">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-bold text-indigo-400 text-[10px] uppercase tracking-widest">{log.action}</p>
                  <p className="text-[10px] text-gray-500">
           
                    {log.at ? new Date(log.at).toLocaleString() : "Just now"}
                  </p>
                </div>

                <p className="text-sm text-gray-200">{log.message}</p>

                
                {log.details && Object.keys(log.details).length > 0 && (
                  <div className="mt-2 grid grid-cols-1 gap-1 bg-slate-900/80 p-3 rounded border border-slate-700">
                    {Object.entries(log.details).map(([field, values]) => (
                      <div key={field} className="text-[11px] flex items-center gap-2">
                        <span className="text-gray-400 capitalize w-16 font-semibold">{field}:</span>
                        <span className="text-red-400 line-through opacity-70">{values.old || "none"}</span>
                        <span className="text-gray-500">→</span>
                        <span className="text-green-400 font-bold">{values.new}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">No logs available.</p>
          )}
        </div>

        <button onClick={onClose} className="mt-6 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all font-medium">
          Close
        </button>
      </div>
    </div>
  );
}