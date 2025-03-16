import React from "react";
import { Drawer, Descriptions, Tag } from "antd";

const PolytunnelDetailsDrawer = ({ visible, onClose, data }) => {
  if (!data) return null;

  return (
    <Drawer 
      title={`Details of ${data.name}`} 
      placement="right" 
      width={600} 
      onClose={onClose} 
      open={visible}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Tunnel Name">{data.name}</Descriptions.Item>
        <Descriptions.Item label="Location">{data.location}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={data.status === "Active" ? "green" : "red"}>
            {data.status}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Assigned Crop">{data.assignedCrop}</Descriptions.Item>
        <Descriptions.Item label="Capacity">{data.capacity} plants</Descriptions.Item>
        <Descriptions.Item label="Temperature">{data.temperature}°C</Descriptions.Item>
        <Descriptions.Item label="Humidity">{data.humidity}%</Descriptions.Item>
        <Descriptions.Item label="Soil Moisture">{data.soilMoisture}%</Descriptions.Item>
        <Descriptions.Item label="Dimensions">
          Length: {data.length}m <br />
          Width: {data.width}m <br />
          Height: {data.height}m
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default PolytunnelDetailsDrawer;
