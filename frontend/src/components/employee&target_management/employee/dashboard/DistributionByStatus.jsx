import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const EmployeeBarChart = ({ employees }) => {
  // Compute unique roles and distribution of statuses per role
  const roles = [...new Set(employees.map(emp => emp.role))];
  const roleDistribution = roles.map(role => ({
    role,
    Active: employees.filter(emp => emp.role === role && emp.status === "Active").length,
    Inactive: employees.filter(emp => emp.role === role && emp.status === "Inactive").length,
    "On Leave": employees.filter(emp => emp.role === role && emp.status === "On Leave").length,
  }));

  return (
    <div className="bg-white p-4 rounded-3xl">
      <h2 className="text-lg font-semibold text-gray-700 mb-6">Employee Distribution by Status</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={roleDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="role" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Active" stackId="a" fill="#98FB98" />
          <Bar dataKey="Inactive" stackId="a" fill="#FFB6C1" />
          <Bar dataKey="On Leave" stackId="a" fill="#FFD700" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeBarChart;
