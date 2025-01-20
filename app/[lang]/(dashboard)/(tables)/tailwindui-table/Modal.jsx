// import React from "react";
// // import { Dialog } from "@headlessui/react";
// // import { XIcon } from "@heroicons/react/solid";

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <>hI</>
//   );
// };

// export default Modal;


// import React from "react";

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-lg w-1/3">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between px-4 py-2 border-b">
//           <h2 className="text-lg font-medium">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Modal Content */}
//         <div className="p-4">
//           {children}
//         </div>

//         {/* Modal Footer */}
//         <div className="flex justify-end px-4 py-2 border-t">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;





import React from "react";

const downloadCSV = (data) => {
  if (!data || !data.length) return;

  const csvRows = [];
  // Include static fields and dynamic keys from logData
  const headers = ["userId", "sessionId", ...Object.keys(data[0].logData), "created_at", "updated_at",];
  csvRows.push(headers.join(",")); // Add headers as the first CSV row

  // Map data rows to CSV format
  data.forEach((row) => {
    const logDataValues = Object.values(row.logData); // Extract dynamic logData values
    const values = [row.userId, row.sessionId, ...logDataValues, row.created_at, row.updated_at];
    csvRows.push(values.map((value) => JSON.stringify(value, null, 2)).join(",")); // Serialize each value to CSV-safe format
  });

  // Create a Blob and trigger download
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "session_data.csv";
  a.click();
  URL.revokeObjectURL(url);
};


const Modal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-2/3">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          {data && data.length > 0 ? (
            <table className="w-full border-collapse border">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Session ID</th>
                  {Object.keys(data[0].logData).map((key) => (
                    <th key={key} className="border px-2 py-1">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{row.sessionId}</td>
                    {Object.values(row.logData).map((value, i) => (
                      <td key={i} className="border px-2 py-1">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No session data available.</p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between px-4 py-2 border-t">
          <button
            onClick={() => downloadCSV(data)}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Download CSV
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
