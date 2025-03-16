import React from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

function Header({ currentPath }) {
  const navigate = useNavigate();

  // Route-to-title mapping
  const pageTitles = {
    "/dashboard": "Dashboard",
    "/tunnel-dashboard": "Tunnels Dashboard",
    "/tunnel-management": "Polytunnel Management",
    "/plantation-management": "Plantation Management",
    "/employee-dashboard": "Employee Dashboard",
    "/employee-info": "Employee Information",
    "/attendance-leave": "Attendance & Leave Management",
    "/employee-salary": "Payroll & Salary",
    "/target-management": "Target Management",
    "/order-management": "Order Management",
    "/myAccount": "My Account",
    // CourierService
    "/Courierservice-Dashboard": "Courierservice Dashboard",
    "/tracking": "Tracking",
    "/deliveries": "Deliveries",
    "/shipment-management": "Shipments Management",
    "/courier-agents": "Agents",
    "/inventory-management": "Inventory",
  };

  // Get the current page title, defaulting to "Dashboard" if not found
  const pageTitle = pageTitles[currentPath] || "Dashboard";

  // Menu for the dropdown
  const menu = (
    <Menu>
      <Menu.Item
        key="myAccount"
        icon={<UserOutlined />}
        onClick={() => navigate("/myAccount")}
      >
        My Account
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => console.log("Logout clicked")}
        danger
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="backdrop-blur-md bg-Honeydew/60 pt-2">
      <div className="flex justify-between items-center px-6 py-3 bg-SGBUS-green/80 backdrop-blur-md text-white shadow-lg mx-2 rounded-xl">
        {/* Left Side: Dynamic Page Title */}
        <div className="text-2xl font-bold text-cal-poly-green font-nunito">
          {pageTitle}
        </div>

        {/* Right Side: Avatar & Admin Name with Dropdown */}
        <div className="flex items-center space-x-3">
          <span className="text-sm font-nunito font-medium">Admin</span>
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <img
              src="https://i.pravatar.cc/40" // Placeholder Avatar
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-white cursor-pointer"
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Header;
