import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Select, Tag, Layout, Typography, Card, Statistic } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const CourierAgents = () => {
  // Dummy data
  const [agents, setAgents] = useState([
    { id: 1, name: "John Doe", location: [6.9115017, 79.9752103], contact: "123-456-7890", status: "Available", deliveries: 150 },
    { id: 2, name: "Sarah Smith", location: [49.420318, 8.687872], contact: "987-654-3210", status: "On Delivery", deliveries: 200 },
    { id: 3, name: "Michael Brown", location: [49.41659, 8.68536], contact: "555-123-4567", status: "Offline", deliveries: 120 },
  ]);

  const [searchText, setSearchText] = useState("");
  const [filteredAgents, setFilteredAgents] = useState(agents);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);
  const [form] = Form.useForm();

  // Search & Filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setFilteredAgents(agents.filter(agent => agent.name.toLowerCase().includes(value)));
  };

  // Add / Edit Courier
  const showModal = (agent = null) => {
    setEditingAgent(agent);
    setIsModalVisible(true);
    form.setFieldsValue(agent || { name: "", contact: "", status: "Available" });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = (values) => {
    if (editingAgent) {
      setAgents(agents.map(agent => (agent.id === editingAgent.id ? { ...agent, ...values } : agent)));
    } else {
      setAgents([...agents, { id: agents.length + 1, ...values, location: [49.41461, 8.681495] }]);
    }
    setIsModalVisible(false);
    form.resetFields();
  };

  // Delete Courier
  const handleDelete = (id) => {
    setAgents(agents.filter(agent => agent.id !== id));
  };

  // Assign Deliveries (Dummy Function)
  const handleAssignDelivery = (id) => {
    alert(`Assigned a new delivery to Agent ID: ${id}`);
  };

  return (
    <Layout className="p-6 bg-gray-100 min-h-screen">
      <Content className="bg-white p-6 rounded-lg shadow-lg">
        <Title level={2} className="mb-4">🚚 Courier Agents Management</Title>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card><Statistic title="Total Agents" value={agents.length} /></Card>
          <Card><Statistic title="Active Deliveries" value={50} /></Card>
          <Card><Statistic title="Successful Deliveries" value={agents.reduce((sum, agent) => sum + agent.deliveries, 0)} /></Card>
        </div>

        {/* Search & Add Agent */}
        <div className="flex justify-between mb-4">
          <Input
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
            className="w-1/3"
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>Add Courier</Button>
        </div>

        {/* Courier Agents Table */}
        <Table dataSource={filteredAgents} rowKey="id" className="shadow-lg rounded-lg">
          <Table.Column title="Name" dataIndex="name" key="name" />
          <Table.Column title="Contact" dataIndex="contact" key="contact" />
          <Table.Column title="Status" dataIndex="status" key="status" render={(status) => (
            <Tag color={status === "Available" ? "green" : status === "On Delivery" ? "blue" : "red"}>{status}</Tag>
          )} />
          <Table.Column title="Deliveries" dataIndex="deliveries" key="deliveries" />
          <Table.Column title="Actions" key="actions" render={(_, record) => (
            <div className="flex gap-2">
              <Button icon={<EditOutlined />} onClick={() => showModal(record)}>Edit</Button>
              <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>Delete</Button>
              <Button type="dashed" icon={<EnvironmentOutlined />} onClick={() => handleAssignDelivery(record.id)}>Assign Delivery</Button>
            </div>
          )} />
        </Table>

        {/* Live Tracking Map */}
        <div className="mt-6">
          <Title level={3}>📍 Live Courier Tracking</Title>
          <MapContainer center={[49.41461, 8.681495]} zoom={12} className="h-96 w-full rounded-lg shadow-lg">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {agents.map(agent => (
              <Marker key={agent.id} position={agent.location}>
                <Popup>{agent.name} - {agent.status}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Add / Edit Courier Modal */}
        <Modal
          title={editingAgent ? "Edit Courier Agent" : "Add Courier Agent"}
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="contact" label="Contact" rules={[{ required: true, message: "Please enter contact" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select>
                <Option value="Available">Available</Option>
                <Option value="On Delivery">On Delivery</Option>
                <Option value="Offline">Offline</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
};

export default CourierAgents;
