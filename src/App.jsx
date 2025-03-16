import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "antd/dist/reset.css"; // Use reset.css instead of antd.less
import "./index.css"; // Your custom styles

import LoginPage from "./pages/Login";
import NewDashBoardLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import MyAccount from "./pages/MyAccount";
import TunnelPage from "./pages/Tunnels/TunnelDashboard";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import TargetManagementPage from "./pages/TargetManagement";
import OrderManagement from "./pages/OrderPage";

//Courier Management Pages
import ShipmentManagement from "./pages/courierservice/ShipmentManagement";
import CourierserviceDashboard from "./pages/courierservice/Dashboard"
import Deliveries from "./pages/courierservice/Deliveries";
import CourierAgents from "./pages/courierservice/CourierAgents";
import Tracking from "./pages/courierservice/Tracking";

import InventoryManagement from "./pages/InventoryPage";


import EmployeeInformation from "./pages/Employee/EmployeeInformation";
import PayrollSalary from "./pages/Employee/PayrollSalary";
import AttendanceLeave from "./pages/Employee/AttendanceLeave";
import Polytunnels from "./pages/Tunnels/Polytunnels";
import Plantations from "./pages/Tunnels/Plantations";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route element={<NewDashBoardLayout setLoading={setLoading} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myAccount" element={<MyAccount />} />
            <Route path="/tunnel-dashboard" element={<TunnelPage />} />
            <Route path="/tunnel-management" element={
              <Polytunnels />
            } />
            <Route path="/plantation-management" element={
              <Plantations />
            } />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/employee-info" element={<EmployeeInformation />} />
            <Route path="/employee-salary" element={<PayrollSalary />} />
            <Route path="/attendance-leave" element={<AttendanceLeave />} />
            <Route
              path="/target-management"
              element={<TargetManagementPage />}
            />
            <Route path="/order-management" element={<OrderManagement />} />
            <Route path="/courier-agents" element={<CourierAgents />} />




            {/* Courier Management Pages */}
            
            <Route
              path="/shipment-management"
              element={<ShipmentManagement />}
            />
            <Route path="/Courierservice-Dashboard" element={<CourierserviceDashboard />} />
            <Route path="/deliveries" element={<Deliveries/>} />
            <Route path="/tracking" element={<Tracking />} />
            {/* <Route path="/inventory-management"element={<ShipmentManagement />}/> */}



          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
