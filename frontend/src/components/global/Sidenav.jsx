import React, { useState, useEffect } from "react";
import { Layout, Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  CloudOutlined,
  TeamOutlined,
  AimOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  TruckOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  FundOutlined,
  DropboxOutlined,
  UserSwitchOutlined
} from "@ant-design/icons";
import { GiGreenhouse } from "react-icons/gi";
import { PiPlant } from "react-icons/pi";
import { LuHouse } from "react-icons/lu";
import icon from "../../assets/logo.png";
import logo from "../../assets/logoEx.png";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideMenu = ({ onCollapseChange }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Notify parent of collapse state
  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    onCollapseChange(newState);
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys.length > 0 ? [keys[keys.length - 1]] : []);
  };

  return (
    <Sider
      collapsible={!isMobile}
      collapsed={collapsed}
      trigger={null}
      width={250}
      collapsedWidth={50}
      theme="light"
      style={{
        position: "fixed",
        height: "100vh",
        overflowY: "auto",
        zIndex: 10,
      }}
    >
      <div className="flex items-center justify-end p-2">
        {!isMobile && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapse}
          />
        )}
      </div>

      <Menu
        theme="light"
        mode="inline"
        className="custom-menu"
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
      >
        {/* Dashboard */}
        <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </Menu.Item>

        <SubMenu
          key="tunnel-management"
          icon={<GiGreenhouse />}
          title="Tunnels"
        >
          <Menu.Item key="/tunnel-dashboard" icon={<DashboardOutlined />}>
            <NavLink to="/tunnel-dashboard">Tunnels Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="/tunnel-management" icon={<LuHouse />}>
            <NavLink to="/tunnel-management">Polytunnels</NavLink>
          </Menu.Item>
          <Menu.Item key="/plantation-management" icon={<PiPlant />}>
            <NavLink to="/plantation-management">Plantations</NavLink>
          </Menu.Item>
        </SubMenu>

        {/* Employee Management with Submenu */}
        <SubMenu
          key="/employee-management"
          icon={<TeamOutlined />}
          title="Employees"
        >
          <Menu.Item key="/employee-dashboard" icon={<DashboardOutlined />}>
            <NavLink to="/employee-dashboard">Employee Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="/employee-info" icon={<UserOutlined />}>
            <NavLink to="/employee-info">Employee Information</NavLink>
          </Menu.Item>
          <Menu.Item key="/attendance-leave" icon={<CalendarOutlined />}>
            <NavLink to="/attendance-leave">
              Attendance & Leave Management
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/employee-salary" icon={<DollarOutlined />}>
            <NavLink to="/employee-salary">Payroll & Salary</NavLink>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="/target-management" icon={<AimOutlined />}>
          <NavLink to="/target-management">Targets</NavLink>
        </Menu.Item>

        <Menu.Item key="/order-management" icon={<ShoppingCartOutlined />}>
          <NavLink to="/order-management">Orders</NavLink>
        </Menu.Item>

        {/* Courier Management with Submenu */}
        <SubMenu
          key="/courier-management"
          icon={<TruckOutlined />}
          title="Couriers"
        >
          <Menu.Item
            key="/Courierservice-Dashboard"
            icon={<AppstoreOutlined />}
          >
            <NavLink to="/Courierservice-Dashboard">
              Courierservice Dashboard
            </NavLink>
          </Menu.Item>

          <Menu.Item key="/tracking" icon={<FundOutlined />}>
            <NavLink to="/tracking">Tracking</NavLink>
          </Menu.Item>
          <Menu.Item key="/deliveries" icon={<DropboxOutlined />}>
            <NavLink to="/deliveries">Deliveries</NavLink>
          </Menu.Item>
          {/* <Menu.Item key="/shipment-management" icon={<TruckOutlined />}>
            <NavLink to="/shipment-management">Shipment Management</NavLink>
          </Menu.Item> */}
          <Menu.Item key="/courier-agents" icon={<UserSwitchOutlined />}>
            <NavLink to="/courier-agents">Courier Agents</NavLink>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="/inventory-management" icon={<DatabaseOutlined />}>
          <NavLink to="/inventory-management">Inventory</NavLink>
        </Menu.Item>
      </Menu>

      {/* Footer Logo */}
      <div className="absolute bottom-4 w-full text-center">
        {collapsed ? (
          <img
            src={icon}
            draggable="false"
            style={{ pointerEvents: "none" }}
            alt="Collapsed Logo"
            className="w-3/4 mx-auto"
          />
        ) : (
          <img
            src={logo}
            draggable="false"
            style={{ pointerEvents: "none" }}
            alt="Expanded Logo"
            className="w-3/4 mx-auto"
          />
        )}
      </div>
    </Sider>
  );
};

export default SideMenu;
