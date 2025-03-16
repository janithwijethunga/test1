import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Dropdown, Menu, Button, Tag } from 'antd';
import { 
    MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined, SwapOutlined, PoweroffOutlined 
} from '@ant-design/icons';
import PolytunnelDetailsDrawer from "./PolytunnelsDetailsDrawer";

const { Option } = Select;

const PolytunnelsTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchName, setSearchName] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterCrop, setFilterCrop] = useState(null);
  const [cropOptions, setCropOptions] = useState([]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedTunnel, setSelectedTunnel] = useState(null);

  // Extract unique crops for the dropdown
  useEffect(() => {
    const uniqueCrops = [...new Set(data.map(item => item.assignedCrop))];
    setCropOptions(uniqueCrops);
  }, [data]);

  // Handle Activate/Deactivate Status
  const toggleStatus = (id) => {
    setFilteredData(prevData =>
      prevData.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' }
          : item
      )
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchName('');
    setSearchLocation('');
    setFilterStatus(null);
    setFilterCrop(null);
    setFilteredData(data);
  };

  // Filter data based on search and filter inputs
  useEffect(() => {
    let filtered = data;
    if (searchName) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (searchLocation) {
      filtered = filtered.filter(item =>
        item.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }
    if (filterStatus) {
      filtered = filtered.filter(item => item.status === filterStatus);
    }
    if (filterCrop) {
      filtered = filtered.filter(item => item.assignedCrop === filterCrop);
    }
    setFilteredData(filtered);
  }, [searchName, searchLocation, filterStatus, filterCrop, data]);

 
 
  const handleViewMore = (record) => {
    setSelectedTunnel(record);
    setDrawerVisible(true);
  };


  const columns = [
    { title: 'Tunnel Name', dataIndex: 'name', key: 'name' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    { title: 'Assigned Crop', dataIndex: 'assignedCrop', key: 'assignedCrop' },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
    { title: 'Temperature', dataIndex: 'temperature', key: 'temperature' },
    { title: 'Humidity', dataIndex: 'humidity', key: 'humidity' },
    { title: 'Soil Moisture', dataIndex: 'soilMoisture', key: 'soilMoisture' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="viewMore" icon={<EyeOutlined />} onClick={() => handleViewMore(record)}>
              View More
            </Menu.Item>
            <Menu.Item key="edit" icon={<EditOutlined />}>
              Edit
            </Menu.Item>
            <Menu.Item key="assignCrop" icon={<SwapOutlined />}>
              Assign Crop
            </Menu.Item>
            <Menu.Item 
              key="toggle"
              icon={<PoweroffOutlined />}
              onClick={() => toggleStatus(record.id)}
              style={{ color: record.status === 'Active' ? 'red' : 'green' }} // Red for Deactivate, Green for Activate
            >
              {record.status === 'Active' ? 'Deactivate' : 'Activate'}
            </Menu.Item>
            <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
              Delete
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={['click']}>
           <Button 
              type="text" 
              className="rounded-full border border-gray-300 p-2 hover:bg-gray-100"
            >
              <MoreOutlined style={{ fontSize: '15px' }} />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      {/* Search and Filter Section */}
      <div className="mb-4 flex flex-wrap gap-4">
        <Input
          placeholder="Search Tunnel Name"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          className="w-64"
        />
        <Input
          placeholder="Search Location"
          value={searchLocation}
          onChange={e => setSearchLocation(e.target.value)}
          className="w-64"
        />
        <Select
          placeholder="Filter by Status"
          value={filterStatus || undefined} // Fix: Allow placeholder when no selection
          onChange={value => setFilterStatus(value)}
          allowClear
          className="w-64"
        >
          <Option value="Active">Active</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
        <Select
          placeholder="Filter by Crop"
          value={filterCrop || undefined} // Fix: Allow placeholder when no selection
          onChange={value => setFilterCrop(value)}
          allowClear
          className="w-64"
        >
          {cropOptions.map(crop => (
            <Option key={crop} value={crop}>
              {crop}
            </Option>
          ))}
        </Select>
        <Button 
          type="default"
          className="bg-SGBUS-green text-white px-4 py-1 rounded-md hover:bg-red-600"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>
      {/* Table */}
      <Table columns={columns} dataSource={filteredData} rowKey="id" />
    
    {/* Drawer Component */}
    <PolytunnelDetailsDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        data={selectedTunnel}
      />
    </div>
  );
};

export default PolytunnelsTable;
