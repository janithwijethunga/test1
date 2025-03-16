import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AttendancePieChart = ({ employees }) => {
  // Compute unique roles and attendance data per role
  const roles = [...new Set(employees.map(emp => emp.role))];
  const attendanceData = roles.map(role => {
    const total = employees.filter(emp => emp.role === role).length;
    const present = employees.filter(emp => emp.role === role && emp.attendanceRecord["2025-03-02"] === "Present").length;
    return { role, present, absent: total - present };
  });
  const pastelColors = ["#6C5B7B", "#C06C84", "#F67280", "#FF847C", "#E84A5F", "#99B898"];

  return (
    <div className="bg-white p-4 rounded-3xl">
      <h2 className="text-lg font-semibold text-gray-700 mb-6">Role-wise Attendance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={attendanceData}
            dataKey="present"
            nameKey="role"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#82ca9d"
            label
          >
            {attendanceData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={pastelColors[index % pastelColors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendancePieChart;
