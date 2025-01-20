// "use client";

// import React, { useState, useEffect } from "react";
// import { Icon } from "@iconify/react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const SessionData = () => {
  
//   return (
//     <div>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>
//             </TableHead>
//             <TableHead>User ID</TableHead>
//             {/* <TableHead>Title</TableHead> */}
//             <TableHead>Session Id</TableHead>
//             {/* <TableHead>Role</TableHead> */}
//             <TableHead>Phone</TableHead>
//             <TableHead>Action</TableHead>
//             {Object.keys(data[0].logData).map((key) => (
//                 <TableHead>{key}</TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {users.map((user) => (
//             <TableRow
//               key={user.id}
//               className="hover:bg-muted cursor-pointer"
//               onClick={() => fetchSessionData(user.id)}
//             >
//               <TableCell>
//               </TableCell>
//               <TableCell className="font-medium">{user.name}</TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>
//                 {user.phone}
//               </TableCell>
//               <TableCell>
//                 <Button size="icon" variant="outline">
//                   <Icon icon="heroicons:eye" className="h-4 w-4" />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default SessionData;




// "use client";

// import React, { useState, useEffect } from "react";
// import { Icon } from "@iconify/react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import toast from "react-hot-toast";

// const SessionData = () => {
//   const [sessionData, setSessionData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSessionData = async () => {
//     setLoading(true);

//     const token = localStorage.getItem("authToken");
//     try {
//       const response = await fetch(
//         "https://em4wuex6mh.ap-south-1.awsapprunner.com/api/auth/therapist/patient/your-user-id/tracking", // Replace with the actual user ID
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`, // Include Bearer token
//           },
//         }
//       );

//       if (!response.ok) throw new Error("Failed to fetch session data");

//       const data = await response.json();
//       setSessionData(data);
//       toast.success("Session data loaded successfully!");
//     } catch (error) {
//       console.error("Error fetching session data:", error);
//       toast.error("Error fetching session data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessionData();
//   }, []);

//   if (loading) return <p>Loading session data...</p>;

//   if (!sessionData.length) return <p>No session data available.</p>;

//   return (
//     <div>
//       <h2 className="text-lg font-medium mb-4">Session Data</h2>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Session ID</TableHead>
//             <TableHead>User ID</TableHead>
//             <TableHead>Created At</TableHead>
//             <TableHead>Updated At</TableHead>
//             {Object.keys(sessionData[0].logData).map((key) => (
//               <TableHead key={key}>{key}</TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {sessionData.map((session) => (
//             <TableRow key={session.id}>
//               <TableCell>{session.sessionId}</TableCell>
//               <TableCell>{session.userId}</TableCell>
//               <TableCell>{new Date(session.created_at).toLocaleString()}</TableCell>
//               <TableCell>{new Date(session.updated_at).toLocaleString()}</TableCell>
//               {Object.values(session.logData).map((value, index) => (
//                 <TableCell key={index}>{value}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default SessionData;





// "use client";

// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const SessionData = ({ data }) => {
//   if (!data || !data.length) {
//     return <p>No session data available.</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-lg font-medium mb-4">Session Data</h2>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Session ID</TableHead>
//             <TableHead>User ID</TableHead>
//             <TableHead>Created At</TableHead>
//             <TableHead>Updated At</TableHead>
//             {Object.keys(data[0].logData).map((key) => (
//               <TableHead key={key}>{key}</TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {data.map((session) => (
//             <TableRow key={session.id}>
//               <TableCell>{session.sessionId}</TableCell>
//               <TableCell>{session.userId}</TableCell>
//               <TableCell>{new Date(session.created_at).toLocaleString()}</TableCell>
//               <TableCell>{new Date(session.updated_at).toLocaleString()}</TableCell>
//               {Object.values(session.logData).map((value, index) => (
//                 <TableCell key={index}>{value}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default SessionData;




"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";

const downloadCSV = (data) => {
  if (!data || !data.length) return;

  const csvRows = [];
  const headers = [
    "userId",
    "sessionId",
    ...Object.keys(data[0].logData),
    "created_at",
    "updated_at",
  ];
  csvRows.push(headers.join(",")); // Add headers as the first CSV row

  // Map data rows to CSV format
  data.forEach((row) => {
    const logDataValues = Object.values(row.logData); // Extract dynamic logData values
    const values = [
      row.userId,
      row.sessionId,
      ...logDataValues,
      row.created_at,
      row.updated_at,
    ];
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

const SessionData = ({ data, onBack }) => {
  const tableHeaders = [
    // "Session ID",
    // "User ID",
    "Created At",
    // "Updated At",
    ...(data && data.length > 0 ? Object.keys(data[0].logData) : []),
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* Back to Users */}
        <button
          onClick={onBack}
          className="flex items-center text-primary-500"
        >
          <Icon icon="heroicons:arrow-left" className="mr-2 h-5 w-5" />
          Back to Users
        </button>

        {/* Conditionally render Download CSV */}
        {data && data.length > 0 && (
          <button
            onClick={() => downloadCSV(data)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-600 text-primary-foreground"
          >
            Download CSV
          </button>
        )}
      </div>

      <h2 className="text-lg font-medium mb-4">Sessions Data</h2>
      <Table>
        <TableHeader>
          <TableRow>
            {data && data.length > 0 && tableHeaders.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((session) => (
              <TableRow key={session.id}>
                {/* <TableCell>{session.sessionId}</TableCell>
                <TableCell>{session.userId}</TableCell> */}
                <TableCell>
                  {new Date(session.created_at).toLocaleString()}
                </TableCell>
                {/* <TableCell>
                  {new Date(session.updated_at).toLocaleString()}
                </TableCell> */}
                {Object.values(session.logData).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <td colSpan={tableHeaders.length} className="text-left pl-4 pt-4">
                No session data available.
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SessionData;
