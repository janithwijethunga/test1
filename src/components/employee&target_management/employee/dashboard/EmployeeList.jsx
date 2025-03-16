import React, { useState } from "react";
import { Table, Input, Button, Space, Select, Tag, Modal, Descriptions } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const EmployeeTable = ({ employees }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Get unique roles and statuses for the dropdowns
  const roles = [...new Set(employees.map(emp => emp.role))];
  const statuses = [...new Set(employees.map(emp => emp.status))];

  const filteredEmployees = employees.filter(emp =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedRole ? emp.role === selectedRole : true) &&
    (selectedStatus ? emp.status === selectedStatus : true)
  );

  const statusColors = {
    Active: "green",
    Inactive: "red",
    "On Leave": "gold",
  };

  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedEmployee(null);
  };

  const columns = [
    { title: "Employee ID", dataIndex: "employeeID", key: "employeeID" },
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Contact", dataIndex: "contactNumber", key: "contactNumber" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColors[status]}>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, employee) => (
        <Space>
          <Button type="link" onClick={() => handleViewDetails(employee)}>
            View More Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-3xl">
      <div className="flex gap-3 mb-4">
        <Input
          placeholder="Search Employees..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-1/3"
        />

        <Select
          className="w-1/3"
          placeholder="Filter by Role"
          value={selectedRole}
          onChange={(value) => setSelectedRole(value)}
          allowClear
        >
          {roles.map((role) => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>

        <Select
          className="w-1/3"
          placeholder="Filter by Status"
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value)}
          allowClear
        >
          {statuses.map((status) => (
            <Option key={status} value={status}>
              {status}
            </Option>
          ))}
        </Select>
      </div>

      <Table dataSource={filteredEmployees} columns={columns} rowKey="employeeID" bordered />

      {/* Employee Details Modal */}
      <Modal
        title="Employee Details"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedEmployee && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Employee ID">{selectedEmployee.employeeID}</Descriptions.Item>
            <Descriptions.Item label="Name">
              {selectedEmployee.firstName} {selectedEmployee.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Role">{selectedEmployee.role}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedEmployee.email}</Descriptions.Item>
            <Descriptions.Item label="NIC / Passport">{selectedEmployee.nic}</Descriptions.Item>
            <Descriptions.Item label="Address">{selectedEmployee.address}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">{selectedEmployee.dateOfBirth}</Descriptions.Item>
            <Descriptions.Item label="Gender">{selectedEmployee.gender}</Descriptions.Item>
            <Descriptions.Item label="Joining Date">{selectedEmployee.joiningDate}</Descriptions.Item>
            <Descriptions.Item label="Employment Type">{selectedEmployee.employmentType}</Descriptions.Item>
            <Descriptions.Item label="Salary">{selectedEmployee.salary}</Descriptions.Item>
            <Descriptions.Item label="Supervisor ID">{selectedEmployee.supervisorID}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default EmployeeTable;
